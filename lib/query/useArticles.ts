"use client";

import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/lib/api/articles";
import type { GetArticlesParams } from "@/types/article";

export function useArticles(params: GetArticlesParams = {}) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => getArticles(params),
    placeholderData: (previousData) => previousData,
  });
}
