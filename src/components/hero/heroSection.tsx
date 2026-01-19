import { useEffect } from "react";
import { useTrendingMovies } from "../../hooks/useTrendingMovies";
import HeroActions from "./heroActions";
import { useNavigate } from "react-router-dom";
import { useHero } from "../../providers/heroProvider";
import { useMovieById } from "../../hooks/useMovieById";

export default function HeroSection() {
  const { activeMovieId, setActiveMovieId } = useHero();
  const navigate = useNavigate();
  const { data: trending, isLoading: loadingTrending } = useTrendingMovies();

  useEffect(() => {
    if (!activeMovieId && trending && trending.length > 0) {
      setActiveMovieId(trending[0].id);
    }
  }, [activeMovieId, trending, setActiveMovieId]);

  const { data, isLoading } = useMovieById(activeMovieId ?? 0);

  if (isLoading || loadingTrending || !data) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="relative min-h-98 xl:min-h-202.5">
      <img
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title}
        className="absolute top-16 w-full scale-160 object-cover object-center md:scale-125 md:top-13 xl:scale-100 xl:top-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black h-250" />

      <div className="relative z-10 flex flex-col w-full pt-58 items-start gap-s-3xl justify-between ml-4 xl:ml-s-11xl xl:gap-s-6xl">
        <div className="w-full flex flex-col gap-s-sm xl:gap-s-xl">
          <h1 className="text-display-sm xl:text-display-2xl font-bold">
            {data.title}
          </h1>
          <p className="text-neutral-400 text-md mr-5 max-w-158.75">
            {data.overview}
          </p>
        </div>
        <HeroActions
          className="xl:max-w-119"
          movieId={data.id}
          onSeeDetail={() =>
            navigate(
              `/${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/detail`,
              { state: { id: data.id } },
            )
          }
        />
      </div>
    </section>
  );
}
