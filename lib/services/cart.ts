"use server";

import { cookies } from "next/headers";
import { CartItem, ListCart } from "../type";
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

export async function removeItem(prevState: any, itemId: number) {
  if (itemId === null) {
    return "Invalid item ID";
  }

  try {
    const response = await fetch(
      `http://localhost:8088/api/v1/carts/${itemId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
    revalidatePath("/", "layout");
    return "Item removed from cart successfully!";
  } catch (error: any) {
    return "Failed to remove item from cart: " + error.message;
  }
}

export async function updateItemQuantity(prevState: any, payload: any) {
  if (payload.id === null) {
    return "Invalid item ID";
  }

  if (payload.quantity === null || payload.quantity < 0) {
    return "Invalid quantity";
  }
  console.log("🚀 ~ updateItemQuantity ~ payload:", payload);
  try {
    const response = await fetch(
      `http://localhost:8088/api/v1/carts/update_quantity/${payload.id}?quantity=${payload.quantity}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    revalidatePath("/", "layout");
    return "Item quantity updated successfully!";
  } catch (error: any) {
    return "Failed to update item quantity: " + error.message;
  }
}
