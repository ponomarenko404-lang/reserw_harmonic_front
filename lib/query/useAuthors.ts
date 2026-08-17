import { useInfiniteQuery } from "@tanstack/react-query";
import type { IAuthor } from "@/types/author";

interface FetchAuthorsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  authors: IAuthor[];
}

interface InfiniteAuthorsResult {
  data: IAuthor[];
  nextPage: number | null;
}

const LIMIT = 20;

const fetchAuthorsRequest = async ({
  pageParam = 1,
}): Promise<InfiniteAuthorsResult> => {
  const res = await fetch(`/api/authors?page=${pageParam}&limit=${LIMIT}`);

  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }

  const responseData: FetchAuthorsResponse = await res.json();

  return {
    data: responseData.authors || [],
    nextPage: responseData.hasNextPage ? responseData.page + 1 : null,
  };
};

export function useInfiniteAuthors() {
  return useInfiniteQuery({
    queryKey: ["authors", "list", LIMIT],
    queryFn: fetchAuthorsRequest,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
