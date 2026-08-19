import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const backendResponse = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await backendResponse.json().catch(() => null);

    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    const setCookies = backendResponse.headers.getSetCookie();

    for (const cookie of setCookies) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 500,
        message: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 500 },
    );
  }
}
