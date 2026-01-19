import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../lib/api";

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["trending-movies"],
    queryFn: async () => {
      const data = await getTrendingMovies(1);

      return data.results.slice(0, 10).map((m: any, i: number) => ({
        ...m,
        index: i + 1,
        displayTitle: m.title,
      }));
    },
  });
};
