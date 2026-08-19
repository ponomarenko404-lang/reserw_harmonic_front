import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function POST(request: Request) {
  try {
    const cookie = request.headers.get("cookie");

    const backendResponse = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: cookie ? { cookie } : undefined,
    });

    const data = await backendResponse.json().catch(() => null);

    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    const setCookies = backendResponse.headers.getSetCookie();

    for (const newCookie of setCookies) {
      response.headers.append("Set-Cookie", newCookie);
    }

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 500,
        message: error instanceof Error ? error.message : "Logout failed",
      },
      { status: 500 },
    );
  }
}
