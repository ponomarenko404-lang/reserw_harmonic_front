import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserArticles } from "@/lib/api/users";
import type { UserArticlesResponse } from "@/types/article";

export function useUserArticles(userId: string, perPage = 12) {
  return useInfiniteQuery({
    queryKey: ["userArticles", userId, perPage],

    queryFn: ({ pageParam }) => getUserArticles(userId, pageParam, perPage),

    initialPageParam: 1,

    getNextPageParam: (lastPage: UserArticlesResponse) => {
      const { page, totalPages } = lastPage.pagination;

      return page < totalPages ? page + 1 : undefined;
    },

    enabled: Boolean(userId),
  });
}
