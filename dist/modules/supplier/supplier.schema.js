"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplier = exports.createSupplier = void 0;
const zod_1 = require("zod");
exports.createSupplier = zod_1.z.object({
    fullName: zod_1.z
        .string({ required_error: 'El campo nombre o razon social es requerido' })
        .min(3, {
        message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
        .max(50, {
        message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
    documentType: zod_1.z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
        required_error: 'El campo tipo de documento es requerido',
        message: 'El campo tipo de documento solo acepta DNI, RUC o Carnet_Extranjeria',
    }),
    documentNumber: zod_1.z
        .string({
        required_error: 'El campo numero de documento es requerido',
    })
        .min(6, {
        message: 'El campo numero de documento debe tener minimo 6 caracteres',
    })
        .max(20, {
        message: 'El campo numero de documento debe tener maximo 20 caracteres',
    }),
    email: zod_1.z
        .string()
        .email({ message: 'El campo correo no tiene un valor valido' })
        .optional(),
    phone: zod_1.z
        .string()
        .min(6, { message: 'El campo telefono debe tener minimo 6 caracteres' })
        .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
        .optional(),
});
exports.updateSupplier = zod_1.z.object({
    fullName: zod_1.z
        .string({ required_error: 'El campo nombre o razon social es requerido' })
        .min(3, {
        message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
        .max(50, {
        message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
    documentType: zod_1.z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
        required_error: 'El campo tipo de documento es requerido',
        message: 'El campo tipo de documento solo acepta DNI, RUC o Carnet_Extranjeria',
    }),
    documentNumber: zod_1.z
        .string({
        required_error: 'El campo numero de documento es requerido',
    })
        .min(6, {
        message: 'El campo numero de documento debe tener minimo 6 caracteres',
    })
        .max(20, {
        message: 'El campo numero de documento debe tener maximo 20 caracteres',
    }),
    email: zod_1.z
        .string()
        .email({ message: 'El campo correo no tiene un valor valido' })
        .optional(),
    phone: zod_1.z
        .string()
        .min(6, { message: 'El campo telefono debe tener minimo 6 caracteres' })
        .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
        .optional(),
});
