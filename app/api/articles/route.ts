import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const cookie = request.headers.get("cookie");

    const backendResponse = await fetch(`${API_URL}/articles`, {
      method: "POST",
      body: formData,
      headers: cookie ? { cookie } : undefined,
    });

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      {
        status: 500,
        message:
          error instanceof Error ? error.message : "Failed to create article",
      },
      { status: 500 },
    );
  }
}
