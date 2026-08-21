import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type ArticleRouteContext = {
  params: Promise<{ articleId: string }>;
};

async function updateArticle(
  request: Request,
  { params }: ArticleRouteContext,
) {
  try {
    const { articleId } = await params;
    const formData = await request.formData();
    const cookie = request.headers.get("cookie");
    const photo = formData.get("photo");

    if (photo instanceof File) {
      formData.delete("photo");
      formData.set("img", photo);
    } else if (typeof photo === "string" && photo) {
      const imageUrl = new URL(photo, request.url);
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw new Error("Failed to load the current article image");
      }

      const imageBlob = await imageResponse.blob();
      const filename = imageUrl.pathname.split("/").pop() || "article-image";

      formData.delete("photo");
      formData.set(
        "img",
        new File([imageBlob], filename, {
          type: imageBlob.type || "application/octet-stream",
        }),
      );
    }

    const backendResponse = await fetch(`${API_URL}/articles/${articleId}`, {
      method: request.method,
      body: formData,
      headers: cookie ? { cookie } : undefined,
    });

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 500,
        message:
          error instanceof Error ? error.message : "Failed to update article",
      },
      { status: 500 },
    );
  }
}

export const PATCH = updateArticle;
export const PUT = updateArticle;
