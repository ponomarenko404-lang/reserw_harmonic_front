import { useQuery } from "@tanstack/react-query";
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

async function fetchAuthors(page: number): Promise<FetchAuthorsResponse> {
  const response = await fetch(
  `https://reserw-harmonic-back.onrender.com/api/users?page=${page}&limit=${AUTHORS_PER_PAGE}`,
);

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