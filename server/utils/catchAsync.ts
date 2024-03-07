import { NextFunction, Request, Response } from 'express';
import { ControllerFunction } from '../interfaces';

const catchAsync = (fn: ControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export { catchAsync };
