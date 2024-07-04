"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusSale = exports.createSale = void 0;
const zod_1 = require("zod");
exports.createSale = zod_1.z.object({
    deliveryType: zod_1.z.enum(['RECOJO', 'ENVIO'], {
        required_error: 'El campo tipo de entrega es requerido',
        message: "El campo tipo de entrega solo acepta 'ENVIO' o 'RECOJO'",
    }),
    adminId: zod_1.z.string({ required_error: 'El campo administrador es requerido' }),
    clientId: zod_1.z.string({ required_error: 'El campo cliente es requerido' }),
    totalAmount: zod_1.z.number({
        required_error: 'El campo monto total es requerido',
    }),
    typeFileBills: zod_1.z.enum(['DOCUMENTO', 'IMAGEN'], {
        required_error: 'El campo tipo de archivo de comprobante es requerido',
        message: "El campo tipo de archivo de comprobante solo acepta 'DOCUMENTO' o 'IMAGEN'",
    }),
    typeFileGuide: zod_1.z
        .enum(['DOCUMENTO', 'IMAGEN'], {
        message: "El campo tipo de archivo de guia solo acepta 'DOCUMENTO' o 'IMAGEN'",
    })
        .optional(),
    agency: zod_1.z
        .string()
        .min(3, { message: 'El campo agencia debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo agencia debe tener maximo 30 caracteres' })
        .optional(),
    region: zod_1.z
        .string()
        .min(3, { message: 'El campo region debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo region debe tener maximo 30 caracteres' })
        .optional(),
    province: zod_1.z
        .string()
        .min(3, { message: 'El campo provincia debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo provincia debe tener maximo 30 caracteres' })
        .optional(),
    district: zod_1.z
        .string()
        .min(3, { message: 'El campo distrito debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo distrito debe tener maximo 30 caracteres' })
        .optional(),
    direction: zod_1.z
        .string()
        .min(3, { message: 'El campo direccion debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo direccion debe tener maximo 30 caracteres' })
        .optional(),
    reference: zod_1.z
        .string()
        .min(3, { message: 'El campo referencia debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo referencia debe tener maximo 30 caracteres' })
        .optional(),
});
exports.updateStatusSale = zod_1.z.object({
    statusSale: zod_1.z.enum(['Pagado', 'Enviando', 'Culminado', 'Cancelado'], {
        required_error: 'El campo estado de venta es requerido',
        invalid_type_error: "El campo estado de venta solo acepta 'Pagado', 'Enviando', 'Culminado' o 'Cancelado'",
    }),
});
