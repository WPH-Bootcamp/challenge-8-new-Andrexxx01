import { useNavigate } from "react-router-dom";
import HeroActions from "../hero/heroActions";
import { useFavorite } from "../../providers/favoriteProvider.tsx";
import { useSearch } from "../../providers/searchProvider";

interface SearchItemCardProps {
  id: number;
  title: string;
  poster: string;
  rating: number;
  overview: string;
}

export default function SearchItemCard({
  id,
  title,
  poster,
  rating,
  overview,
}: SearchItemCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorite();
  const { setQuery } = useSearch();
  const active = isFavorite(id);

  const goDetail = () => {
    setQuery("");
    navigate(`/${title}/detail`, { state: { id } });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 xl:gap-6 items-start">
        <img
          src={poster}
          alt={title}
          className="w-26 h-39 xl:w-45.5 xl:h-67.5 rounded-md xl:rounded-xl cursor-pointer"
          onClick={goDetail}
        />
        <div className="flex-1 flex flex-col gap-2 xl:gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-md xl:text-display-xs font-bold line-clamp-1">
              {title}
            </h3>
            <button
              onClick={() =>
                toggleFavorite({ id, title, poster, rating, overview })
              }
              className="hidden xl:flex size-14 rounded-full border border-neutral-900 bg-neutral-950/60 items-center justify-center shrink-0"
            >
              <img
                src={active ? "/Heart-fullfill.svg" : "/Heart.svg"}
                className="size-6"
              />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium xl:text-lg xl:-mt-6">
            <img src="/Star.svg" className="size-4.5 xl:size-6" />
            {rating}/10
          </div>

          <p className="text-sm xl:text-md text-neutral-400 line-clamp-2">
            {overview}
          </p>
          <div className="hidden xl:flex mt-2">
            <HeroActions movieId={id} className="xl:w-50" />
          </div>
        </div>
      </div>

      {/* Mobile actions (under poster) */}
      <div className="flex items-center gap-3 xl:hidden">
        <HeroActions movieId={id} className="min-w-75" />
        <button
          onClick={() =>
            toggleFavorite({ id, title, poster, rating, overview })
          }
          className="size-11 rounded-full border border-neutral-900 bg-neutral-950/60 flex items-center justify-center shrink-0"
        >
          <img
            src={active ? "/Heart-fullfill.svg" : "/Heart.svg"}
            className="size-5"
          />
        </button>
      </div>
    </div>
  );
}
