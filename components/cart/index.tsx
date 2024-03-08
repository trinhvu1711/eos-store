
import { cart } from "@/lib/type";
import CartModal from "./modal";


export default function Cart() {
  return <CartModal cart={cart} />;
}
