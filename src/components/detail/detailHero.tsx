import { useFavorite } from "../../providers/favoriteProvider.tsx";
import HeroActions from "../hero/heroActions";
import { toast } from "sonner";

interface DetailHeroProps {
  id: number;
  backdrop: string;
  poster: string;
  title: string;
  releaseDate: string;
  rating: number;
  genre: string;
  age: number;
  overview: string;
}

export default function DetailHero({
  id,
  backdrop,
  poster,
  title,
  releaseDate,
  rating,
  genre,
  age,
  overview,
}: DetailHeroProps) {
  const { isFavorite, toggleFavorite } = useFavorite();
  const active = isFavorite(id);

  const handleToggleFavorite = () => {
    const wasFavorite = isFavorite(id);

    toggleFavorite({
      id,
      title,
      poster,
      overview,
      rating,
    });

    if (!wasFavorite) {
      toast.custom(
        () => (
          <div
            className="
            flex items-center gap-s-md xl:gap-s-lg
            px-s-xl xl:px-s-3xl py-1 xl:py-3 mt-10 xl:mt-20 
            rounded-xl xl:rounded-2xl
            bg-black/25
            backdrop-blur-xl
            shadow-lg
            min-w-25 xl:min-w-132.75
            justify-center xl:-translate-x-30
          "
          >
            <img
              src="/Check.png"
              alt="Success"
              className="size-4.5 xl:size-6"
            />
            <span className="text-sm xl:text-md font-medium">
              Success Add to Favorites
            </span>
          </div>
        ),
        {
          position: "top-center",
          duration: 2500,
        },
      );
    }
  };

  return (
    <section className="relative flex min-h-150 xl:min-h-225">
      <img
        src={backdrop}
        alt={title}
        className="absolute inset-0 w-full h-86.25 sm:h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/60 to-black" />
      <div className="relative mt-56 z-10 gap-s-3xl px-s-xl pb-s-5xl xl:gap-s-4xl xl:mt-115 xl:ml-s-10xl">
        <div className="flex flex-row gap-s-xl xl:gap-s-4xl items-start">
          <img
            src={poster}
            alt={title}
            className="w-29 xl:w-65 rounded-xl shadow-lg"
          />
          <div className="flex flex-col gap-s-xs xl:gap-s-4xl w-full">
            <div className="flex flex-col gap-s-xs">
              <h1 className="text-xl xl:text-display-xl font-bold">{title}</h1>

              <div className="flex items-center gap-s-xs text-sm xl:text-md xl:gap-s-md">
                <img src="/Calendar.svg" className="size-5 xl:size-6" />
                <span>{releaseDate}</span>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden xl:flex items-center max-w-72">
              <HeroActions className="xl:max-w-119" movieId={id} />
              <button
                onClick={handleToggleFavorite}
                className="w-13 h-13 aspect-square cursor-pointer rounded-full border border-neutral-900 bg-neutral-950/60 flex items-center justify-center"
              >
                <img
                  src={active ? "/Heart-fullfill.svg" : "/Heart.svg"}
                  className="size-6"
                />
              </button>
            </div>
            <div className="hidden xl:grid grid-cols-3 xl:gap-s-2xl xl:min-w-219">
              <InfoCard
                label="Rating"
                value={`${rating}/10`}
                icon="/Star.svg"
              />
              <InfoCard label="Genre" value={genre} icon="/Video.svg" />
              <InfoCard
                label="Age Limit"
                value={age.toString()}
                icon="/emoji-happy.svg"
              />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mt-s-3xl flex flex-col gap-s-3xl xl:hidden">
          <div className="flex items-center gap-s-xl">
            <HeroActions movieId={id} />
            <button
              onClick={handleToggleFavorite}
              className="w-11 h-11 aspect-square cursor-pointer rounded-full border border-neutral-900 bg-neutral-950/60 flex items-center justify-center"
            >
              <img
                src={active ? "/Heart-fullfill.svg" : "/Heart.svg"}
                className="size-6"
              />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-s-lg h-30">
            <InfoCard label="Rating" value={`${rating}/10`} icon="/Star.svg" />
            <InfoCard label="Genre" value={genre} icon="/Video.svg" />
            <InfoCard
              label="Age Limit"
              value={age.toString()}
              icon="/emoji-happy.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 p-4 text-center bg-black/40 backdrop-blur">
      <img src={icon} className="mx-auto mb-2 size-5.5 xl:size-8" />
      <p className="text-xs xl:text-md text-neutral-300">{label}</p>
      <p className=" text-lg xl:text-xl font-semibold">{value}</p>
    </div>
  );
}
