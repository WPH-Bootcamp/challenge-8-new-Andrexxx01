import NewReleaseGrid from "./newReleaseGrid";

export default function NewReleaseSection() {
  return (
    <section className="mt-0 flex flex-col items-start justify-center px-s-xl py-s-5xl gap-s-3xl xl:px-s-11xl xl:pt-s-none xl:pb-s-8xl xl:gap-s-5xl">
      <h2 className="text-display-xs xl:text-display-lg font-bold">
        New Release
      </h2>
      <div className="w-full xl:pb-20">
        <NewReleaseGrid />
      </div>
    </section>
  );
}
