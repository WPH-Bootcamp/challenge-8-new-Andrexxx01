import { useSearch } from "../../providers/searchProvider";
import SearchItemCard from "./searchItemCard";

export default function SearchResultSection() {
  const { query, movies } = useSearch();

  if (!query) return null;

  const q = query.toLowerCase().trim();

  const results = movies.filter((m) => m.title.toLowerCase().includes(q));

  if (results.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black text-white">
        <img src="/Frame-search.svg" className="w-40 mb-4" />
        <p className="text-sm xl:text-base font-semibold">Data Not Found</p>
        <p className="text-xs xl:text-sm text-neutral-400">
          Try other keywords
        </p>
      </section>
    );
  }

  return (
    <section className="px-s-xl xl:px-s-11xl pt-24 xl:pt-32 pb-20 flex flex-col gap-10 bg-black text-white">
      {results.map((m) => (
        <SearchItemCard
          key={m.id}
          id={m.id}
          title={m.title}
          poster={m.poster}
          rating={m.rating}
          overview={m.overview}
        />
      ))}
    </section>
  );
}
