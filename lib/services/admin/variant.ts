import { AdminVariant } from "@/lib/type";
const API_BASE_URL = "http://localhost:8088/api/v1/variants";
export async function getAllVariants(token: string): Promise<AdminVariant[]> {
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

  const data: AdminVariant[] = await res.json();
  return data;
}