import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { useFavorite } from "../providers/favoriteProvider.tsx";
import { useSearch } from "../providers/searchProvider";
import SearchResultSection from "../components/search/searchResultSection";
import HeroActions from "../components/hero/heroActions";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorite();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const isSearching = query.trim().length > 0;
  const isEmpty = favorites.length === 0;

  return (
    <>
      <Navbar />

      {isSearching ? (
        <SearchResultSection />
      ) : (
        <main className="min-h-screen px-s-xl xl:px-s-11xl pt-24 xl:pb-20">
          <h1 className="text-display-xs xl:text-display-lg font-bold mb-8">
            Favorites
          </h1>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center gap-6 mt-20 text-center">
              <img src="/Frame 55.svg" className="size-50 opacity-80" />
              <div>
                <p className="font-semibold text-md">Data Empty</p>
                <p className="text-neutral-400 text-sm">
                  You don't have a favorite movie yet
                </p>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full max-w-50 h-11 xl:h-13 xl:max-w-75 flex items-center justify-center cursor-pointer rounded-full bg-[#961200] px-6 py-3 text-sm xl:text-md font-semibold hover:bg-red-500"
              >
                Explore Movie
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8 max-h-70vh overflow-y-auto no-scrollbar pr-2">
              {favorites.map((m) => (
                <div
                  key={m.id}
                  className="relative flex items-start gap-4 xl:gap-8 border-b border-neutral-900 pb-6"
                >
                  <img
                    src={m.poster}
                    onClick={() => {
                      setQuery("");
                      navigate(
                        `/${m.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")}/detail`,
                        { state: { id: m.id } },
                      );
                    }}
                    className="w-26 h-39 xl:w-45.5 xl:h-67.5 rounded-lg object-cover cursor-pointer shrink-0"
                  />

                  <div className="flex-1 flex flex-col gap-2 xl:gap-4">
                    <h3 className="font-bold text-md xl:text-display-xs">
                      {m.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm xl:text-md font-medium">
                      <img src="/Star.svg" className="size-4" />
                      {m.rating}/10
                    </div>

                    <p className="text-sm text-neutral-400 line-clamp-2 xl:text-md">
                      {m.overview}
                    </p>

                    <div className="mt-6 flex items-center gap-0 xl:-mt-3">
                      <div className="flex-1">
                        <HeroActions
                          className="xl:w-50 min-w-75 text-md font-semibold mt-2 -ml-19 xl:ml-0"
                          movieId={m.id}
                        />
                      </div>

                      {/* Heart – mobile */}
                      <button
                        onClick={() => toggleFavorite(m)}
                        className="xl:hidden size-11 mt-3 -ml-20 rounded-full border border-neutral-900 bg-neutral-950/60 flex items-center cursor-pointer justify-center shrink-0"
                      >
                        <img src="/Heart-fullfill.svg" className="size-5" />
                      </button>
                    </div>
                  </div>
                  {/* Heart – desktop */}
                  <button
                    onClick={() => toggleFavorite(m)}
                    className="hidden xl:flex xl:size-13 rounded-full border border-neutral-900 bg-neutral-950/60 items-center cursor-pointer justify-center shrink-0"
                  >
                    <img
                      src="/Heart-fullfill.svg"
                      className="size-5 xl:size-6"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      <Footer />
    </>
  );
}
