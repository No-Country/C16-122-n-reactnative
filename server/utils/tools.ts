import { OrderDetailAttributes } from '../interfaces';

export const joinDuplicateOrder = (order: OrderDetailAttributes[]) => {
  const uniqueProducts: { [key: number]: OrderDetailAttributes } = {};
  order.forEach(item => {
    if (!uniqueProducts.hasOwnProperty(item.productId)) {
      uniqueProducts[item.productId] = item;
    } else {
      uniqueProducts[item.productId].quantity += item.quantity;
    }
  });
  const uniqueArray = Object.values(uniqueProducts);
  return uniqueArray;
};
