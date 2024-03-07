import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { OrderDetailAttributes } from '../../interfaces';
import ProductModel from './product.models';
import BillOrderModel from './billOrder.models';

const OrderDetailModel = db.define<OrderDetailAttributes>('orderDetails', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'quantity' es obligatorio y debe ser proporcionado.",
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
  billOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BillOrderModel,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: "El campo 'billOrderId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductModel,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: "El campo 'productId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default OrderDetailModel;
