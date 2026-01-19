import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { useLocation, useParams } from "react-router-dom";
import { useMovieById } from "../hooks/useMovieById";
import DetailHero from "../components/detail/detailHero";
import DetailOverview from "../components/detail/detailOverview";
import DetailCast from "../components/detail/detailCast";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useSearch } from "../providers/searchProvider";
import SearchResultSection from "../components/search/searchResultSection";

export default function MovieDetailPage() {
  const { id: paramId } = useParams();
  const location = useLocation();
  const movieId =
    (paramId ? Number(paramId) : undefined) || (location.state as any)?.id;

  const { query } = useSearch();
  const isSearching = query.trim().length > 0;

  const { data, isLoading } = useMovieById(movieId);
  const { data: credits } = useMovieCredits(movieId);

  if (!movieId) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          Movie not found
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black" />
        <Footer />
      </>
    );
  }

  if (!data) return null;

  function formatDateID(date: string) {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const backdrop = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

  return (
    <>
      <Navbar />
      {isSearching ? (
        <SearchResultSection />
      ) : (
        <main className="bg-black text-white">
          <DetailHero
            id={data.id}
            backdrop={backdrop}
            poster={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            title={data.title}
            releaseDate={formatDateID(data.release_date)}
            rating={Math.ceil(data.vote_average * 10) / 10}
            genre={data.genres?.[0]?.name ?? "-"}
            age={data.adult ? 18 : 13}
            overview={data.overview}
          />
          <DetailOverview text={data.overview} />
          {credits?.cast && <DetailCast cast={credits.cast} />}
        </main>
      )}
      <Footer />
    </>
  );
}
