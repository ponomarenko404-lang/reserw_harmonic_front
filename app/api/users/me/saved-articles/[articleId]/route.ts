import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type RouteContext = {
  params: Promise<{ articleId: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { articleId } = await params;
    const cookie = request.headers.get("cookie");

    const backendResponse = await fetch(
      `${API_URL}/users/me/saved-articles/${articleId}`,
      {
        method: "POST",
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
          error instanceof Error ? error.message : "Failed to save article",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { articleId } = await params;
    const cookie = request.headers.get("cookie");

    const backendResponse = await fetch(
      `${API_URL}/users/me/saved-articles/${articleId}`,
      {
        method: "DELETE",
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
          error instanceof Error ? error.message : "Failed to remove article",
      },
      { status: 500 },
    );
  }
}
