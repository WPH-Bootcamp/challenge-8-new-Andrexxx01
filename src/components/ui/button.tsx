interface LoadMoreButtonProps {
  classname?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

export default function LoadMoreButton({
  classname,
  onClick,
  disabled,
  label = "Load More",
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-50 h-11 bg-neutral-950/60 backdrop-blur rounded-full border border-neutral-900 text-sm font-semibold hover:bg-white/10 transition cursor-pointer xl:w-57.5 xl:h-13 xl:text-md ${classname}`}
    >
      {label}
    </button>
  );
}
