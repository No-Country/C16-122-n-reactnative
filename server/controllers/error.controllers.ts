import { NextFunction, Request, Response } from 'express';
import AppError from '../models/appError';
import Sequelize from 'sequelize';

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Sequelize.Error) {
    err.status = 'fail in db';

    if (err instanceof Sequelize.ValidationError) {
      // 400 Bad Request: Error de validación
      const defaultMessage =
        'Los datos proporcionados no son válidos. Asegúrate de completar todos los campos correctamente.';
      err.statusCode = 400;
      err.message = err.errors[0].message || defaultMessage;
    }
    if (err instanceof Sequelize.UniqueConstraintError) {
      // 409 Conflict: Error de restricción única
      const defaultMessage =
        'El recurso ya existe o está en conflicto con otro existente.';
      err.statusCode = 409;
      err.message = err.errors[0].message || defaultMessage;
    }
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      // 409 Conflict: Error de restricción de clave externa
      const defaultMessage =
        'El recurso relacionado tiene sub items, elimine todas sus relaciones para continuar.';
      err.statusCode = 409;
      err.message = defaultMessage;
    }
  }

  err.statusCode = err.statusCode || 500;
  err.message =
    err.message ||
    'Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.';
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

export { globalErrorHandler };
