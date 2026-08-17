import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedArticles } from "@/lib/api/users";

export function useSavedArticles(perPage = 12) {
  return useInfiniteQuery({
    queryKey: ["savedArticles", perPage],

    queryFn: ({ pageParam }) => getSavedArticles(pageParam, perPage),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      return page < totalPages ? page + 1 : undefined;
    },
  });
}
