"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sale_service_1 = __importDefault(require("./sale.service"));
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const Cloudinary_1 = require("../../shared/services/Cloudinary");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
class SaleController extends sale_service_1.default {
    async listSale(req, res) {
        try {
            const { statusSale, } = req.query;
            const response = await this.getSale(statusSale);
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar ventas',
                error,
            });
        }
    }
    async searchSaleById(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const response = await this.getSaleById(Number(id));
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'La venta que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar buscar venta por id',
                error,
            });
        }
    }
    async searchSaleByCode(req, res) {
        try {
            const { code } = req.params;
            const response = await this.getSaleByCode(code);
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'La venta que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar buscar venta por codigo',
                error,
            });
        }
    }
    async createSale(req, res) {
        const reqWithFiles = req;
        try {
            const sale = req.body;
            const { randomUUID } = new short_unique_id_1.default({ length: 10 });
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
                const validateStock = await this.getBusinessByStock(bus.businessId, bus.quantity);
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
                    const result = await (0, Cloudinary_1.CloudinaryDocument)(guide, 'brl/ventas/guias', true, sale.codeSale);
                    const url = result?.url;
                    if (!url)
                        return res.status(400).json({
                            message: 'Ocurrio un error inesperado al intentar subir la guia',
                        });
                    sale.guide = url;
                }
                else {
                    const guide = reqWithFiles.files.guide[0];
                    const result = await (0, Cloudinary_1.Cloudinary)(guide, 1080, 1080, 'fit', 'brl/ventas/guias', true, sale.codeSale);
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
                const result = await (0, Cloudinary_1.CloudinaryDocument)(bill, 'brl/ventas/facturas', true, sale.codeSale);
                const url = result?.url;
                if (!url)
                    return res.status(400).json({
                        message: 'Ocurrio un error al tratar de subir el comprobante',
                    });
                sale.bills = url;
            }
            else {
                const bill = reqWithFiles.files.bill[0];
                const result = await (0, Cloudinary_1.Cloudinary)(bill, 1080, 2160, 'fit', 'brl/ventas/facturas', true, sale.codeSale);
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
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar crear una venta',
                error,
            });
        }
    }
    async modifyStatusSale(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const findSale = await this.getSaleById(Number(id));
            if (!findSale)
                return res
                    .status(404)
                    .json({ message: 'La venta que intenta modificar, no existe!' });
            const { statusSale, } = req.body;
            const response = await this.putSaleStatus(Number(id), statusSale);
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar modificar el estado de la venta',
                error,
            });
        }
    }
}
exports.default = SaleController;
