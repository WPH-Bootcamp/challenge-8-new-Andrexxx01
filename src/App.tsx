import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import MovieDetailPage from "./pages/movieDetail";
import FavoritesPage from "./pages/favoritesPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:movieTitle/detail" element={<MovieDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default App;
