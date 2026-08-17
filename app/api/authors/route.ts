import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const mockDatabase = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Harmoniq Creator ${i + 1}`,
    avatarUrl: "",
  }));

  try {
    const totalItems = mockDatabase.length;
    const totalPages = Math.ceil(totalItems / limit);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageData = mockDatabase.slice(startIndex, endIndex);

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    return NextResponse.json({
      page,
      perPage: limit,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
      authors: pageData,
    });
  } catch {
    return NextResponse.json(
      { status: 500, message: "Simulation error while fetching authors" }, 
      { status: 500 }
    );
  }
}