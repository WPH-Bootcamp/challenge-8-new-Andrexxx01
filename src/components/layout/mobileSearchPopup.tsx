import { useSearch } from "../../providers/searchProvider";

interface MobileSearchPopupProps {
  onClose: () => void;
}

export default function MobileSearchPopup({ onClose }: MobileSearchPopupProps) {
  const { query, setQuery } = useSearch();

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-16 px-s-xl flex items-center gap-3 bg-black">
      <button onClick={onClose}>
        <img src="/Arrow.svg" alt="Back" className="size-6" />
      </button>

      {/* Search Input */}
      <div className="flex items-center flex-1 gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#0A0D12]/80 backdrop-blur">
        <img src="/Search.svg" alt="Search" className="size-4 opacity-70" />

        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movie"
          className="
            flex-1 bg-transparent text-sm text-white outline-none
            placeholder:text-white/50
          "
        />

        {query && (
          <button onClick={() => setQuery("")}>
            <img src="/Close.svg" alt="Clear" className="size-4 opacity-70" />
          </button>
        )}
      </div>
    </div>
  );
}
