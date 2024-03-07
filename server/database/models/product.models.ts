import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { ProductAttributes } from '../../interfaces';
import ProductCategoryModel from './productCategory.models';

const ProductModel = db.define<ProductAttributes>('product', {
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
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'price' es obligatorio y debe ser proporcionado.",
      },
      isNumeric: {
        msg: "El campo 'quantity' tiene que ser numerico.",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductCategoryModel,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: "El campo 'productCategoryId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default ProductModel;
