import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize, Role } from './types';

export interface VerificationAttributes
  extends ModelSequlize<VerificationAttributes> {
  id?: CreationOptional<number>;
  code: string;
  expiresAt: number;
  barId: number;
}

export type VerificationProps = Pick<VerificationAttributes, 'code' | 'barId'>;
