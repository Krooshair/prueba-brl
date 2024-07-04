"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubcategory = exports.createSubcategory = void 0;
const zod_1 = require("zod");
exports.createSubcategory = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo nombre debe tener maximo 30 caracteres' }),
    categoryId: zod_1.z
        .number({
        required_error: 'Seleccione una categoria',
        invalid_type_error: 'El campo categoria debe ser de tipo numero',
    })
        .int({
        message: 'El campo categoria debe enviar un valor numerico entero',
    })
        .positive({
        message: 'El campo subcategoria debe enviar un valor positivo',
    }),
});
exports.updateSubcategory = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo nombre debe tener maximo 30 caracteres' }),
    categoryId: zod_1.z
        .number({
        required_error: 'Seleccione una categoria',
        invalid_type_error: 'El campo categoria debe ser un numero',
    })
        .int({
        message: 'El campo categoria debe enviar un valor numerico entero',
    })
        .positive({
        message: 'El campo categoria debe enviar un valor positivo',
    }),
});
