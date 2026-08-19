const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshUserSession(): Promise<void> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message ?? "Session refresh failed");
    }
  })();

  try {
    await refreshPromise;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

export async function apiFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status !== 401) {
    return response;
  }

  await refreshUserSession();

  return fetch(url, {
    ...options,
    credentials: "include",
  });
}
