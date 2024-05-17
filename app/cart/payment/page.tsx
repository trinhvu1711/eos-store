import { getCart } from "@/lib/services/cart";
import Payment from "./Payment";
import { cookies } from "next/headers";

export default async function Page() {
  const cartId = cookies().get("listCartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return <Payment listCart={cart} />;
}
