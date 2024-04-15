import { Product, Variant } from "./product";
import { User } from "./user";

export type Cart = {
  id: number;
  user: User;
  price: number;
  color: string;
  product: Product;
  variant: Variant
  numberOfProducts: number;
  totalMoney: number;
};