"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const supplier_service_1 = __importDefault(require("./supplier.service"));
class SupplierController extends supplier_service_1.default {
    async listSupplier(_req, res) {
        try {
            const response = await this.getSupplier();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar proveedores',
                error,
            });
        }
    }
    async searchSupplierById(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const response = await this.getSupplierById(Number(id));
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'El proveedor que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar buscar proveedor por id',
                error,
            });
        }
    }
    async createSupplier(req, res) {
        try {
            const supplier = req.body;
            const findDocument = await this.getSupplierByDocument(supplier.documentNumber);
            if (findDocument)
                return res.status(409).json({
                    message: 'El numero de documento que intenta registrar, ya esta en uso!',
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
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar crear el proveedor',
                error,
            });
        }
    }
    async updateSupplier(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const findSupplier = await this.getSupplierById(Number(id));
            if (!findSupplier)
                return res
                    .status(404)
                    .json({ message: 'El proveedor que intenta actualizar, no existe!' });
            const supplier = req.body;
            const findDocument = await this.getSupplierByDocument(supplier.documentNumber);
            if (findDocument &&
                supplier.documentNumber == findSupplier.documentNumber &&
                supplier.documentType == findSupplier.documentType)
                return res.status(409).json({
                    message: 'El numero de documento que intenta registrar, ya esta en uso!',
                });
            if (supplier.email) {
                const findEmail = await this.getSupplierByEmail(supplier.email);
                if (findEmail &&
                    findSupplier.email &&
                    supplier.email == findSupplier.email)
                    return res.status(409).json({
                        message: 'El correo que intenta registrar, ya esta en uso!',
                    });
            }
            const response = await this.putSupplier(Number(id), supplier);
            return res.status(200).json({
                message: 'El proveedor se actualizo exitosamente!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar actualizar datos del proveedor',
                error,
            });
        }
    }
    async trashSupplier(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const response = await this.deleteSupplier(Number(id));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar eliminar el proveedor',
                error,
            });
        }
    }
}
exports.default = SupplierController;
