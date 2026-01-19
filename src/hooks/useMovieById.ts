import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../lib/api";

export const useMovieById = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });
};
