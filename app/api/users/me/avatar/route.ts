import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData();
    const cookie = request.headers.get("cookie");

    console.log("COOKIE FROM BROWSER:", cookie);

    const backendResponse = await fetch(`${API_URL}/users/me/avatar`, {
      method: "PATCH",
      body: formData,
      headers: cookie ? { cookie } : undefined,
    });

    console.log("BACKEND STATUS:", backendResponse.status);

    const data = await backendResponse.json().catch(() => null);

    console.log("BACKEND RESPONSE:", data);

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      {
        status: 500,
        message:
          error instanceof Error ? error.message : "Failed to update avatar",
      },
      { status: 500 },
    );
  }
}
