import { useState, useEffect, useRef } from "react";
import MobileMenu from "./mobileMenu";
import MobileSearchPopup from "./mobileSearchPopup";
import { Link } from "react-router-dom";
import { useSearch } from "../../providers/searchProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { query, setQuery } = useSearch();

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resetSearch = () => {
    setQuery("");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed h-16 w-full flex items-center justify-between ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        } px-s-xl z-40 xl:h-22.5 xl:px-s-11xl`}
      >
        <div className="flex items-center justify-between xl:gap-s-8xl">
          <div className="flex items-center gap-s-xs xl:gap-[7.11px]">
            <img
              src="/bxs_tv.svg"
              alt="Movie Logo"
              className="size-7 xl:size-10"
            />
            <span className="text-[19.91px] leading-[24.89px] font-semibold xl:text-[28.44px] xl:leading-[35.56px]">
              Movie
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden xl:flex items-center gap-s-6xl">
            <li className="cursor-pointer hover:opacity-60 text-md">
              <Link to="/" onClick={resetSearch}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer hover:opacity-60 text-md">
              <Link to="/favorites" onClick={resetSearch}>
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          {/* Desktop Search */}
          <div className="hidden xl:flex items-center border-neutral-800 bg-[#0A0D12]/60 rounded-2xl px-s-xl py-s-md gap-s-md">
            <img src="/Search.svg" alt="Search" className="size-6 opacity-70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Movie"
              className="bg-transparent text-md outline-none placeholder:text-neutral-500 placeholder:text-md"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <img
                  src="/Close.svg"
                  alt="Clear"
                  className="size-5 opacity-70 hover:opacity-100"
                />
              </button>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex relative xl:hidden items-center gap-s-3xl">
            <button onClick={() => setIsSearchOpen((prev) => !prev)}>
              <img
                src="/Search.svg"
                alt="Search"
                className="absolute top-0 size-6 cursor-pointer hover-rotate-wiggle"
              />
            </button>
            <div ref={searchRef}>
              {isSearchOpen && (
                <MobileSearchPopup onClose={() => setIsSearchOpen(false)} />
              )}
            </div>

            <button onClick={() => setIsMenuOpen(true)}>
              <img
                src="/Menu.svg"
                alt="Menu"
                className="size-6 cursor-pointer hover-rotate-wiggle"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu
          onClose={() => setIsMenuOpen(false)}
          onNavigate={resetSearch}
        />
      )}
    </>
  );
}
