import CartModal from "./modal";
import { cookies } from "next/headers";
import { getCart } from "@/lib/services/cart";
export default async function Cart() {
  const cartId = cookies().get("listCartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal listCart={cart} />;
}
