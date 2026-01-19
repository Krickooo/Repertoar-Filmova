import axios from "axios";

const API_BASE_URL = "http://localhost:5111/api/movies";

const normalizeMovie = (movie) => {
  const normalized = {
    id: movie.id || movie.Id,
    title: movie.title || movie.Title || movie.name || movie.Name || "",
    hall: movie.hall !== undefined ? movie.hall : (movie.Hall !== undefined ? movie.Hall : null),
    price: movie.price !== undefined ? movie.price : (movie.Price !== undefined ? movie.Price : null),
    poster: movie.poster || movie.Poster || "",
    likes: movie.likes !== undefined ? movie.likes : (movie.Likes || 0),
    dislikes: movie.dislikes !== undefined ? movie.dislikes : (movie.Dislikes || 0)
  };
  console.log("Normalizovan film:", normalized);
  return normalized;
};

const movieService = {
  getAllMovies: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const normalizedData = Array.isArray(response.data) 
        ? response.data.map(normalizeMovie) 
        : [];
      return normalizedData;
    } catch (error) {
      console.error("Greška u getAllMovies:", error.message);
      throw error;
    }
  },

  getMovieById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return normalizeMovie(response.data);
    } catch (error) {
      console.error("Greška u getMovieById:", error.message);
      throw error;
    }
  },

  addMovie: async (movie) => {
    try {
      const response = await axios.post(API_BASE_URL, movie);
      return normalizeMovie(response.data);
    } catch (error) {
      console.error(" Greška u addMovie:", error.message);
      throw error;
    }
  },

  updateMovie: async (id, movie) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, movie);
      return normalizeMovie(response.data);
    } catch (error) {
      console.error(" Greška u updateMovie:", error.message);
      throw error;
    }
  },
  addLike: async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}/like`);
      return true;
    } catch (error) {
      console.error("Greška u addLike:", error.message);
      throw error;
    }
  },

  addDislike: async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}/dislike`);
      return true;
    } catch (error) {
      console.error("Greška u addDislike:", error.message);
      throw error;
    }
  },
  deleteMovie: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("❌ Greška u deleteMovie:", error.message);
      throw error;
    }
  }
};

export default movieService;
