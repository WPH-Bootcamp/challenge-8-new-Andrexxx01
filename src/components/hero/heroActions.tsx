import { useState } from "react";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";

interface HeroActionsProps {
  movieId?: number;
  onSeeDetail?: () => void;
  watchLabel?: string;
  detailLabel?: string;
  showPlayIcon?: boolean;
  className?: string;
}

export default function HeroActions({
  movieId,
  onSeeDetail,
  watchLabel = "Watch Trailer",
  detailLabel = "See Detail",
  showPlayIcon = true,
  className = "",
}: HeroActionsProps) {
  const [open, setOpen] = useState(false);
  const { data: trailer } = useMovieTrailer(movieId ?? null);
  const canWatch = !!trailer;

  return (
    <>
      <div
        className={`w-full flex flex-col items-center justify-between gap-s-xl xl:flex-row ${className}`}
      >
        {canWatch && (
          <button
            onClick={() => setOpen(true)}
            className={`w-full flex items-center gap-s-md p-s-md justify-center
              rounded-full bg-[#961200] cursor-pointer
              text-sm font-semibold
              hover:bg-red-500 transition max-w-[calc(100%-20px)] mr-5
              xl:text-md xl:p-2.5 ${className}`}
          >
            {watchLabel}
            {showPlayIcon && (
              <img src="/Play.svg" alt="Play" className="size-4.5 xl:size-6" />
            )}
          </button>
        )}

        {onSeeDetail && (
          <button
            onClick={onSeeDetail}
            className={`
              w-full flex items-center gap-s-md p-s-md justify-center
              rounded-full border border-neutral-900 cursor-pointer
              text-sm font-semibold
              hover:bg-white/10 transition max-w-[calc(100%-20px)] mr-5
              xl:text-md xl:p-2.5 ${className}
            `}
          >
            {detailLabel}
          </button>
        )}
      </div>
      {open && trailer && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-[90%] max-w-3xl aspect-video bg-black">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-sm cursor-pointer"
            >
              Close
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
