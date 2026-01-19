import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../lib/api";

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
};
