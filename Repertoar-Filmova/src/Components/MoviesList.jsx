import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import movieService from "../services/movieService";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topRatedMovie, setTopRatedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
    
    // Provera dostupnosti servera
    fetch("http://localhost:5111/api/movies", { method: 'HEAD' })
      .then(r => console.log("✅ Server je dostupan:", r.status))
      .catch(e => console.error("❌ Server nije dostupan:", e.message));
  }, []);

  useEffect(() => {
    calculateTopRated();
  }, [movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Započinjam učitavanje filmova...");
      const data = await movieService.getAllMovies();
      console.log("Sirovi odgovor od API-ja:", data);
      console.log("Broj filmova:", data ? data.length : 0);
      
      if (!data || data.length === 0) {
        console.warn("API vratia praznu listu");
        setError("Nema dostupnih filmova. Dodajte novi film!");
      }
      setMovies(data || []);
    } catch (err) {
      console.error("GREŠKA pri učitavanju:", err);
      setError(`Greška pri učitavanju filmova: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateTopRated = () => {
    if (movies.length === 0) {
      setTopRatedMovie(null);
      return;
    }

    const best = movies.reduce((max, current) => {
      const currentRating = current.likes - current.dislikes;
      const maxRating = max.likes - max.dislikes;
      return currentRating > maxRating ? current : max;
    });

    setTopRatedMovie(best);
  };

  const handleLike = async (movieId) => {
    try {
      await movieService.addLike(movieId);
      fetchMovies();
    } catch (err) {
      setError("Greška pri dodavanju Like-a");
      console.error(err);
    }
  };

  const handleDislike = async (movieId) => {
    try {
      await movieService.addDislike(movieId);
      fetchMovies();
    } catch (err) {
      setError("Greška pri dodavanju Dislike-a");
      console.error(err);
    }
  };

  const handleDelete = async (movieId) => {
    if (!confirm("Da li ste sigurni da želite da obriš film?")) {
      return;
    }

    try {
      await movieService.deleteMovie(movieId);
      fetchMovies();
    } catch (err) {
      setError("Greška pri brisanju filma");
      console.error(err);
    }
  };

  const handleEdit = (movieId) => {
    window.location.href = `/movies/edit/${movieId}`;
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Učitavanje filmova...</p>
        <p style={{fontSize: "0.85rem", color: "#999"}}>Čeka se odgovor sa http://localhost:5111/api/movies</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Repertoar za danas ({new Date().toLocaleDateString("sr-RS")})</h1>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p style={{fontSize: "0.9rem", marginTop: "5px"}}>
            💡 Pokušaj: Proveri da li je server pokrenut na http://localhost:5111
          </p>
        </div>
      )}

      {topRatedMovie && (
        <div className="top-rated-section">
          <h3>Najbolje ocenjen film:</h3>
          <MovieCard
            movie={topRatedMovie}
            title={topRatedMovie.title}
            hall={topRatedMovie.hall}
            price={topRatedMovie.price}
            poster={topRatedMovie.poster}
            likes={topRatedMovie.likes}
            dislikes={topRatedMovie.dislikes}
            onLike={handleLike}
            onDislike={handleDislike}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isTopRated={true}
          />
        </div>
      )}

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((m) => (
            <div key={m.id} className="movie-list-item">
              <MovieCard
                movie={m}
                title={m.title}
                hall={m.hall}
                price={m.price}
                poster={m.poster}
                likes={m.likes}
                dislikes={m.dislikes}
                onLike={handleLike}
                onDislike={handleDislike}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <p className="empty-message">Nema dostupnih filmova. Kliknite na "Add Movie" u meniju da dodate film.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
