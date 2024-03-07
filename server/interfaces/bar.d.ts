import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface BarAttributes extends ModelSequlize<BarAttributes> {
  id?: CreationOptional<number>;
  name: string;
  password: string;
  userName: string;
  email: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type BarProps = Pick<
  BarAttributes,
  'name' | 'password' | 'userName' | 'email'
>;
