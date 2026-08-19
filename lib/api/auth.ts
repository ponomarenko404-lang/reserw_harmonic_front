import type {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse,
} from "@/types/auth";

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  const response = await fetch("/api/auth/login", {
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
  const response = await fetch("/api/auth/register", {
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
  const response = await fetch("/api/auth/logout", {
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
