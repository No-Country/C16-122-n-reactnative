import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { TableAttributes } from '../../interfaces';
import BarModel from './bar.models';

const TableModel = db.define<TableAttributes>('tables', {
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'tableNumber' es obligatorio y debe ser proporcionado.",
      },
      isNumeric: {
        msg: "El campo 'tableNumber' tiene que ser numerico.",
      },
    },
  },
  ability: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'ability' es obligatorio y debe ser proporcionado.",
      },
      isNumeric: {
        msg: "El campo 'ability' tiene que ser numerico.",
      },
    },
  },
  isOccupied: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isBoolean(value: unknown) {
        if (typeof value !== 'boolean') {
          throw new Error("El campo 'isOccupied' debe ser un valor booleano.");
        }
      },
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'location' es obligatorio y debe ser proporcionado.",
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
});

export default TableModel;
