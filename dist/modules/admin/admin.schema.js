"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restorePassword = exports.sendEmail = exports.authAdmin = exports.modifyPasswordAdmin = exports.updateAdmin = exports.createFirstAdmin = exports.createAdmin = void 0;
const zod_1 = require("zod");
exports.createAdmin = zod_1.z
    .object({
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
    username: zod_1.z
        .string({ required_error: 'El campo usuario es requerido' })
        .trim()
        .min(8, { message: 'El campo usuario debe tener minimo 8 caracteres' })
        .max(20, { message: 'El campo usuario debe tener maximo 20 caracteres' }),
    password: zod_1.z
        .string({ required_error: 'El campo contraseña es requerido' })
        .trim()
        .min(8, { message: 'El campo contraseña debe tener minimo 8 caracteres' })
        .max(30, {
        message: 'El campo contraseña debe tener maximo 30 caracteres',
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `El campo contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
    }),
    confirmPassword: zod_1.z
        .string({ required_error: 'El campo confirmar contraseña es requerido' })
        .trim(),
    roleAdmin: zod_1.z.enum(['Administrador', 'Empleado'], {
        required_error: 'Debe seleccionar un rol de administrador',
        invalid_type_error: 'El campo rol de administrador solo acepta Administrador o Empleado',
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'El valor del campo confirmar contraseña no coincide con el valor del campo contraseña',
    path: ['confirmPassword'],
});
exports.createFirstAdmin = zod_1.z
    .object({
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
    username: zod_1.z
        .string({ required_error: 'El campo usuario es requerido' })
        .trim()
        .min(8, { message: 'El campo usuario debe tener minimo 8 caracteres' })
        .max(20, { message: 'El campo usuario debe tener maximo 20 caracteres' }),
    password: zod_1.z
        .string({ required_error: 'El campo contraseña es requerido' })
        .trim()
        .min(8, { message: 'El campo contraseña debe tener minimo 8 caracteres' })
        .max(30, {
        message: 'El campo contraseña debe tener maximo 30 caracteres',
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `El campo contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
    }),
    confirmPassword: zod_1.z
        .string({ required_error: 'El campo confirmar contraseña es requerido' })
        .trim(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'El valor del campo confirmar contraseña no coincide con el valor del campo contraseña',
    path: ['confirmPassword'],
});
exports.updateAdmin = zod_1.z.object({
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
    roleAdmin: zod_1.z.enum(['Administrador', 'Empleado'], {
        required_error: 'Debe seleccionar un rol de administrador',
        invalid_type_error: 'El campo rol de administrador solo acepta Administrador o Empleado',
    }),
});
exports.modifyPasswordAdmin = zod_1.z
    .object({
    oldPassword: zod_1.z
        .string({ required_error: 'El campo antigua contraseña es requerido' })
        .trim()
        .min(8, {
        message: 'El campo antigua contraseña debe tener minimo 8 caracteres',
    })
        .max(30, {
        message: 'El campo antigua contraseña debe tener maximo 30 caracteres',
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `El campo antigua contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
    }),
    newPassword: zod_1.z
        .string({ required_error: 'El campo nueva contraseña es requerido' })
        .trim()
        .min(8, {
        message: 'El campo nueva contraseña debe tener minimo 8 caracteres',
    })
        .max(30, {
        message: 'El campo nueva contraseña debe tener maximo 30 caracteres',
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `El campo nueva contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
    }),
    confirmPassword: zod_1.z
        .string({ required_error: 'El campo confirmar contraseña es requerido' })
        .trim(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'El valor del campo confirmar contraseña no coincide con el valor del campo nueva contraseña',
    path: ['confirmPassword'],
});
exports.authAdmin = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: 'El campo usuario es requerido' })
        .trim()
        .min(8, { message: 'El campo usuario debe tener minimo 8 caracteres' })
        .max(20, { message: 'El campo usuario debe tener maximo 20 caracteres' }),
    password: zod_1.z
        .string({ required_error: 'El campo contraseña es requerido' })
        .trim()
        .min(8, { message: 'El campo contraseña debe tener minimo 8 caracteres' })
        .max(30, {
        message: 'El campo contraseña debe tener maximo 30 caracteres',
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `El campo contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
    }),
});
exports.sendEmail = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'El campo correo es requerido' })
        .trim()
        .email({
        message: 'El campo correo solo acepta formatos correos validos',
    })
        .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
        .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
});
exports.restorePassword = zod_1.z
    .object({
    newPassword: zod_1.z
        .string({ required_error: 'El campo nueva contraseña es requerido' })
        .trim()
        .min(8, {
        message: 'El campo nueva contraseña debe tener minimo 8 caracteres',
    })
        .max(30, {
        message: 'El campo nueva contraseña debe tener maximo 30 caracteres',
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: `El campo nueva contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
    }),
    confirmPassword: zod_1.z
        .string({ required_error: 'El campo confirmar contraseña es requerido' })
        .trim(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'El valor del campo confirmar contraseña no coincide con el valor del campo nueva contraseña',
    path: ['confirmPassword'],
});
