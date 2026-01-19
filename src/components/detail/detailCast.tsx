interface CastItem {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default function DetailCast({ cast }: { cast: CastItem[] }) {
  const top5 = cast.slice(0, 5);

  return (
    <section className="px-s-xl xl:px-s-11xl mt-10 xl:pb-20">
      <h3 className="text-xl xl:text-display-md font-bold mb-6">Cast & Crew</h3>
      <div className="flex flex-col gap-s-xl xl:grid xl:grid-cols-3 xl:gap-x-20 xl:gap-y-12">
        {top5.map((p) => {
          return (
            <div key={p.id} className="flex items-center gap-s-lg xl:gap-s-xl">
              <div className="w-13.75 h-21 xl:w-17.25 xl:h-26 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                {p.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${p.profile_path}`}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm xl:text-base font-semibold">{p.name}</p>
                <p className="text-xs xl:text-sm text-neutral-400">
                  {p.character}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
