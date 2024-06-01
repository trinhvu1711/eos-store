import { cookies } from "next/headers";
import Cart from "./Cart";
import { getCart } from "@/lib/services/cart";

export default async function page() {
  const cartId = cookies().get("listCartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return (
    <>
      <Cart listCart={cart} />
    </>
  );
}
