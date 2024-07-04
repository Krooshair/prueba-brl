"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.createCategory = void 0;
const zod_1 = require("zod");
exports.createCategory = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo nombre debe tener maximo 30 caracteres' }),
});
exports.updateCategory = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
        .max(30, { message: 'El campo nombre debe tener maximo 30 caracteres' }),
});
