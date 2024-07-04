import { z } from 'zod';

export const createCategory = z.object({
  name: z
    .string({ required_error: 'El campo nombre es requerido' })
    .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
    .max(30, {message: 'El campo nombre debe tener maximo 30 caracteres'}),
});

export const updateCategory = z.object({
  name: z
    .string({ required_error: 'El campo nombre es requerido' })
    .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
    .max(30, {message: 'El campo nombre debe tener maximo 30 caracteres'}),
});