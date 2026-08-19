import type { UserArticlesResponse } from "@/types/article";
import { apiFetch } from "./apiFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function getUserById(userId: string) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load author");
  }

  return data;
}

export async function getUserArticles(
  userId: string,
  page = 1,
  perPage = 12,
): Promise<UserArticlesResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  const response = await fetch(
    `${API_URL}/users/${userId}/articles?${searchParams.toString()}`,
    {
      credentials: "include",
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load author articles");
  }

  return data as UserArticlesResponse;
}

export async function getCurrentUser() {
  const response = await apiFetch("/api/users/me");

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load current user");
  }

  return data;
}

export async function getSavedArticles(page = 1, perPage = 12) {
  const searchParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  const response = await apiFetch(
    `/api/users/me/saved-articles?${searchParams.toString()}`,
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load saved articles");
  }

  return data;
}

export async function updateCurrentUser(data: {
  name?: string;
  contactInfo?: string;
}) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Failed to update profile");
  }

  return result.user;
}

export async function updateAvatar(file: File) {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await fetch("/api/users/me/avatar", {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to update avatar");
  }

  return data.user;
}
