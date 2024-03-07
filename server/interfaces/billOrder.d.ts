import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';
import { OrderDetailAttributes } from './orderDetail';

export interface BillOrderAttributes
  extends ModelSequlize<BillOrderAttributes> {
  id?: CreationOptional<number>;
  total?: CreationOptional<number>;
  isBilled: CreationOptional<boolean>;
  profileId: number;
  tableId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  orderDetails?: OrderDetailAttributes[];
}

export type BillOrderProps = Pick<
  BillOrderAttributes,
  'total' | 'profileId' | 'tableId'
>;
