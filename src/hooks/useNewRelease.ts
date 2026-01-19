import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewReleases } from "../lib/api";

export const useNewReleases = () => {
  return useInfiniteQuery({
    queryKey: ["new-releases"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getNewReleases(pageParam);

      return {
        page: pageParam,
        results: data.results.map((m: any) => ({
          ...m,
          displayTitle: m.title,
        })),
        totalPages: data.total_pages,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
