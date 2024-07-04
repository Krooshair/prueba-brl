import { z } from 'zod';

export const createSale = z.object({
  deliveryType: z.enum(['RECOJO', 'ENVIO'], {
    required_error: 'El campo tipo de entrega es requerido',
    message: "El campo tipo de entrega solo acepta 'ENVIO' o 'RECOJO'",
  }),
  adminId: z.string({ required_error: 'El campo administrador es requerido' }),
  clientId: z.string({ required_error: 'El campo cliente es requerido' }),
  totalAmount: z.number({
    required_error: 'El campo monto total es requerido',
  }),
  typeFileBills: z.enum(['DOCUMENTO', 'IMAGEN'], {
    required_error: 'El campo tipo de archivo de comprobante es requerido',
    message:
      "El campo tipo de archivo de comprobante solo acepta 'DOCUMENTO' o 'IMAGEN'",
  }),
  typeFileGuide: z
    .enum(['DOCUMENTO', 'IMAGEN'], {
      message:
        "El campo tipo de archivo de guia solo acepta 'DOCUMENTO' o 'IMAGEN'",
    })
    .optional(),
  agency: z
    .string()
    .min(3, { message: 'El campo agencia debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo agencia debe tener maximo 30 caracteres' })
    .optional(),
  region: z
    .string()
    .min(3, { message: 'El campo region debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo region debe tener maximo 30 caracteres' })
    .optional(),
  province: z
    .string()
    .min(3, { message: 'El campo provincia debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo provincia debe tener maximo 30 caracteres' })
    .optional(),
  district: z
    .string()
    .min(3, { message: 'El campo distrito debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo distrito debe tener maximo 30 caracteres' })
    .optional(),
  direction: z
    .string()
    .min(3, { message: 'El campo direccion debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo direccion debe tener maximo 30 caracteres' })
    .optional(),
  reference: z
    .string()
    .min(3, { message: 'El campo referencia debe tener minimo 3 caracteres' })
    .max(30, { message: 'El campo referencia debe tener maximo 30 caracteres' })
    .optional(),
});

export const updateStatusSale = z.object({
  statusSale: z.enum(['Pagado', 'Enviando', 'Culminado', 'Cancelado'], {
    required_error: 'El campo estado de venta es requerido',
    invalid_type_error:
      "El campo estado de venta solo acepta 'Pagado', 'Enviando', 'Culminado' o 'Cancelado'",
  }),
});
