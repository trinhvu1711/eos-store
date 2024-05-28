import { WishList } from "../type";

const API_BASE_URL = "http://localhost:8088/api/v1/wishlist";
interface WishListDTO {
  user_id: number;
  product_id: number;
  id_product_variant: number;
}

export async function addWishList(
  token: string,
  wishListData: WishListDTO,
): Promise<void> {
  const url = new URL(API_BASE_URL);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishListData),
  });

  if (!res.ok) {
    throw new Error("Failed to add wishlist");
  }

  // Optional: Return the response data if needed
  // const data = await res.json();
  // return data;
}

export async function getWishlistDetailsFromToken(
  token: string,
): Promise<WishList[]> {
  const url = new URL(`${API_BASE_URL}/details`);
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

  const data: WishList[] = await res.json();
  console.log("🚀 ~ data:", data);

  return data;
}

export async function removeWishList(wishListId: number): Promise<void> {
  const url = new URL(`${API_BASE_URL}/${wishListId}`);
  const res = await fetch(url.toString(), {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to remove wishlist");
  }
}
