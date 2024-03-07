import { Transaction } from 'sequelize';
import { OrderDetailModel } from '../database/models';
import { OrderDetailProps } from '../interfaces';
import ProductService from './product.services';
const productService = new ProductService();

class OrderDetailService {
  async createManyOrders(
    billOrderId: number,
    barId: number,
    orderDetails: OrderDetailProps[],
    t: Transaction
  ) {
    let price = 0;
    const creatOrderDetailsPromises = orderDetails.map(
      async ({ quantity, productId }) => {
        const product = await productService.findProductForBarOr404(
          productId,
          barId
        );
        price += product.price * quantity;
        const orderDetail = await OrderDetailModel.create(
          {
            productId,
            quantity,
            billOrderId,
          },
          { transaction: t }
        );
        return orderDetail;
      }
    );
    const OrderDetails = await Promise.all(creatOrderDetailsPromises);
    return { totalPrice: price, OrderDetails };
  }
}
export default OrderDetailService;
