import { useEffect, useRef, useState } from "react";
import TrendingCard from "./trendingCard";
import { useTrendingMovies } from "../../hooks/useTrendingMovies";
import { useSearch } from "../../providers/searchProvider";

export default function TrendingCarousel() {
  const { data, isLoading } = useTrendingMovies();
  const { registerMovies } = useSearch();
  const ref = useRef<HTMLDivElement>(null);
  const hasRegistered = useRef(false); // <-- guard
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    if (!data || hasRegistered.current) return;

    registerMovies(
      data.map((m: any) => ({
        id: m.id,
        title: m.displayTitle ?? m.title,
        poster:
          m.customPoster ||
          `https://image.tmdb.org/t/p/w500${m.poster_path || m.backdrop_path}`,
        rating: Number(m.vote_average.toFixed(1)),
        overview: m.overview ?? "",
      })),
    );

    hasRegistered.current = true; // tandai sudah pernah
  }, [data, registerMovies]);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <div className="h-65 animate-pulse bg-neutral-900/40 rounded-xl" />;
  }

  if (!data) return null;

  return (
    <div className="relative">
      {canLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 top-32 z-10 cursor-pointer -translate-y-1/2 size-11 rounded-full bg-neutral-950/60 backdrop-blur flex items-center justify-center xl:size-14 xl:top-40 xl:-left-20"
        >
          <img src="/Arrow.png" className="rotate-180 size-5.5 xl:size-7" />
        </button>
      )}

      {canRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 top-32 z-10 cursor-pointer -translate-y-1/2 size-11 rounded-full bg-neutral-950/60 backdrop-blur flex items-center justify-center xl:size-14 xl:top-40 xl:-right-20"
        >
          <img src="/Arrow.png" className="size-5.5 xl:size-7" />
        </button>
      )}

      <div
        ref={ref}
        onScroll={update}
        className="flex gap-s-xl overflow-x-auto no-scrollbar scroll-smooth pr-24 xl:gap-s-2xl"
      >
        {data.map((m: any) => (
          <TrendingCard
            key={m.id}
            id={m.id}
            index={m.index}
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

      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-linear-to-l from-black to-transparent" />
    </div>
  );
}
