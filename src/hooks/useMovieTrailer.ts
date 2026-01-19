import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../lib/api";

export const useMovieTrailer = (movieId: number | null) => {
  return useQuery({
    queryKey: ["movie-trailer", movieId],
    enabled: !!movieId,
    queryFn: async () => {
      const data = await getMovieVideos(movieId as number);

      const trailers = data.results.find(
        (v: any) => v.site === "YouTube" && v.type === "Trailer",
      );

      return trailers ?? null;
    },
  });
};
