import Navbar from "../components/layout/navbar";
import HeroSection from "../components/hero/heroSection";
import TrendingSection from "../components/trending/trendingSection";
import NewReleaseSection from "../components/new-release/newReleaseSection";
import Footer from "../components/layout/footer";
import { useSearch } from "../providers/searchProvider";
import SearchResultSection from "../components/search/searchResultSection";

const HomePage = () => {
  const { query } = useSearch();
  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {isSearching ? (
        <SearchResultSection />
      ) : (
        <>
          <HeroSection />
          <TrendingSection />
          <NewReleaseSection />
        </>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
