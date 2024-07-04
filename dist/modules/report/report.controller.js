"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const report_service_1 = __importDefault(require("./report.service"));
const exceljs_1 = __importDefault(require("exceljs"));
class ReportController extends report_service_1.default {
    async listReportGlobal(req, res) {
        try {
            const { year } = req.query;
            if (!(0, isNumeric_1.default)(Number(year)))
                return res.status(400).json({ message: 'El año debe ser numerico' });
            const response = await this.getReportGlobal(Number(year));
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar listar el reporte global',
            });
        }
    }
    async listReportByAdmin(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const { year } = req.query;
            if (!(0, isNumeric_1.default)(Number(year)))
                return res.status(400).json({ message: 'El año debe ser numerico' });
            const findAdmin = await this.getAdminById(Number(id));
            if (!findAdmin)
                return res
                    .status(404)
                    .json({ message: 'El administrado que busca, no existe!' });
            const response = await this.getReportByAdmin(Number(year), Number(id));
            return res.status(200).json({
                admin: findAdmin.fullName,
                report: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar listar el reporte global por personal',
            });
        }
    }
    async listReportByClient(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const { year } = req.query;
            if (!(0, isNumeric_1.default)(Number(year)))
                return res.status(400).json({ message: 'El año debe ser numerico' });
            const findClient = await this.getClientById(Number(id));
            if (!findClient)
                return res
                    .status(404)
                    .json({ message: 'El cliente que busca, no existe!' });
            const response = await this.getReportByClient(Number(year), Number(id));
            return res.status(200).json({
                client: findClient.fullName,
                report: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar listar el reporte global por cliente',
            });
        }
    }
    async listReportByBusiness(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const { year } = req.query;
            if (!(0, isNumeric_1.default)(Number(year)))
                return res.status(400).json({ message: 'El año debe ser numerico' });
            const findBusiness = await this.getBusinessById(Number(id));
            if (!findBusiness)
                return res
                    .status(404)
                    .json({ message: 'El negocio que busca, no existe!' });
            const response = await this.getReportByBusiness(Number(year), Number(id));
            return res.status(200).json({
                codeBusiness: findBusiness.codeBusiness,
                report: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar listar el reporte global por negocio',
            });
        }
    }
    async downloadReportForMonth(req, res) {
        try {
            const { year } = req.query;
            if (!(0, isNumeric_1.default)(Number(year)))
                return res.status(400).json({ message: 'El año debe ser numerico' });
            const response = await this.getReportGlobal(Number(year));
            const workbook = new exceljs_1.default.Workbook();
            for (const month of Object.keys(response)) {
                const monthData = response[month];
                if (monthData) {
                    const worksheet = workbook.addWorksheet(month);
                    // Agregar encabezados
                    worksheet.columns = [
                        { header: 'Código Venta', key: 'codeSale', width: 30 },
                        { header: 'Empleado', key: 'admin', width: 50 },
                        { header: 'Cliente', key: 'client', width: 50 },
                        { header: 'Total de Venta', key: 'totalSold', width: 20 },
                    ];
                    worksheet.getRow(1).eachCell((cell) => {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFCCFFCC' }, // Fondo verde claro
                        };
                        cell.font = {
                            bold: true,
                            color: { argb: 'FF000000' }, // Color de fuente negro
                        };
                    });
                    if (monthData.sale && monthData.sale.length > 0) {
                        for (const sale of monthData.sale) {
                            worksheet.addRow({
                                codeSale: sale.codeSale,
                                admin: sale.admin?.fullName || 'Desconocido',
                                client: sale.client?.fullName || 'Desconocido',
                                totalSold: 'S/ ' + sale.totalAmount?.toFixed(2) || 'S/ 0.00',
                            });
                        }
                        const totalRow = worksheet.addRow({
                            codeSale: 'Total',
                            totalSold: 'S/ ' + monthData.totalSold.toFixed(2),
                        });
                        totalRow.font = { bold: true };
                        totalRow.eachCell((cell) => {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFFFE699' }, // Fondo amarillo claro
                            };
                        });
                    }
                    else {
                        worksheet.addRow({
                            codeSale: 'No hay ventas para este mes',
                        });
                    }
                }
            }
            const buffer = await workbook.xlsx.writeBuffer();
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}-${now.getMilliseconds()}`;
            const fileName = `report-${formattedDate}-${formattedTime}.xlsx`;
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(buffer);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar listar el reporte global',
            });
        }
    }
    async downloadReportGlobal(req, res) {
        try {
            const { year } = req.query;
            if (!(0, isNumeric_1.default)(Number(year)))
                return res.status(400).json({ message: 'El año debe ser numerico' });
            const month = req.query.month
                ? parseInt(req.query.month, 10)
                : undefined;
            const clientId = req.query.clientId
                ? parseInt(req.query.clientId, 10)
                : undefined;
            const adminId = req.query.adminId
                ? parseInt(req.query.adminId, 10)
                : undefined;
            const businessId = req.query.businessId
                ? parseInt(req.query.businessId, 10)
                : undefined;
            const response = await this.getReportForDownload(Number(year), month, clientId, adminId, businessId);
            const workbook = new exceljs_1.default.Workbook();
            workbook.creator = 'Your App';
            workbook.created = new Date();
            workbook.modified = new Date();
            const worksheet = workbook.addWorksheet('Reporte');
            worksheet.columns = [
                { header: 'Code Sale', key: 'codeSale', width: 20 },
                {
                    header: 'Total Amount',
                    key: 'totalAmount',
                    width: 15,
                    style: { numFmt: '"S/"#,##0.00' },
                },
                { header: 'Admin Name', key: 'adminName', width: 25 },
                { header: 'Client Name', key: 'clientName', width: 25 },
                { header: 'Business Code', key: 'businessCode', width: 20 },
                { header: 'Product Name', key: 'productName', width: 25 },
                { header: 'Quantity', key: 'quantity', width: 10 },
            ];
            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '1E90FF' },
            };
            response.sale?.forEach((sale) => {
                sale.saleBusiness?.forEach((sb) => {
                    worksheet.addRow({
                        codeSale: sale.codeSale,
                        totalAmount: sale.totalAmount?.toString(),
                        adminName: sale.admin?.fullName,
                        clientName: sale.client?.fullName,
                        businessCode: sb.business?.codeBusiness,
                        productName: sb.business?.product.name,
                        quantity: sb.quantity,
                    });
                });
            });
            const buffer = await workbook.xlsx.writeBuffer();
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}-${now.getMilliseconds()}`;
            const fileName = `report-${formattedDate}-${formattedTime}.xlsx`;
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(buffer);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar listar el reporte global',
            });
        }
    }
    async downloadReportByBusiness(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numerico" });
            const findBusiness = await this.getBusinessById(Number(id));
            if (!findBusiness)
                return res
                    .status(404)
                    .json({ message: 'El negocio que busca, no existe!' });
            const response = await this.getReportForDownloadBusiness(Number(id));
            const workbook = new exceljs_1.default.Workbook();
            workbook.creator = 'BRL Import - Gerente';
            workbook.created = new Date();
            workbook.modified = new Date();
            const worksheet = workbook.addWorksheet('Reporte Negocio');
            worksheet.columns = [
                { header: 'Codigo de venta', key: 'codeSale', width: 30 },
                {
                    header: 'Monto total',
                    key: 'totalAmount',
                    width: 15,
                    style: { numFmt: '"S/"#,##0.00' },
                },
                { header: 'Producto', key: 'productName', width: 50 },
                { header: 'Cantidad', key: 'quantity', width: 10 },
                {
                    header: 'Inversion total',
                    key: 'investment',
                    width: 15,
                    style: { numFmt: '"S/"#,##0.00' },
                },
                { header: 'Stock inicial', key: 'initialStock', width: 15 },
                { header: 'Stock', key: 'stock', width: 10 },
                { header: 'Estado de ingreso', key: 'statusIncome', width: 20 },
            ];
            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '1E90FF' },
            };
            response.sale?.forEach((sale) => {
                sale.saleBusiness?.forEach((sb) => {
                    worksheet.addRow({
                        codeSale: sale.codeSale,
                        totalAmount: sale.totalAmount?.toString(),
                        productName: sb.business?.product.name,
                        quantity: sb.quantity,
                        initialStock: '',
                        stock: '',
                    });
                });
            });
            const totalRow = worksheet.addRow({
                codeSale: 'Total',
                totalAmount: response.totalSold.toString(),
                productName: '',
                quantity: '',
                investment: response.totalInvested?.toString(),
                initialStock: response.sale &&
                    response.sale[0].saleBusiness &&
                    response.sale[0].saleBusiness[0].business?.initialStock,
                stock: response.sale &&
                    response.sale[0].saleBusiness &&
                    response.sale[0].saleBusiness[0].business?.stock,
                statusIncome: response.incomeStatus,
            });
            let fillColor;
            switch (response.incomeStatus) {
                case 'Ganancia':
                    fillColor = '00FF00'; // Green
                    break;
                case 'Recuperado':
                    fillColor = 'FFFF00'; // Yellow
                    break;
                case 'Perdida':
                    fillColor = 'FF0000'; // Red
                    break;
            }
            totalRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: fillColor },
                };
                cell.font = { bold: true };
            });
            const buffer = await workbook.xlsx.writeBuffer();
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}-${now.getMilliseconds()}`;
            const fileName = `report-${formattedDate}-${formattedTime}.xlsx`;
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(buffer);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error inesperado al intentar descargar el reporte global por negocio',
            });
        }
    }
}
exports.default = ReportController;
