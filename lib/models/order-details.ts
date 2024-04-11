import { Order, order } from "./order";
import { product, Product } from "./product";

export type OrderDetail = {
  id: number;
  order: Order;
  price: number;
  color: string;
  product: Product;
  numberOfProducts: number;
  totalMoney: number;
};

export const orderDetail: OrderDetail = {
  id: 6,
  order: order, // assuming 'order' is defined elsewhere in your code
  price: 2342.0,
  color: "FF00FF",
  product: product, // assuming 'product' is defined elsewhere in your code
  numberOfProducts: 2,
  totalMoney: 13191,
};
