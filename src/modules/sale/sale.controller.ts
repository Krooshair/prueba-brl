import { Request, Response } from 'express';
import SaleService from './sale.service';
import isNumeric from '../../shared/utils/isNumeric';
import Sale from './sale.model';
import {
  CloudinaryDocument,
  Cloudinary,
} from '../../shared/services/Cloudinary';
import ShortUniqueId from 'short-unique-id';

type MulterFile = Express.Multer.File;

interface UploadRequest extends Request {
  files: {
    guide?: MulterFile[];
    bill?: MulterFile[];
  };
}

class SaleController extends SaleService {
  public async listSale(req: Request, res: Response): Promise<Response> {
    try {
      const {
        statusSale,
      }: {
        statusSale:
          | 'Pagado'
          | 'Enviando'
          | 'Culminado'
          | 'Cancelado'
          | undefined;
      } = req.query as {
        statusSale:
          | 'Pagado'
          | 'Enviando'
          | 'Culminado'
          | 'Cancelado'
          | undefined;
      };

      const response = await this.getSale(statusSale);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al listar ventas',
        error,
      });
    }
  }

  public async searchSaleById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const response = await this.getSaleById(Number(id));
      if (!response)
        return res
          .status(404)
          .json({ message: 'La venta que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar buscar venta por id',
        error,
      });
    }
  }

  public async searchSaleByCode(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { code } = req.params;

      const response = await this.getSaleByCode(code);
      if (!response)
        return res
          .status(404)
          .json({ message: 'La venta que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar buscar venta por codigo',
        error,
      });
    }
  }

  public async createSale(req: Request, res: Response): Promise<Response> {
    const reqWithFiles = req as UploadRequest;
    try {
      const sale: Sale & {
        typeFileGuide: 'DOCUMENTO' | 'IMAGEN' | undefined;
        typeFileBills: 'DOCUMENTO' | 'IMAGEN';
      } = req.body;

      const { randomUUID } = new ShortUniqueId({ length: 10 });
      sale.codeSale = randomUUID();

      const businessJson = req.body.business;
      sale.business = JSON.parse(businessJson);

      const delivery = req.body.deliveryType;

      if (!sale.business || sale.business.length == 0)
        return res
          .status(400)
          .json({ message: 'Necesitas productos para registrar una venta!' });

      for (const bus of sale.business) {
        const findBus = await this.getBusinessByStatus(bus.businessId);
        if (!findBus) {
          return res.status(400).json({
            message: `El producto de id ${bus.businessId} no esta activo`,
          });
        }

        const validateStock = await this.getBusinessByStock(
          bus.businessId,
          bus.quantity
        );
        if (!validateStock)
          return res.status(409).json({
            message: `El producto de id ${bus.businessId} no tiene stock suficiente`,
          });
      }

      const findCode = await this.getSaleByCode(sale.codeSale);
      if (findCode)
        return res
          .status(409)
          .json({ message: 'Ya existe una venta registrada con este codigo!' });

      if (!reqWithFiles.files.bill)
        return res
          .status(400)
          .json({ message: 'No se encontro ningun archivo de comprobante' });

      //================ GUIAS VALIDACION ============================
      if (sale.typeFileGuide && delivery == 'ENVIO') {
        if (!reqWithFiles.files.guide)
          return res
            .status(400)
            .json({ message: 'No se encontro ningun archivo de guia' });

        if (sale.typeFileBills == 'DOCUMENTO') {
          const guide = reqWithFiles.files.guide[0];

          const result = await CloudinaryDocument(
            guide,
            'brl/ventas/guias',
            true,
            sale.codeSale
          );

          const url = result?.url;
          if (!url)
            return res.status(400).json({
              message: 'Ocurrio un error inesperado al intentar subir la guia',
            });

          sale.guide = url;
        } else {
          const guide = reqWithFiles.files.guide[0];

          const result = await Cloudinary(
            guide,
            1080,
            1080,
            'fit',
            'brl/ventas/guias',
            true,
            sale.codeSale
          );

          const url = result?.secure_url;
          if (!url)
            return res.status(400).json({
              message: 'Ocurrio un error inesperado al intentar subir la guia',
            });

          sale.guide = url;
        }
      }
      //==============================================================

      //================ COMPROBATES VALIDACION ============================
      if (sale.typeFileBills == 'DOCUMENTO') {
        const bill = reqWithFiles.files.bill[0];

        const result = await CloudinaryDocument(
          bill,
          'brl/ventas/facturas',
          true,
          sale.codeSale
        );

        const url = result?.url;
        if (!url)
          return res.status(400).json({
            message: 'Ocurrio un error al tratar de subir el comprobante',
          });

        sale.bills = url;
      } else {
        const bill = reqWithFiles.files.bill[0];

        const result = await Cloudinary(
          bill,
          1080,
          2160,
          'fit',
          'brl/ventas/facturas',
          true,
          sale.codeSale
        );

        const url = result?.secure_url;
        if (!url)
          return res.status(400).json({
            message: 'Ocurrio un error al tratar de subir el comprobante',
          });

        sale.bills = url;
      }
      //=========================================================================

      sale.adminId = Number(sale.adminId);
      sale.clientId = Number(sale.clientId);

      const response = await this.postSale(sale);

      if (!response)
        return res.status(400).json({ message: 'Fallo al integrar productos' });

      return res.status(201).json({
        message: 'La venta se ha creado exitosamente!',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar crear una venta',
        error,
      });
    }
  }

  public async modifyStatusSale(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findSale = await this.getSaleById(Number(id));
      if (!findSale)
        return res
          .status(404)
          .json({ message: 'La venta que intenta modificar, no existe!' });

      const {
        statusSale,
      }: { statusSale: 'Pagado' | 'Enviando' | 'Culminado' | 'Cancelado' } =
        req.body;

      const response = await this.putSaleStatus(Number(id), statusSale);
      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar modificar el estado de la venta',
        error,
      });
    }
  }
}

export default SaleController;
