export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  productCategoryId: number;
  createdAt: string;
  updatedAt: string;
}
export interface Profile {
  id: number;
  name: string;
  role: 'EMPLOYEE' | 'ADMIN' | 'CHEF';
  barId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQuantity {
  [key: string]: number;
}

export interface OrderDetail {
  id: number;
  quantity: number;
  billOrderId: number;
  productId: number;
  product: Product;
  updatedAt: string;
  createdAt: string;
}
export interface Category {
  id: number;
  name: string;
  description: string;
  barId: number;
  updatedAt: string;
  createdAt: string;
  products: Product[];
}
export interface BillOrder {
  id: number;
  total: number;
  isBilled: boolean;
  profileId: number;
  tableId: number;
  billOrderNumber: string;
  orderDetails: OrderDetail[];
  updatedAt: string;
  createdAt: string;
}
