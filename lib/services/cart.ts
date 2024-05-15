"use server";

import { cookies } from "next/headers";
import { ListCart } from "../type";
import { revalidatePath } from "next/cache";

export async function getCart(cartId: string): Promise<ListCart> {
  const res = await fetch(`http://localhost:8088/api/v1/list_carts/${cartId}`);
  if (!res.ok) {
    throw new Error("Cart not found");
  }
  const cart = await res.json();
  return cart;
}

export async function createCart(): Promise<number> {
  const res = await fetch(`http://localhost:8088/api/v1/list_carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error("Can't create cart");
  }

  const cart = await res.json();
  return cart.id;
}

export async function addToCart(item: {
  productId: number;
  variantId: number;
  quantity: number;
  listCartId: number;
  price: number;
}): Promise<string> {
  try {
    const response = await fetch(`http://localhost:8088/api/v1/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: item.productId,
        list_cart_id: item.listCartId,
        price: item.price,
        number_of_products: item.quantity,
        id_product_variant: item.variantId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    return "Item added to cart successfully!";
  } catch (error: any) {
    return "Failed to add item to cart: " + error.message;
  }
}

export async function addItem(item: {
  productId: number;
  variantId: number;
  quantity: number;
  price: number;
}): Promise<string> {
  let listCartId = cookies().get("listCartId")?.value;
  let newId;
  let cart: ListCart | undefined;
  let currentQuantity = 1;
  if (listCartId) {
    cart = await getCart(listCartId.toString());
  }

  if (!listCartId || !cart) {
    newId = await createCart();
    listCartId = newId.toString();
    cookies().set("listCartId", listCartId);
  }
  // console.log("🚀 ~ listCartId:", listCartId);
  // console.log("🚀 ~ item:", item);

  try {
    await addToCart({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      listCartId: Number(listCartId),
      price: item.price * item.quantity,
    });
    revalidatePath("/", "layout");
    return "Item added to cart";
  } catch (e) {
    return "Error adding item to cart";
  }
}
