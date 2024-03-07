import { BillOrderProps, OrderDetailProps } from '../interfaces';
import { BillOrderService } from '../services';
import { catchAsync } from '../utils';
import { joinDuplicateOrder } from '../utils/tools';

const billOrderService = new BillOrderService();

const getBillOrdersForBar = catchAsync(async (_req, res) => {
  const { profileSession } = res.locals;
  const billOrders = await billOrderService.findBillOrdersForBar(
    profileSession.barId
  );
  res.status(200).json({ status: true, billOrders });
});
const getBillOrderForBar = catchAsync(async (req, res) => {
  const { billOrderId } = req.params;
  const { profileSession } = res.locals;
  const billOrder = await billOrderService.findBillOrderForBar(
    +billOrderId,
    profileSession.barId
  );
  res.status(200).json({ status: true, billOrder });
});
const getBillOrderByTableForBar = catchAsync(async (req, res) => {
  const { tableId } = req.params;
  const { profileSession } = res.locals;
  const billOrder = await billOrderService.findBillOrderByTableForBar(
    +tableId,
    profileSession.barId
  );
  res.status(200).json({ status: true, billOrder });
});

const createBillOrderForBar = catchAsync(async (req, res) => {
  const orders: OrderDetailProps[] = req.body;
  const tableId = +req.params.tableId;
  const { profileSession } = res.locals;
  const billOrderBody: BillOrderProps = {
    tableId,
    profileId: profileSession.id,
  };
  const ordersFilterQuantity = orders.filter(order => order.quantity > 0);
  const billOrder = await billOrderService.createBillOrderForBar(
    profileSession.barId,
    billOrderBody,
    ordersFilterQuantity
  );
  res.status(200).json({ status: true, billOrder });
});

const addOrderInBillOrderForBar = catchAsync(async (req, res) => {
  const orders: OrderDetailProps[] = req.body;
  const { profileSession } = res.locals;
  const { billOrderId } = req.params;
  const ordersFilterQuantity = orders.filter(order => order.quantity > 0);
  const billOrder = await billOrderService.addOrderInBillOrderForBar(
    +billOrderId,
    profileSession.barId,
    ordersFilterQuantity
  );
  res.status(200).json({ status: true, billOrder });
});
const addOrCreateOrderInBillOrderForBar = catchAsync(async (req, res) => {
  const orders: OrderDetailProps[] = req.body;
  const { profileSession } = res.locals;
  const { tableId } = req.params;
  const ordersFilterQuantity = orders.filter(order => order.quantity > 0);
  const billOrder = await billOrderService.addOrCreateOrderInBillOrderForBar(
    +tableId,
    profileSession.barId,
    profileSession.id,
    ordersFilterQuantity
  );
  res.status(200).json({ status: true, billOrder });
});

const payBillOrder = catchAsync(async (req, res) => {
  const { billOrderId } = req.params;
  const { profileSession } = res.locals;
  const billOrder = await billOrderService.payBillOrder(
    +billOrderId,
    profileSession.barId
  );
  const billOrderTransform = {
    ...billOrder,
    orderDetails: joinDuplicateOrder(billOrder.orderDetails ?? []),
  };
  res.status(200).json({ status: true, billOrder: billOrderTransform });
});

export {
  getBillOrdersForBar,
  createBillOrderForBar,
  addOrderInBillOrderForBar,
  payBillOrder,
  getBillOrderForBar,
  getBillOrderByTableForBar,
  addOrCreateOrderInBillOrderForBar,
};
