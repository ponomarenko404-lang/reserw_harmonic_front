import { NextResponse } from "next/server";

// Примусово вимикаємо будь-яке статичне кешування цього роуту в Next.js
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Робимо запит до нашого повністю ізольованого бекенд-роуту
    const res = await fetch("http://localhost:5000/api/users/top", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Backend failed" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}