import isNumeric from '../../shared/utils/isNumeric';
import Supplier from './supplier.model';
import SupplierService from './supplier.service';
import { Request, Response } from 'express';

class SupplierController extends SupplierService {
  public async listSupplier(_req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.getSupplier();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al listar proveedores',
        error,
      });
    }
  }

  public async searchSupplierById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const response = await this.getSupplierById(Number(id));
      if (!response)
        return res
          .status(404)
          .json({ message: 'El proveedor que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar buscar proveedor por id',
        error,
      });
    }
  }

  public async createSupplier(req: Request, res: Response): Promise<Response> {
    try {
      const supplier: Supplier = req.body;

      const findDocument = await this.getSupplierByDocument(
        supplier.documentNumber
      );
      if (findDocument)
        return res.status(409).json({
          message:
            'El numero de documento que intenta registrar, ya esta en uso!',
        });

      if (supplier.email) {
        const findEmail = await this.getSupplierByEmail(supplier.email);
        if (findEmail)
          return res.status(409).json({
            message: 'El correo que intenta registrar, ya esta en uso!',
          });
      }

      const response = await this.postSupplier(supplier);
      return res.status(201).json({
        message: 'El proveedor se creo exitosamente!',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar crear el proveedor',
        error,
      });
    }
  }

  public async updateSupplier(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findSupplier = await this.getSupplierById(Number(id));
      if (!findSupplier)
        return res
          .status(404)
          .json({ message: 'El proveedor que intenta actualizar, no existe!' });

      const supplier: Supplier = req.body;

      const findDocument = await this.getSupplierByDocument(
        supplier.documentNumber
      );
      if (
        findDocument &&
        supplier.documentNumber == findSupplier.documentNumber &&
        supplier.documentType == findSupplier.documentType
      )
        return res.status(409).json({
          message:
            'El numero de documento que intenta registrar, ya esta en uso!',
        });

      if (supplier.email) {
        const findEmail = await this.getSupplierByEmail(supplier.email);
        if (
          findEmail &&
          findSupplier.email &&
          supplier.email == findSupplier.email
        )
          return res.status(409).json({
            message: 'El correo que intenta registrar, ya esta en uso!',
          });
      }

      const response = await this.putSupplier(Number(id), supplier);
      return res.status(200).json({
        message: 'El proveedor se actualizo exitosamente!',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar actualizar datos del proveedor',
        error,
      });
    }
  }

  public async trashSupplier(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const response = await this.deleteSupplier(Number(id));
      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar eliminar el proveedor',
        error,
      });
    }
  }
}

export default SupplierController;
