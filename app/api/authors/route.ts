import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";

  try {
    
    const backendResponse = await fetch(`${API_URL}/users/authors?page=${page}&limit=${limit}`);
    
    if (!backendResponse.ok) {
      throw new Error(`Failed to fetch data from backend, status: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message || "Error bridge to backend" }, 
      { status: 500 }
    );
  }
}