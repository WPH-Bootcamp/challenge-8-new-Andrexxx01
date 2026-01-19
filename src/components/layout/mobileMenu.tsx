import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  onClose: () => void;
  onNavigate?: () => void;
}

export default function MobileMenu({ onClose, onNavigate }: MobileMenuProps) {
  const navigate = useNavigate();
  return (
    <aside className="fixed inset-0 z-50 bg-black xl:hidden">
      <div className="h-16 w-full flex items-center justify-between px-s-xl">
        <div className="flex items-center gap-s-xs">
          <img src="/bxs_tv.svg" alt="Movie Logo" className="size-7" />
          <span className="text-[19.91px] leading-[24.89px] font-semibold">
            Movie
          </span>
        </div>

        <button onClick={onClose}>
          <img
            src="/x-close.svg"
            alt="Close"
            className="size-6 cursor-pointer hover-rotate-wiggle"
          />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col gap-s-xl mt-6 ml-4 text-lg">
        <li
          className="text-md cursor-pointer hover:opacity-60"
          onClick={() => {
            onNavigate?.();
            navigate("/");
            onClose();
          }}
        >
          Home
        </li>
        <li
          className="text-md cursor-pointer hover:opacity-60"
          onClick={() => {
            onNavigate?.();
            navigate("/favorites");
            onClose();
          }}
        >
          Favorites
        </li>
      </ul>
    </aside>
  );
}
