import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type RouteContext = {
  params: Promise<{ userId: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";
    const perPage = searchParams.get("perPage") ?? "12";
    const cookie = request.headers.get("cookie");

    const response = await fetch(
      `${API_URL}/users/${encodeURIComponent(userId)}/articles?page=${page}&perPage=${perPage}`,
      {
        headers: cookie ? { Cookie: cookie } : {},
        cache: "no-store",
      },
    );

    const data = await response.json().catch(() => null);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Failed to fetch user articles:", error);

    return NextResponse.json(
      { message: "Failed to fetch user articles from backend" },
      { status: 500 },
    );
  }
}
