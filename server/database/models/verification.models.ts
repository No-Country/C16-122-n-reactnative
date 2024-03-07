import { DataTypes } from 'sequelize';
import { VerificationAttributes } from '../../interfaces';
import db from '../db';
import BarModel from './bar.models';

const VerificationModel = db.define<VerificationAttributes>(
  'verifications',
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo 'code' es obligatorio y debe ser proporcionado.",
        },
      },
    },
    expiresAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo 'expiresAt' es obligatorio y debe ser proporcionado.",
        },
      },
    },
    barId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BarModel,
        key: 'id',
      },
      validate: {
        notNull: {
          msg: "El campo 'barId' es obligatorio y debe ser proporcionado.",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default VerificationModel;
