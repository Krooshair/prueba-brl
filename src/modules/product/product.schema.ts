import { z } from 'zod';

export const createProduct = z.object({
  name: z
    .string({ required_error: 'El campo nombre es requerido' })
    .min(10, { message: 'El campo nombre debe tener minimo 10 caracteres' })
    .max(100, { message: 'El campo nombre debe tener maximo 100 caracteres' })
    .regex(/^[a-zA-Z0-9\-_ ]+$/, {
      message:
        'El campo nombre solo debe contener letras, números, guiones bajos, guiones medios y espacios',
    }),
  subcategoryId: z
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

export const updateProduct = z.object({
  name: z
    .string({ required_error: 'El campo nombre es requerido' })
    .min(10, { message: 'El campo nombre debe tener minimo 10 caracteres' })
    .max(100, { message: 'El campo nombre debe tener maximo 100 caracteres' })
    .regex(/^[a-zA-Z0-9\-_ ]+$/, {
      message:
        'El campo nombre solo debe contener letras, números, guiones bajos, guiones medios y espacios',
    }),
  subcategoryId: z
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
