export default function DetailOverview({ text }: { text: string }) {
  return (
    <section className="px-s-xl xl:px-s-11xl">
      <h3 className="text-xl xl:text-display-md font-bold mb-4">Overview</h3>
      <p className="text-neutral-400 xl:text-lg text-md leading-relaxed max-w-290">
        {text}
      </p>
    </section>
  );
}
