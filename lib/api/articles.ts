import { apiFetch } from "./apiFetch";

import type {
  Article,
  ArticleDetails,
  ArticlesResponse,
  GetArticlesParams,
  Category,
} from "@/types/article";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type RawArticle = Partial<Article & ArticleDetails> & {
  photo?: string;
  desc?: string;
  content?: string;
  category?: Category;
};

const mapArticle = (article: RawArticle): Article & ArticleDetails => ({
  ...article,
  _id: article._id ?? "",
  img: article.img ?? article.photo ?? "",
  title: article.title ?? "",
  desc: article.desc ?? "",
  article: article.article ?? article.content ?? "",
  rate: article.rate ?? 0,
  ownerId: article.ownerId ?? article.owner?._id ?? "",
  date: article.date ?? "",
  category: article.category ?? "general",
  createdAt: article.createdAt ?? "",
  updatedAt: article.updatedAt ?? "",
  owner: article.owner ?? null,
});

export async function getArticles(
  params: GetArticlesParams = {},
): Promise<ArticlesResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.perPage !== undefined) {
    searchParams.set("perPage", String(params.perPage));
  }

  if (params.category !== undefined) {
    searchParams.set("category", params.category);
  }

  if (params.sortBy !== undefined) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder !== undefined) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();
  const url = `${API_URL}/articles${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to load articles",
    );
  }

  return {
    ...data,
    data: Array.isArray(data?.data) ? data.data.map(mapArticle) : [],
  } as ArticlesResponse;
}

export async function getPopularArticles(): Promise<Article[]> {
  const response = await getArticles({
    page: 1,
    perPage: 4,
    category: "popular",
  });

  return response.data;
}

export async function createArticle(formData: FormData) {
  const response = await apiFetch("/api/articles", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `Failed to create article: ${response.status}`,
    );
  }

  return response.json();
}

export class ArticlesApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ArticlesApiError";
    this.status = status;
  }
}

export async function getArticleById(
  articleId: string,
): Promise<ArticleDetails> {
  const response = await fetch(`${API_URL}/articles/${articleId}`, {
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to load article",
    );
  }

  return mapArticle(data);
}

export async function addArticleToBookmarks(articleId: string) {
  const response = await apiFetch(`/api/users/me/saved-articles/${articleId}`, {
    method: "POST",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to save article",
    );
  }

  return data;
}

export async function removeArticleFromBookmarks(articleId: string) {
  const response = await apiFetch(`/api/users/me/saved-articles/${articleId}`, {
    method: "DELETE",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ArticlesApiError(
      response.status,
      data?.message ?? "Failed to remove article from saved articles",
    );
  }

  return data;
}
