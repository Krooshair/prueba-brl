import { z } from 'zod';

export const createAdmin = z
  .object({
    fullName: z
      .string({ required_error: 'El campo nombre o razon social es requerido' })
      .min(3, {
        message:
          'El campo nombre o razon social debe tener minimo 3 caracteres',
      })
      .max(50, {
        message:
          'El campo nombre o razon social debe tener maximo 50 caracteres',
      }),
    documentType: z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
      required_error: 'Debe seleccionar un tipo de documento',
      invalid_type_error:
        'El campo tipo de documento solo acepta estos valores \n DNI, RUC o Carnet_Extranjeria',
    }),
    documentNumber: z
      .string({ required_error: 'El campo numero de documento es requerido' })
      .trim()
      .min(8, {
        message: 'El campo numero de documento debe tener minimo 8 caracteres',
      })
      .max(16, {
        message: 'El campo numero de documento debe tener maximo 16 caracteres',
      })
      .regex(/^\d+$/, 'El campo numero de documento solo debe tener numeros'),
    email: z
      .string({ required_error: 'El campo correo es requerido' })
      .trim()
      .email({
        message: 'El campo correo solo acepta formatos correos validos',
      })
      .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
      .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
    phone: z
      .string({ required_error: 'El campo telefono es requerido' })
      .trim()
      .min(9, { message: 'El campo telefono debe tener minimo 9 caracteres' })
      .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
      .regex(/^\d+$/, 'El campo telefono solo debe tener numeros'),
    username: z
      .string({ required_error: 'El campo usuario es requerido' })
      .trim()
      .min(8, { message: 'El campo usuario debe tener minimo 8 caracteres' })
      .max(20, { message: 'El campo usuario debe tener maximo 20 caracteres' }),
    password: z
      .string({ required_error: 'El campo contraseña es requerido' })
      .trim()
      .min(8, { message: 'El campo contraseña debe tener minimo 8 caracteres' })
      .max(30, {
        message: 'El campo contraseña debe tener maximo 30 caracteres',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: `El campo contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
        }
      ),
    confirmPassword: z
      .string({ required_error: 'El campo confirmar contraseña es requerido' })
      .trim(),
    roleAdmin: z.enum(['Administrador', 'Empleado'], {
      required_error: 'Debe seleccionar un rol de administrador',
      invalid_type_error:
        'El campo rol de administrador solo acepta Administrador o Empleado',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      'El valor del campo confirmar contraseña no coincide con el valor del campo contraseña',
    path: ['confirmPassword'],
  });

export const createFirstAdmin = z
  .object({
    fullName: z
      .string({ required_error: 'El campo nombre o razon social es requerido' })
      .min(3, {
        message:
          'El campo nombre o razon social debe tener minimo 3 caracteres',
      })
      .max(50, {
        message:
          'El campo nombre o razon social debe tener maximo 50 caracteres',
      }),
    documentType: z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
      required_error: 'Debe seleccionar un tipo de documento',
      invalid_type_error:
        'El campo tipo de documento solo acepta estos valores \n DNI, RUC o Carnet_Extranjeria',
    }),
    documentNumber: z
      .string({ required_error: 'El campo numero de documento es requerido' })
      .trim()
      .min(8, {
        message: 'El campo numero de documento debe tener minimo 8 caracteres',
      })
      .max(16, {
        message: 'El campo numero de documento debe tener maximo 16 caracteres',
      })
      .regex(/^\d+$/, 'El campo numero de documento solo debe tener numeros'),
    email: z
      .string({ required_error: 'El campo correo es requerido' })
      .trim()
      .email({
        message: 'El campo correo solo acepta formatos correos validos',
      })
      .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
      .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
    phone: z
      .string({ required_error: 'El campo telefono es requerido' })
      .trim()
      .min(9, { message: 'El campo telefono debe tener minimo 9 caracteres' })
      .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
      .regex(/^\d+$/, 'El campo telefono solo debe tener numeros'),
    username: z
      .string({ required_error: 'El campo usuario es requerido' })
      .trim()
      .min(8, { message: 'El campo usuario debe tener minimo 8 caracteres' })
      .max(20, { message: 'El campo usuario debe tener maximo 20 caracteres' }),
    password: z
      .string({ required_error: 'El campo contraseña es requerido' })
      .trim()
      .min(8, { message: 'El campo contraseña debe tener minimo 8 caracteres' })
      .max(30, {
        message: 'El campo contraseña debe tener maximo 30 caracteres',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: `El campo contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
        }
      ),
    confirmPassword: z
      .string({ required_error: 'El campo confirmar contraseña es requerido' })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      'El valor del campo confirmar contraseña no coincide con el valor del campo contraseña',
    path: ['confirmPassword'],
  });

