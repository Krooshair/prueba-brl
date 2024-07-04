import { z } from 'zod';

export const createSubcategory = z.object({
  name: z
    .string({ required_error: 'El campo nombre es requerido' })
    .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo nombre debe tener maximo 30 caracteres' }),
  categoryId: z
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

export const updateSubcategory = z.object({
  name: z
    .string({ required_error: 'El campo nombre es requerido' })
    .min(3, { message: 'El campo nombre debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo nombre debe tener maximo 30 caracteres' }),
  categoryId: z
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
