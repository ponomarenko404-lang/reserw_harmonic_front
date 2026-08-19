import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get("cookie");
    const url = new URL(request.url);

    const backendResponse = await fetch(
      `${API_URL}/users/me/saved-articles${url.search}`,
      {
        method: "GET",
        headers: cookie ? { cookie } : undefined,
      },
    );

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to load saved articles",
      },
      { status: 500 },
    );
  }
}
