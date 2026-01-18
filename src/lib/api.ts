import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getMovieById = async (id: number) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};

export const getMovieCredits = async (id: number) => {
  const res = await api.get(`/movie/${id}/credits`);
  return res.data;
};

export const getTrendingMovies = async (page = 1) => {
  const res = await api.get("/trending/movie/week", {
    params: { page },
  });
  return res.data;
};

export const getNewReleases = async (page: number) => {
  const res = await api.get("/movie/now_playing", {
    params: {
      page,
    },
  });

  return res.data;
};

export const getMovieVideos = async (id: number) => {
  const res = await api.get(`/movie/${id}/videos`);
  return res.data;
};
