import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "20";

    const cookie = request.headers.get("cookie");

    const response = await fetch(
      `${API_URL}/users?page=${page}&limit=${limit}`,
      {
        headers: cookie ? { Cookie: cookie } : {},
        cache: "no-store",
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          status: response.status,
          message: data?.message ?? "Failed to fetch authors from backend",
        },
        { status: response.status },
      );
    }

    const authors = data.authors.map(
      (author: { _id: string; name: string; avatarUrl?: string }) => ({
        id: author._id,
        name: author.name,
        avatarUrl: author.avatarUrl ?? "",
      }),
    );

    return NextResponse.json({
      ...data,
      authors,
    });
  } catch (error) {
    console.error("Failed to fetch authors:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to fetch authors from backend",
      },
      { status: 500 },
    );
  }
}
