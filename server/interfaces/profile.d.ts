import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize, Role } from './types';

export type Role = 'ADMIN' | 'EMPLOYEE' | 'CHEF';


export interface ProfileAttributes extends ModelSequlize<ProfileAttributes> {
  id?: CreationOptional<number>;
  name: string;
  role: CreationOptional<Role>;
  pinCode: string;
  barId: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type ProfileProps = Pick<
  ProfileAttributes,
  'name' | 'role' | 'pinCode' | 'barId'
>;
