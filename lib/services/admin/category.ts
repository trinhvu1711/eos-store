import { AdminCategory } from "@/lib/type";
const API_BASE_URL = "http://localhost:8088/api/v1/categories";
export async function getAllCategories(token: string): Promise<AdminCategory[]> {
    const res = await fetch(`${API_BASE_URL}/get-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update user details");
  }

  const data: AdminCategory[] = await res.json();
  return data;
}