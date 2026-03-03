import { useHero } from "../../providers/heroProvider";

interface TrendingCardProps {
  id: number;
  index: number;
  title: string;
  image: string;
  rating: number;
}

export default function TrendingCard({
  id,
  index,
  title,
  image,
  rating,
}: TrendingCardProps) {
  const { setActiveMovieId } = useHero();

  return (
    <div
      onClick={() => setActiveMovieId(id)}
      className="relative flex flex-col items-start justify-between gap-s-md w-43.25 xl:w-54 shrink-0 xl:gap-s-lg"
    >
      <div className="absolute top-2 left-2 z-10 size-8 rounded-full bg-neutral-950/60 text-sm font-semibold flex items-center justify-center backdrop-blur-xs xl:top-3 xl:left-3 xl:size-12 xl:text-lg">
        {index}
      </div>
      <div className="w-full rounded-xl overflow-hidden bg-neutral-900">
        <img
          src={image}
          alt={title}
          className="h-66.5 xl:h-80.25 w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-between gap-s-xxs">
        <p className="text-md font-semibold line-clamp-1 xl:text-lg">{title}</p>
        <div className="flex items-center gap-s-xs text-sm text-neutral-400 justify-start xl:text-md">
          <img src="/Star.svg" className="size-4.5 xl:size-5" />
          {rating}/10
        </div>
      </div>
    </div>
  );
}
