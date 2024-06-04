import { cookies } from "next/headers";
import Cart from "./Cart";
import { getCart } from "@/lib/services/cart";
import { getCoupons } from "@/lib/data";

export default async function page() {
  const cartId = cookies().get("listCartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  let coupons = [];
  coupons = await getCoupons();
  return (
    <>
      <Cart listCart={cart} coupons={coupons} />
    </>
  );
}
