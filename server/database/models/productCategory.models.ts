import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { ProductCategoryAttributes } from '../../interfaces';
import BarModel from './bar.models';

const ProductCategoryModel = db.define<ProductCategoryAttributes>(
  'productCategories',
  {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
  }
);

export default ProductCategoryModel;
