import { AdminCategory, Role } from "@/lib/type";
const API_BASE_URL = "http://localhost:8088/api/v1";
export async function getAllRoles(token: string): Promise<Role[]> {
    const res = await fetch(`${API_BASE_URL}/users/role`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update role");
  }

  const data: Role[] = await res.json();
  return data;
}