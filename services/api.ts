export const TMBD_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_V3_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6815553b89adbda2878a97487b6e39dd

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMBD_CONFIG.API_KEY}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMBD_CONFIG.API_KEY}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};

export const fetchMoviesDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`,
      { method: "GET", headers: TMBD_CONFIG.headers }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
