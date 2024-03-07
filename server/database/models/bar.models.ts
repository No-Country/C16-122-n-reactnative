import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { BarAttributes } from '../../interfaces';

const BarModel = db.define<BarAttributes>('bars', {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'password' es obligatorio y debe ser proporcionado.",
      },
    },
  },
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
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'userName' es obligatorio y debe ser proporcionado.",
      },
      notEmpty: {
        msg: "El campo 'userName' no puede ir vacio.",
      },
    },
    unique: {
      name: 'userName',
      msg: "Este 'userName' ya esta registrado.",
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Asegurese de escribir un correo electronico valido.',
      },
      notNull: {
        msg: "El campo 'email' es obligatorio y debe ser proporcionado.",
      },
      notEmpty: {
        msg: "El campo 'email' no puede ir vacio.",
      },
    },
    unique: {
      msg: "Este 'email' ya esta registrado.",
      name: 'email',
    },
  },
});

export default BarModel;
