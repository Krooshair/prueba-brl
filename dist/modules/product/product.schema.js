"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = void 0;
const zod_1 = require("zod");
exports.createProduct = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(10, { message: 'El campo nombre debe tener minimo 10 caracteres' })
        .max(100, { message: 'El campo nombre debe tener maximo 100 caracteres' })
        .regex(/^[a-zA-Z0-9\-_ ]+$/, {
        message: 'El campo nombre solo debe contener letras, números, guiones bajos, guiones medios y espacios',
    }),
    subcategoryId: zod_1.z
        .number({
        required_error: 'Seleccione una subcategoria',
        invalid_type_error: 'El campo subcategoria debe ser de tipo numero',
    })
        .int({
        message: 'El campo subcategoria debe enviar un valor numerico entero',
    })
        .positive({
        message: 'El campo subcategoria debe enviar un valor positivo',
    }),
});
exports.updateProduct = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(10, { message: 'El campo nombre debe tener minimo 10 caracteres' })
        .max(100, { message: 'El campo nombre debe tener maximo 100 caracteres' })
        .regex(/^[a-zA-Z0-9\-_ ]+$/, {
        message: 'El campo nombre solo debe contener letras, números, guiones bajos, guiones medios y espacios',
    }),
    subcategoryId: zod_1.z
        .number({
        required_error: 'Seleccione una subcategoria',
        invalid_type_error: 'El campo subcategoria debe ser de tipo numero',
    })
        .int({
        message: 'El campo subcategoria debe enviar un valor numerico entero',
    })
        .positive({
        message: 'El campo subcategoria debe enviar un valor positivo',
    }),
});
