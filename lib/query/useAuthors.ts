import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { IAuthor } from "@/types/author";

interface FetchAuthorsResponse {
  success: boolean;
  authors: IAuthor[];
  pagination: {
    totalAuthors: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
  };
}

const AUTHORS_PER_PAGE = 20;

async function fetchAuthors(
  page: number,
  limit = AUTHORS_PER_PAGE,
): Promise<FetchAuthorsResponse> {
  const response = await fetch(`/api/authors?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch authors");
  }

  return response.json();
}

export function useAuthors(page: number) {
  return useQuery({
    queryKey: ["authors", page],
    queryFn: () => fetchAuthors(page),
    placeholderData: (previousData) => previousData,
  });
}

export function useTopAuthors() {
  return useQuery({
    queryKey: ["top-authors"],
    queryFn: async () => {
      const firstPage = await fetchAuthors(1);
      const remainingPages = await Promise.all(
        Array.from(
          { length: firstPage.pagination.totalPages - 1 },
          (_, index) => fetchAuthors(index + 2),
        ),
      );
      const authors = [firstPage, ...remainingPages]
        .flatMap((page) => page.authors)
        .sort(
          (firstAuthor, secondAuthor) =>
            secondAuthor.articlesAmount - firstAuthor.articlesAmount,
        );

      return authors.slice(0, 6);
    },
  });
}

export function useInfiniteAuthors() {
  return useInfiniteQuery({
    queryKey: ["authors-infinite"],
    queryFn: ({ pageParam }) => fetchAuthors(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}
