import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface ProductAttributes extends ModelSequlize<ProductAttributes> {
  id?: CreationOptional<number>;
  name: string;
  price: number;
  description: string;
  productCategoryId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type ProductProps = Pick<
  ProductAttributes,
  'name' | 'price' | 'description' | 'productCategoryId'
>;
