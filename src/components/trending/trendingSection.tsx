import TrendingCarousel from "./trendingCarousel";

export default function TrendingSection() {
  return (
    <section className="relative flex flex-col items-start justify-center px-s-xl py-s-5xl gap-s-3xl xl:-mt-10 xl:px-s-11xl xl:pt-s-none xl:pb-s-8xl xl:gap-s-5xl">
      <h2 className="text-display-xs xl:text-display-lg font-bold">
        Trending Now
      </h2>
      <div className="w-full">
        <TrendingCarousel />
      </div>
    </section>
  );
}
