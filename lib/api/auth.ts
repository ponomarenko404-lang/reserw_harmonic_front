import type {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse,
} from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Login failed");
  }

  return data as AuthUser;
}

export async function registerUser(
  credentials: RegisterCredentials,
): Promise<RegisterResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error(data?.message ?? "This email is already registered");
    }

    throw new Error(data?.message ?? "Registration failed");
  }

  return data as RegisterResponse;
}

export async function logoutUser(): Promise<void> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Logout failed" }));

    throw new Error(error.message ?? "Logout failed");
  }
}
