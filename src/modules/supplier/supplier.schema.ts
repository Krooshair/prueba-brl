import { z } from 'zod';

export const createSupplier = z.object({
  fullName: z
    .string({ required_error: 'El campo nombre o razon social es requerido' })
    .min(3, {
      message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
    .max(50, {
      message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
  documentType: z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
    required_error: 'El campo tipo de documento es requerido',
    message:
      'El campo tipo de documento solo acepta DNI, RUC o Carnet_Extranjeria',
  }),
  documentNumber: z
    .string({
      required_error: 'El campo numero de documento es requerido',
    })
    .min(6, {
      message: 'El campo numero de documento debe tener minimo 6 caracteres',
    })
    .max(20, {
      message: 'El campo numero de documento debe tener maximo 20 caracteres',
    }),
  email: z
    .string()
    .email({ message: 'El campo correo no tiene un valor valido' })
    .optional(),
  phone: z
    .string()
    .min(6, { message: 'El campo telefono debe tener minimo 6 caracteres' })
    .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
    .optional(),
});

export const updateSupplier = z.object({
  fullName: z
    .string({ required_error: 'El campo nombre o razon social es requerido' })
    .min(3, {
      message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
    .max(50, {
      message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
  documentType: z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
    required_error: 'El campo tipo de documento es requerido',
    message:
      'El campo tipo de documento solo acepta DNI, RUC o Carnet_Extranjeria',
  }),
  documentNumber: z
    .string({
      required_error: 'El campo numero de documento es requerido',
    })
    .min(6, {
      message: 'El campo numero de documento debe tener minimo 6 caracteres',
    })
    .max(20, {
      message: 'El campo numero de documento debe tener maximo 20 caracteres',
    }),
  email: z
    .string()
    .email({ message: 'El campo correo no tiene un valor valido' })
    .optional(),
  phone: z
    .string()
    .min(6, { message: 'El campo telefono debe tener minimo 6 caracteres' })
    .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
    .optional(),
});
