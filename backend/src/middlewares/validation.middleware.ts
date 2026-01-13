import { ZodError, ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodType) => {
 return async (req: Request, res: Response, next: NextFunction) => {
   try {
     // Validar y transformar datos
     const validatedData = await schema.parseAsync(req.body);
     // Reemplazar body con datos validados
     req.body = validatedData;
     next();
   } catch (error) {
      if (error instanceof ZodError) {
        // Creamos un error con statusCode y mensaje
        const err: any = new Error("Datos inválidos");
        err.statusCode = 400;
        err.details = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        return next(err);
      }
      return next(error);

   }
 };
};