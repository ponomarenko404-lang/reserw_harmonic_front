import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "@/lib/api/articles";
import type {
  ArticlesResponse,
  GetArticlesParams,
} from "@/types/article";

export function useInfiniteArticles(
  params: Omit<GetArticlesParams, "page"> = {},
) {
  return useInfiniteQuery({
    queryKey: ["articles-infinite", params],

    queryFn: ({ pageParam }) => {
      return getArticles({
        ...params,
        page: pageParam,
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage: ArticlesResponse) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });
}