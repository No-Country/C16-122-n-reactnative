import { NextFunction, Request, Response } from 'express';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Data {}

export type ModelSequlize<T> = Model<
  InferAttributes<T>,
  InferCreationAttributes<T>
>;

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type TokenType = 'barSession' | 'profileSession';
