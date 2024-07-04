import axios from 'axios';
import PDFDocument from 'pdfkit';
import {
  Cloudinary,
  CloudinaryBase64,
  CloudinaryDocument,
} from '../../shared/services/Cloudinary';
import generateBarcodeImage from '../../shared/utils/generateBarCode';
import isNumeric from '../../shared/utils/isNumeric';
import Business from './business.model';
import BusinessService from './business.service';
import { Request, Response } from 'express';

class BusinessController extends BusinessService {
  /**
   * Método para listar todos los negocios
   * @param _req Parametro no usado de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async listBusiness(_req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.getBusiness();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al listar negocios',
        error,
      });
    }
  }

  /**
   * Método para listar todos los negocios por producto
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async listBusinessByProductId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findProduct = await this.getProductById(Number(id));
      if (!findProduct)
        return res
          .status(404)
          .json({ message: 'El producto que envio, no existe!' });

      const response = await this.getBusinessByProductId(Number(id));
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al listar negocios por producto',
        error,
      });
    }
  }

  /**
   * Método para buscar un negocio por su id
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async searchBusinessById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const response = await this.getBusinessById(Number(id));
      if (!response)
        return res
          .status(404)
          .json({ message: 'El negocio que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar buscar negocio por id',
        error,
      });
    }
  }

  /**
   * Método para buscar un negocio por su codigo
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async searchBusinessByCode(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { code } = req.params;

      const response = await this.getBusinessByCode(code);
      if (!response)
        return res
          .status(404)
          .json({ message: 'El negocio que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar buscar negocio por codigo',
        error,
      });
    }
  }

  /**
   * Método para imprimir el codigo del negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async printCodeBusiness(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numérico" });

      const findBusiness = await this.getBusinessById(Number(id));
      if (!findBusiness)
        return res
          .status(404)
          .json({ message: 'El producto que intenta buscar, no existe!' });

      const response =
        findBusiness.barCode &&
        (await axios.get(findBusiness.barCode, {
          responseType: 'arraybuffer',
        }));

      if (!response)
        return res
          .status(400)
          .json({ message: 'Ocurrio un error al intentar obtener imagen' });

      const imageBuffer = Buffer.from(response.data, 'binary');
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
      const buffers: Buffer[] = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.setHeader(
          'Content-Disposition',
          'inline; filename=codigo_de_barras.pdf'
        );
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfData);
      });

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const margin = 40;
      const maxImageWidth = pageWidth - margin * 2;
      const maxImageHeight = pageHeight - margin * 2;

      doc.image(imageBuffer, margin, margin, {
        fit: [maxImageWidth, maxImageHeight],
        align: 'center',
        valign: 'center',
      });

      doc.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al buscar un producto por slug',
        error,
      });
    }
  }

  /**
   * Método para descargar el codigo del negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async downloadCodeBusiness(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    if (!isNumeric(Number(id))) {
      return res
        .status(400)
        .json({ message: "El parametro 'id' no es numérico" });
    }

    try {
      const findBusiness = await this.getBusinessById(Number(id));

      if (!findBusiness) {
        return res
          .status(404)
          .json({ message: 'El negocio que intenta buscar, no existe!' });
      }

      if (!findBusiness.barCode) {
        return res
          .status(400)
          .json({ message: 'El negocio no tiene un código de barras' });
      }

      const response = await axios.get(findBusiness.barCode, {
        responseType: 'arraybuffer',
      });

      const imageBuffer = Buffer.from(response.data, 'binary');
      const mimeType = response.headers['content-type'];

      res.setHeader(
        'Content-Disposition',
        'attachment; filename=codigo_de_barras.png'
      );
      res.setHeader('Content-Type', mimeType);

      return res.send(imageBuffer);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al intentar obtener la imagen' });
    }
  }

  /**
   * Método para descargar el comprobante del negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async downloadBillBusiness(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const { id } = req.params;

    if (!isNumeric(Number(id))) {
      return res
        .status(400)
        .json({ message: "El parametro 'id' no es numérico" });
    }

    try {
      const findBusiness = await this.getBusinessById(Number(id));

      if (!findBusiness) {
        return res
          .status(404)
          .json({ message: 'El negocio que intenta buscar, no existe!' });
      }

      if (!findBusiness.bill) {
        return res
          .status(400)
          .json({ message: 'El negocio no tiene comprobante' });
      }

      const response = await axios.get(findBusiness.bill, {
        responseType: 'arraybuffer',
      });

      if (!response) {
        return res
          .status(400)
          .json({ message: 'Ocurrió un error al intentar obtener el archivo' });
      }

      const contentType = response.headers['content-type'];
      const fileName = findBusiness.bill.split('/').pop() || 'comprobante';

      console.log(contentType);

      if (contentType === 'application/pdf') {
        // Si es un PDF, envíalo directamente
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${fileName}`
        );
        res.setHeader('Content-Type', 'application/pdf');
        return res.send(response.data);
      } else if (contentType.startsWith('image/')) {
        // Si es una imagen, conviértela en un PDF
        const imageBuffer = Buffer.from(response.data, 'binary');
        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });

        const buffers: Buffer[] = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=${fileName}.pdf`
          );
          res.setHeader('Content-Type', 'application/pdf');
          res.send(pdfData);
        });

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const margin = 40;
        const maxImageWidth = pageWidth - margin * 2;
        const maxImageHeight = pageHeight - margin * 2;

        doc.image(imageBuffer, margin, margin, {
          fit: [maxImageWidth, maxImageHeight],
          align: 'center',
          valign: 'center',
        });

        doc.end();
      } else {
        return res
          .status(400)
          .json({ message: 'El formato del archivo no es soportado' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Ocurrió un error desconocido al intentar obtener la imagen',
      });
    }
  }

  /**
   * Método para crear un nuevo negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async createBusiness(req: Request, res: Response): Promise<Response> {
    try {
      const bill = req.file;
      const business: Business = req.body;
      const typeFile: 'DOCUMENTO' | 'IMAGEN' = req.body.typeFile;

      const findProduct =
        business.productId && (await this.getProductById(business.productId));
      if (!findProduct)
        return res
          .status(404)
          .json({ message: 'El producto que intenta asignar, no existe!' });

      const findSupplier =
        business.supplierId &&
        (await this.getSupplierById(business.supplierId));
      if (!findSupplier)
        return res
          .status(404)
          .json({ message: 'El proveedor que intenta asigna, no existe!' });

      const findCode = await this.getBusinessByCode(business.codeBusiness);
      if (findCode)
        return res
          .status(409)
          .json({ message: 'El codigo que intenta registrar, ya existe!' });

      if (bill) {
        if (typeFile == 'DOCUMENTO') {
          const result = await CloudinaryDocument(
            bill,
            'brl/negocios',
            true,
            business.codeBusiness
          );

          const url = result?.secure_url;
          if (!url)
            return res.status(400).json({
              message: 'Ocurrio un error al tratar de subir el pdf',
            });

          business.bill = url;
        } else if (typeFile == 'IMAGEN') {
          const result = await Cloudinary(
            bill,
            1080,
            1080,
            'fit',
            'brl/negocios',
            true,
            business.codeBusiness
          );

          const url = result?.secure_url;
          if (!url)
            return res.status(400).json({
              message: 'Ocurrio un error al tratar de subir la imagen',
            });

          business.bill = url;
        }
      }

      const barcodeImage = await generateBarcodeImage(business.codeBusiness);
      const barcodeResult = await CloudinaryBase64(
        barcodeImage,
        1200,
        400,
        'pad',
        'brl/barcodes'
      );
      if (!barcodeResult?.secure_url) {
        return res.status(400).json({
          message: 'Error al subir la imagen del código de barras a Cloudinary',
        });
      }

      business.barCode = barcodeResult.secure_url;

      const response = await this.postBusiness(business);
      return res.status(201).json({
        messsage: 'El negocio se creo existosamente!',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar crear un nuevo negocio',
        error,
      });
    }
  }

  /**
   * Metodo para actualizar el comprobante de un negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async updateBill(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findBusiness = await this.getBusinessById(Number(id));
      if (!findBusiness)
        return res
          .status(404)
          .json({ message: 'El negocio que intenta actualizar, no existe!' });

      const bill = req.file;
      const typeFile: 'DOCUMENTO' | 'IMAGEN' = req.body.typeFile;

      if (!typeFile)
        return res
          .status(400)
          .json({ message: 'No se encontro el tipo de archivo a enviar' });

      if (!bill)
        return res
          .status(400)
          .json({ message: 'No se encontro ningun comprobante' });

      if (typeFile == 'DOCUMENTO') {
        const result = await CloudinaryDocument(
          bill,
          'brl/negocios',
          true,
          findBusiness.codeBusiness
        );

        const url = result?.secure_url;

        if (!url)
          return res.status(400).json({
            message: 'Ocurrio un error inesperado al intentar subir el archivo',
          });

        const response = await this.putBill(Number(id), url);

        return res.status(200).json(response);
      } else {
        const result = await Cloudinary(
          bill,
          1080,
          1080,
          'fit',
          'brl/negocios',
          true,
          findBusiness.codeBusiness
        );

        const url = result?.secure_url;

        if (!url)
          return res.status(400).json({
            message: 'Ocurrio un error inesperado al intentar subir el archivo',
          });

        const response = await this.putBill(Number(id), url);

        return res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar crear un nuevo negocio',
        error,
      });
    }
  }

  /**
   * Método para incrementar el stock de un negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async updateStockByCode(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const {
        code,
        stock,
        incrementFor,
        quantityDrawer,
      }: {
        code: string;
        stock: number;
        incrementFor: 'Unidad' | 'Caja';
        quantityDrawer: number;
      } = req.body;

      const findCode = await this.getBusinessByCode(code);
      if (!findCode)
        return res
          .status(404)
          .json({ message: 'El negocio que intenta actualizar, no existe!' });

      if (incrementFor == 'Caja') {
        const response = await this.patchStockByCode(
          code,
          stock * quantityDrawer
        );
        return res.status(200).json({
          message: 'Stock actualizado exitosamente',
          body: response,
        });
      }

      const response = await this.patchStockByCode(code, stock);
      return res.status(200).json({
        message: 'Stock actualizado exitosamente',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar actualizar stock por codigo',
        error,
      });
    }
  }

  /**
   * Método para actualizar el stock de un negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async updateStockById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const stock: number = req.body.stock;

      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findBusiness = await this.getBusinessById(Number(id));
      if (!findBusiness)
        return res
          .status(404)
          .json({ message: 'El negocio que intenta actualizar, no existe!' });

      const response = await this.patchStockById(Number(id), stock);
      return res.status(200).json({
        message: 'Stock actualizado exitosamente!',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar actualizar stock por id',
        error,
      });
    }
  }

  /**
   * Método para imodificar las posiciones de una lista de negocios
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async modifyPosition(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findProduct = await this.getProductById(Number(id));
      if (!findProduct)
        return res
          .status(404)
          .json({ message: 'El producto que intenta modificar, no existe!' });

      const positions: { id: number; position: number; productId: number }[] =
        req.body;

      const allSameProductId = positions.every(
        (pos) => pos.productId === Number(id)
      );

      if (!allSameProductId) {
        return res.status(400).json({
          message: 'Todos los elementos deben pertenecer al mismo producto',
        });
      }

      const response = await this.patchPosition(positions);
      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar modificar las posiciones',
        error,
      });
    }
  }

  /**
   * Método para culminar un negocio
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async completeBusiness(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es valido" });

      const findBusiness = await this.getBusinessById(Number(id));
      if (!findBusiness)
        return res
          .status(404)
          .json({ message: 'El negocio que intentas culminar, no existe!' });

      const response = await this.deleteBusiness(Number(id));
      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar culminar negocio',
        error,
      });
    }
  }
}

export default BusinessController;
