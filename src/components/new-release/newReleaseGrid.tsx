import { useEffect, useState, useMemo } from "react";
import NewReleaseCard from "./newReleaseCard";
import { useNewReleases } from "../../hooks/useNewRelease";
import { useSearch } from "../../providers/searchProvider";
import LoadMoreButton from "../ui/button";

export default function NewReleaseGrid() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useNewReleases();
  const { registerMovies } = useSearch();

  const isDesktop = useMemo(
    () => window.matchMedia("(min-width: 1280px)").matches,
    [],
  );
  const cols = isDesktop ? 5 : 2;
  const [rows, setRows] = useState(() => (isDesktop ? 3 : 4));

  const rawMovies = data?.pages.flatMap((p: any) => p.results) ?? [];
  const movies = useMemo(() => {
    const map = new Map<number, any>();
    rawMovies.forEach((m) => map.set(m.id, m));
    return Array.from(map.values());
  }, [rawMovies]);

  const visibleCount = rows * cols;
  const visibleMovies = movies.slice(0, visibleCount);

  useEffect(() => {
    if (!movies.length) return;

    registerMovies(
      movies.map((m: any) => ({
        id: m.id,
        title: m.displayTitle ?? m.title,
        poster:
          m.customPoster ||
          `https://image.tmdb.org/t/p/w500${m.poster_path || m.backdrop_path}`,
        rating: Number(m.vote_average.toFixed(1)),
        overview: m.overview ?? "",
      })),
    );
  }, [movies.length]);

  if (isLoading) {
    return <div className="h-130 animate-pulse bg-neutral-900/40 rounded-xl" />;
  }

  const canLoadMore = hasNextPage || visibleCount < movies.length;

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-s-xl gap-y-s-4xl xl:gap-x-s-2xl xl:gap-y-s-5xl">
          {visibleMovies.map((m: any) => (
            <NewReleaseCard
              key={m.id}
              id={m.id}
              title={m.displayTitle}
              rating={Number(m.vote_average.toFixed(1))}
              image={
                m.customPoster ||
                `https://image.tmdb.org/t/p/w500${
                  m.poster_path || m.backdrop_path
                }`
              }
            />
          ))}
        </div>
        <div className="pointer-events-none absolute w-screen inset-x-0 bottom-0 h-200 bg-linear-to-t from-black to-transparent" />
      </div>
      {canLoadMore && (
        <div className="flex justify-center -mt-36 xl:-mt-40">
          <LoadMoreButton
            onClick={() => {
              setRows((r) => r + 1);
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        </div>
      )}
    </>
  );
}
