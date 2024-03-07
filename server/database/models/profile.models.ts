import { DataTypes } from 'sequelize';
import { ProfileAttributes } from '../../interfaces/';
import db from '../db';
import BarModel from './bar.models';

const ProfileModel = db.define<ProfileAttributes>('profiles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'name' es obligatorio y debe ser proporcionado.",
      },
      notEmpty: {
        msg: "El campo 'name' no puede ir vacio.",
      },
    },
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'EMPLOYEE', 'CHEF'),
    defaultValue: 'EMPLOYEE',
    allowNull: false,
    validate: {
      isIn: {
        args: [['ADMIN', 'EMPLOYEE', 'CHEF']],
        msg: "Tipo de role inválido. Por favor, seleccione entre 'ADMIN', 'EMPLOYEE' o 'CHEF'.",
      },
      notNull: {
        msg: "El campo 'role' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'pinCode' es obligatorio y debe ser proporcionado.",
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

export default ProfileModel;
