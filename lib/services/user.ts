import { User } from "../type";

const API_BASE_URL = "http://localhost:8088/api/v1/users";

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.text();
  return data;
}

export async function register(user: User): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  const data = await res.json();
  return data;
}

export async function getUserDetails(token: string): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/details`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }

  const data: User = await res.json();
  return data;
}
