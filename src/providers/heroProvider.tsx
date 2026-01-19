import { createContext, useContext, useState } from "react";

interface HeroContextType {
  activeMovieId: number | null;
  setActiveMovieId: (id: number) => void;
}

const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

  return (
    <HeroContext.Provider value={{ activeMovieId, setActiveMovieId }}>
      {children}
    </HeroContext.Provider>
  );
}

export const useHero = () => {
  const ctx = useContext(HeroContext);
  if (!ctx) throw new Error("useHero must be used inside HeroProvider");
  return ctx;
};
