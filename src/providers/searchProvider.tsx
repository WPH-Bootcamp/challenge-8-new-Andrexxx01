import { createContext, useContext, useState, useCallback } from "react";

export interface SearchMovie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  overview: string;
}

interface SearchContextValue {
  query: string;
  setQuery: (v: string) => void;
  movies: SearchMovie[];
  registerMovies: (list: SearchMovie[]) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<SearchMovie[]>([]);

  const registerMovies = useCallback((list: SearchMovie[]) => {
    setMovies((prev) => {
      const map = new Map(prev.map((m) => [m.id, m]));
      list.forEach((m) => map.set(m.id, m));
      return Array.from(map.values());
    });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        movies,
        registerMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return ctx;
}
