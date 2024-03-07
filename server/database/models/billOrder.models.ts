import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { BillOrderAttributes } from '../../interfaces';
import ProfileModel from './profile.models';
import TableModel from './table.models';

const BillOrderModel = db.define<BillOrderAttributes>('billOrders', {
  total: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'total' es obligatorio y debe ser proporcionado.",
      },
      isNumeric: {
        msg: "El campo 'total' tiene que ser numerico.",
      },
    },
  },
  isBilled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isBoolean(value: unknown) {
        if (typeof value !== 'boolean') {
          throw new Error("El campo 'isBilled' debe ser un valor booleano.");
        }
      },
    },
  },
  profileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProfileModel,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: "El campo 'profileId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TableModel,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: "El campo 'tableId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default BillOrderModel;
