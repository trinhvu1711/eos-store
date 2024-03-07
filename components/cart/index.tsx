import CartModal from "./modal";
import { cart } from "@/lib/type";

export default function Cart() {
  return <CartModal cart={cart} />;
}
