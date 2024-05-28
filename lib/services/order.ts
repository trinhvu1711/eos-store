const API_BASE_URL = "http://localhost:8088/api/v1/orders";

import { Order, OrderDetail } from "./../type";
import { revalidatePath } from "next/cache";
export interface NewOrder {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  note: string;
  total_money: number;
  shipping_method: string;
  payment_method: string;
  tracking_number: string;
  shipping_address: string;
}

export interface NewOrderDetail {
  order_id: number;
  product_id: number;
  price: number;
  number_of_products: number;
  total_money: number;
  id_product_variant: number;
  user_id?: number;
}

export async function getOrder(orderId: string): Promise<Order> {
  const res = await fetch(`http://localhost:8088/api/v1/orders/${orderId}`);
  if (!res.ok) {
    throw new Error("Cart not found");
  }
  const order: Order = await res.json();
  // console.log("🚀 ~ getorder ~ cart:", cart);
  return order;
}

export async function getOrderByTrackingNumber(
  trackingNumber: string,
): Promise<Order> {
  const res = await fetch(
    `http://localhost:8088/api/v1/orders/tracking/${trackingNumber}`,
  );
  if (!res.ok) {
    throw new Error("Order not found");
  }
  const order: Order = await res.json();
  // console.log("🚀 ~ getorder ~ cart:", cart);
  return order;
}

export async function createOrder(item: NewOrder): Promise<number> {
  // console.log("🚀 ~ createOrder ~ item:", item);
  const res = await fetch(`http://localhost:8088/api/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    throw new Error("Can't create order");
  }

  const order = await res.json();
  return order.id;
}

export async function addToOrderDetails({
  order_id,
  product_id,
  price,
  number_of_products,
  total_money,
  id_product_variant,
}: {
  order_id: number;
  product_id: number;
  price: number;
  number_of_products: number;
  total_money: number;
  id_product_variant: number;
}): Promise<string> {
  try {
    const response = await fetch(`http://localhost:8088/api/v1/order_details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id,
        product_id,
        price,
        number_of_products,
        total_money,
        id_product_variant,
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

export async function addItemOrder(
  order: NewOrder,
  orderDetail: NewOrderDetail,
): Promise<string> {
  // console.log("🚀 ~ listCartId:", listCartId);
  // console.log("🚀 ~ item:", item);

  try {
    await addToOrderDetails(orderDetail);
    revalidatePath("/", "layout");
    return "Item added to cart";
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function getOrderDetailsFromToken(
  token: string,
  status: string,
): Promise<Order[]> {
  const url = new URL(`${API_BASE_URL}/details`);
  url.searchParams.append("status", status);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order details");
  }

  const data: Order[] = await res.json();
  console.log("🚀 ~ getUserDetails ~ data:", data);
  // revalidatePath("/", "layout");
  return data;
}
