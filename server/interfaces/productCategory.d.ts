import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface ProductCategoryAttributes
  extends ModelSequlize<ProductCategoryAttributes> {
  id?: CreationOptional<number>;
  name: string;
  description: string;
  barId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type ProductCategoryProps = Pick<
  ProductCategoryAttributes,
  'name' | 'description' | 'barId'
>;
