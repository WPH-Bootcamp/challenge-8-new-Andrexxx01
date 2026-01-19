import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface FavoriteMovie {
  id: number;
  title: string;
  poster: string;
  overview: string;
  rating: number;
}

interface FavoriteContextValue {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => void;
  isFavorite: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextValue | null>(null);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  const toggleFavorite = (movie: FavoriteMovie) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorite must be used inside FavoriteProvider");
  return ctx;
};
