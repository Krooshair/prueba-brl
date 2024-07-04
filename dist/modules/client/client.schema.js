"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryDocumentNumber = exports.updateClient = exports.createClient = void 0;
const zod_1 = require("zod");
exports.createClient = zod_1.z.object({
    fullName: zod_1.z
        .string({ required_error: 'El campo nombre o razon social es requerido' })
        .min(3, {
        message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
        .max(50, {
        message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
    documentType: zod_1.z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
        required_error: 'Debe seleccionar un tipo de documento',
        message: 'El campo tipo de documento solo acepta estos valores \n DNI, RUC o Carnet_Extranjeria',
    }),
    documentNumber: zod_1.z
        .string({ required_error: 'El campo numero de documento es requerido' })
        .trim()
        .min(8, {
        message: 'El campo numero de documento debe tener minimo 8 caracteres',
    })
        .max(16, {
        message: 'El campo numero de documento debe tener maximo 16 caracteres',
    })
        .regex(/^\d+$/, 'El campo numero de documento solo debe tener numeros'),
    email: zod_1.z
        .string({ required_error: 'El campo correo es requerido' })
        .trim()
        .email({
        message: 'El campo correo solo acepta formatos correos validos',
    })
        .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
        .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
    phone: zod_1.z
        .string({ required_error: 'El campo telefono es requerido' })
        .trim()
        .min(9, { message: 'El campo telefono debe tener minimo 9 caracteres' })
        .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
        .regex(/^\d+$/, 'El campo telefono solo debe tener numeros'),
});
exports.updateClient = zod_1.z.object({
    fullName: zod_1.z
        .string({ required_error: 'El campo nombre o razon social es requerido' })
        .min(3, {
        message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
        .max(50, {
        message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
    documentType: zod_1.z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
        required_error: 'Debe seleccionar un tipo de documento',
        invalid_type_error: 'El campo tipo de documento solo acepta estos valores \n DNI, RUC o Carnet_Extranjeria',
    }),
    documentNumber: zod_1.z
        .string({ required_error: 'El campo numero de documento es requerido' })
        .trim()
        .min(8, {
        message: 'El campo numero de documento debe tener minimo 8 caracteres',
    })
        .max(16, {
        message: 'El campo numero de documento debe tener maximo 16 caracteres',
    })
        .regex(/^\d+$/, 'El campo numero de documento solo debe tener numeros'),
    email: zod_1.z
        .string({ required_error: 'El campo correo es requerido' })
        .trim()
        .email({
        message: 'El campo correo solo acepta formatos correos validos',
    })
        .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
        .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
    phone: zod_1.z
        .string({ required_error: 'El campo telefono es requerido' })
        .trim()
        .min(9, { message: 'El campo telefono debe tener minimo 9 caracteres' })
        .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
        .regex(/^\d+$/, 'El campo telefono solo debe tener numeros'),
});
exports.queryDocumentNumber = zod_1.z.object({
    documentNumber: zod_1.z
        .string({ required_error: 'El campo numero de documento es requerido' })
        .trim()
        .min(8, {
        message: 'El campo numero de documento debe tener minimo 8 caracteres',
    })
        .max(16, {
        message: 'El campo numero de documento debe tener maximo 16 caracteres',
    })
        .regex(/^\d+$/, 'El campo numero de documento solo debe tener numeros'),
    documentType: zod_1.z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
        required_error: 'Debe seleccionar un tipo de documento',
        message: 'El campo tipo de documento solo acepta DNI, RUC o Carnet_Extranjeria',
    }),
});
