import { AdminCategory, AdminOption, Role } from "@/lib/type";
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
export async function getConfigutations(token: string): Promise<AdminOption[]> {
    const res = await fetch(`${API_BASE_URL}/options/get-configutation`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get getConfigutations");
  }

  const data: AdminOption[] = await res.json();
  return data;
}

export async function getColors(token: string): Promise<AdminOption[]> {
    const res = await fetch(`${API_BASE_URL}/options/get-color`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get getConfigutations");
  }

  const data: AdminOption[] = await res.json();
  return data;
}