import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type BackendAuthor = {
  _id?: string;
  id?: string;
  name: string;
  avatarUrl?: string;
  articlesAmount?: number;
  articles?: unknown[];
};

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

    const authors = Array.isArray(data?.authors)
      ? data.authors.map((author: BackendAuthor) => ({
          _id: author._id ?? author.id ?? "",
          name: author.name,
          avatarUrl: author.avatarUrl ?? "",
          articlesAmount: author.articlesAmount ?? author.articles?.length ?? 0,
          articles: author.articles ?? [],
        }))
      : [];

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
