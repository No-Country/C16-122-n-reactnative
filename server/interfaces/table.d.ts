import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface TableAttributes extends ModelSequlize<TableAttributes> {
  id?: CreationOptional<number>;
  tableNumber: number;
  isOccupied: CreationOptional<boolean>;
  ability: number;
  location: string;
  barId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type TableProps = Pick<
  TableAttributes,
  'tableNumber' | 'ability' | 'location' | 'barId' | 'isOccupied'
>;
