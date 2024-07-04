import { z } from 'zod';

export const createBusiness = z.object({
  typeFile: z.enum(['DOCUMENTO', 'IMAGEN'], {
    required_error: 'El campo tipo de archivo es requerido',
    message: 'El campo tipo de archivo solo acepta DOCUMENTO o IMAGEN',
  }),
  codeBusiness: z
    .string({ required_error: 'El campo codigo es requerido' })
    .trim()
    .toLowerCase()
    .min(9, { message: 'El campo codigo debe tener minimo 9 caracteres' })
    .max(36, { message: 'El campo codigo debe tener maximo 36 caracteres' }),
  investment: z.number({
    required_error: 'El campo inversion es requerido',
    invalid_type_error: 'El campo inversion debe ser de tipo numero',
  }),
  price: z.number({
    required_error: 'El campo precio regular es requerido',
    invalid_type_error: 'El campo precio regular debe ser de tipo numero',
  }),
  priceOffer: z
    .number({
      invalid_type_error: 'El campo precio regular debe ser de tipo numero',
    })
    .optional(),
  stock: z
    .number({
      required_error: 'El campo stock es requerido',
      invalid_type_error: 'El campo stock debe ser de tipo numero',
    })
    .int({ message: 'El campo stock debe enviar un valor numerico entero' }),
  quantityDrawer: z
    .number({
      required_error: 'El campo cantidad por cajon es requerido',
      invalid_type_error: 'El campo cantidad por cajon debe ser de tipo numero',
    })
    .int({
      message:
        'El campo cantidad por cajon debe enviar un valor numerico entero',
    }),
  productId: z
    .number({
      required_error: 'El campo producto es requerido',
      invalid_type_error: 'El campo producto debe ser de tipo numero',
    })
    .int({
      message: 'El campo producto debe enviar un valor numerico entero',
    })
    .positive({
      message: 'El campo producto debe enviar un valor positivo',
    }),
  supplierId: z
    .number({
      required_error: 'El campo proveedor es requerido',
      invalid_type_error: 'El campo proveedor debe ser de tipo numero',
    })
    .int({
      message: 'El campo proveedor debe enviar un valor numerico entero',
    })
    .positive({
      message: 'El campo proveedor debe enviar un valor positivo',
    }),
});

export const updateStockById = z.object({
  stock: z.number({
    required_error: 'El campo stock es requerido',
    invalid_type_error: 'El campo stock debe ser numerico',
  }),
});

export const updateStockByCode = z
  .object({
    code: z
      .string({ required_error: 'El campo codigo es requerido' })
      .trim()
      .min(9, { message: 'El campo codigo debe tener minimo 9 caracteres' })
      .max(36, { message: 'El campo codigo debe tener maximo 36 caracteres' }),
    stock: z.number({
      required_error: 'El campo stock es requerido',
      invalid_type_error: 'El campo stock debe ser numerico',
    }),
    incrementFor: z.enum(['Unidad', 'Caja'], {
      required_error: 'El campo incrementar por es requerido',
      message: 'El campor incrementar por solo acepta Unidad o Caja',
    }),
    quantityDrawer: z
      .number({
        invalid_type_error: 'El campo cantidad por caja debe ser numerico',
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.incrementFor === 'Caja') {
        return (
          typeof data.quantityDrawer === 'number' && data.quantityDrawer > 0
        );
      }
      return true;
    },
    {
      message:
        'El campo cantidad por caja es obligatorio cuando incrementar por es "Caja"',
      path: ['quantityDrawer'],
    }
  );

export const modifyPosition = z
  .array(
    z.object({
      id: z.number({
        required_error: 'El campo id es requerido',
        invalid_type_error: 'El campo id debe ser numerico',
      }),
      position: z.number({
        required_error: 'El campo position es requerido',
        invalid_type_error: 'El campo position debe ser numerico',
      }),
      productId: z.number({
        required_error: 'El campo productId es requerido',
        invalid_type_error: 'El campo productId debe ser numerico',
      }),
    }),
    {
      required_error: 'La lista de posiciones es requerida',
      message: 'Debe enviar una lista de negocios con sus nuevas posiciones',
    }
  )
  .nonempty({
    message: 'La lista de posiciones no debe estar vacío',
  });

export const updateBill = z.object({
  typeFile: z.enum(['DOCUMENTO', 'IMAGEN'], {
    required_error: 'El campo tipo de archivo es requerido',
    message: 'El campo tipo de archivo solo acepta DOCUMENTO o IMAGEN',
  }),
});
