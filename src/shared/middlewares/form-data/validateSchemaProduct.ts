import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validateSchemaProduct =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      req.body.subcategoryId = Number(req.body.subcategoryId);

      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errosMessages = error.errors.map((err) => ({
          [err.path[0]]: err.message,
        }));
        return res.status(400).json({ message: errosMessages });
      }
      next(error);
    }
  };

export default validateSchemaProduct;
