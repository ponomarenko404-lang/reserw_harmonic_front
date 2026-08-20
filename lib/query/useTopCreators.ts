import { useQuery } from "@tanstack/react-query";
// Імпортуємо офіційний тип автора з проєкту
import type { IAuthor } from "@/types/author"; 

// Додаємо інтерфейс відповіді, щоб типізувати responseData
interface FetchTopCreatorsResponse {
  success: boolean;
  data: IAuthor[];
  authors: IAuthor[];
}

// Вказуємо, що функція залізобетонно повертає проміс із масивом авторів
const fetchTopCreatorsRequest = async (): Promise<IAuthor[]> => {
  const res = await fetch(`/api/top-creators?_t=${Date.now()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch top creators");
  }

  const responseData: FetchTopCreatorsResponse = await res.json();
  
  return responseData.data || [];
};

export function useTopCreators() {
  return useQuery({
    queryKey: ["finalCleanIsolatedTopCreatorsList"], 
    queryFn: fetchTopCreatorsRequest,
    staleTime: 5 * 60 * 1000, 
  });
}