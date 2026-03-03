export default function Footer() {
  return (
    <footer className="flex flex-col border-t mt-20 border-neutral-800 justify-center gap-s-md px-s-xl py-s-3xl xl:px-s-11xl xl:py-s-md xl:flex-row xl:items-center xl:justify-between h-30">
      <div className="flex items-center gap-s-xs">
        <img src="/bxs_tv.svg" alt="Movie Logo" className="size-7 xl:size-10" />
        <span className="text-[19.91px] leading-[24.89px] xl:text-[28.44px] xl:leading[35.56px] font-semibold">
          Movie
        </span>
      </div>
      <p className="text-xs text-neutral-600 xl:text-md">
        Copyright ©2025 Movie Explorer
      </p>
    </footer>
  );
}