export const updateAdmin = z.object({
  fullName: z
    .string({ required_error: 'El campo nombre o razon social es requerido' })
    .min(3, {
      message: 'El campo nombre o razon social debe tener minimo 3 caracteres',
    })
    .max(50, {
      message: 'El campo nombre o razon social debe tener maximo 50 caracteres',
    }),
  documentType: z.enum(['DNI', 'RUC', 'Carnet_Extranjeria'], {
    required_error: 'Debe seleccionar un tipo de documento',
    invalid_type_error:
      'El campo tipo de documento solo acepta estos valores \n DNI, RUC o Carnet_Extranjeria',
  }),
  documentNumber: z
    .string({ required_error: 'El campo numero de documento es requerido' })
    .trim()
    .min(8, {
      message: 'El campo numero de documento debe tener minimo 8 caracteres',
    })
    .max(16, {
      message: 'El campo numero de documento debe tener maximo 16 caracteres',
    })
    .regex(/^\d+$/, 'El campo numero de documento solo debe tener numeros'),
  email: z
    .string({ required_error: 'El campo correo es requerido' })
    .trim()
    .email({
      message: 'El campo correo solo acepta formatos correos validos',
    })
    .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
    .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
  phone: z
    .string({ required_error: 'El campo telefono es requerido' })
    .trim()
    .min(9, { message: 'El campo telefono debe tener minimo 9 caracteres' })
    .max(20, { message: 'El campo telefono debe tener maximo 20 caracteres' })
    .regex(/^\d+$/, 'El campo telefono solo debe tener numeros'),
  roleAdmin: z.enum(['Administrador', 'Empleado'], {
    required_error: 'Debe seleccionar un rol de administrador',
    invalid_type_error:
      'El campo rol de administrador solo acepta Administrador o Empleado',
  }),
});

export const modifyPasswordAdmin = z
  .object({
    oldPassword: z
      .string({ required_error: 'El campo antigua contraseña es requerido' })
      .trim()
      .min(8, {
        message: 'El campo antigua contraseña debe tener minimo 8 caracteres',
      })
      .max(30, {
        message: 'El campo antigua contraseña debe tener maximo 30 caracteres',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: `El campo antigua contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
        }
      ),
    newPassword: z
      .string({ required_error: 'El campo nueva contraseña es requerido' })
      .trim()
      .min(8, {
        message: 'El campo nueva contraseña debe tener minimo 8 caracteres',
      })
      .max(30, {
        message: 'El campo nueva contraseña debe tener maximo 30 caracteres',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: `El campo nueva contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
        }
      ),
    confirmPassword: z
      .string({ required_error: 'El campo confirmar contraseña es requerido' })
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message:
      'El valor del campo confirmar contraseña no coincide con el valor del campo nueva contraseña',
    path: ['confirmPassword'],
  });

export const authAdmin = z.object({
  username: z
    .string({ required_error: 'El campo usuario es requerido' })
    .trim()
    .min(8, { message: 'El campo usuario debe tener minimo 8 caracteres' })
    .max(20, { message: 'El campo usuario debe tener maximo 20 caracteres' }),
  password: z
    .string({ required_error: 'El campo contraseña es requerido' })
    .trim()
    .min(8, { message: 'El campo contraseña debe tener minimo 8 caracteres' })
    .max(30, {
      message: 'El campo contraseña debe tener maximo 30 caracteres',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: `El campo contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
      }
    ),
});

export const sendEmail = z.object({
  email: z
    .string({ required_error: 'El campo correo es requerido' })
    .trim()
    .email({
      message: 'El campo correo solo acepta formatos correos validos',
    })
    .min(10, { message: 'El campo correo debe tener minimo 10 caracteres' })
    .max(60, { message: 'El campo correo debe tener maximo 60 caracteres' }),
});

export const restorePassword = z
  .object({
    newPassword: z
      .string({ required_error: 'El campo nueva contraseña es requerido' })
      .trim()
      .min(8, {
        message: 'El campo nueva contraseña debe tener minimo 8 caracteres',
      })
      .max(30, {
        message: 'El campo nueva contraseña debe tener maximo 30 caracteres',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: `El campo nueva contrseña debe tener: Una mayuscula, una minuscula, un numero y un caracter especial [@$!%*?&]`,
        }
      ),
    confirmPassword: z
      .string({ required_error: 'El campo confirmar contraseña es requerido' })
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message:
      'El valor del campo confirmar contraseña no coincide con el valor del campo nueva contraseña',
    path: ['confirmPassword'],
  });
