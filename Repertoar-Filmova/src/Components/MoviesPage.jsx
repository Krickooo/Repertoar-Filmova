import React, { useState } from "react";
import Movies from "./Movies";
import MovieForm from "./MovieForm";

const initialMovies = [
  {
    title: "Captain America - The First Avenger",
    hall: 2,
    price: 350,
    poster:
      "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg",
    likes: 0,
    dislikes: 0
  },
  {
    title: "The Papillon",
    hall: 1,
    price: 300,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg",
    likes: 0,
    dislikes: 0
  },
  {
    title: "The Lost City of Z",
    hall: 5,
    price: 350,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    likes: 0,
    dislikes: 0
  },
  {
    title: "Klaus",
    hall: 3,
    price: 350,
    poster: "https://m.media-amazon.com/images/I/7128yjOjl9L.jpg",
    likes: 0,
    dislikes: 0
  },
  {
    title: "Bullet Train",
    hall: 4,
    price: 400,
    poster:
      "https://m.media-amazon.com/images/I/71INz6LX8aL._AC_UF894,1000_QL80_.jpg",
    likes: 0,
    dislikes: 0
  }
];

const MoviesPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleReaction = (movieTitle, reaction) => {
    setMovies((prevMovies) =>
      prevMovies.map((m) => {
        if (m.title === movieTitle) {
          return {
            ...m,
            likes: reaction === "Like" ? m.likes + 1 : m.likes,
            dislikes: reaction === "Dislike" ? m.dislikes + 1 : m.dislikes
          };
        }
        return m;
      })
    );
  };

  const handleSaveMovie = (newMovie) => {
    if (editingMovie) {
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.title === editingMovie.title ? { ...newMovie } : m
        )
      );
      setEditingMovie(null);
    } else {
      setMovies((prevMovies) => [...prevMovies, newMovie]);
    }
  };

  return (
    <div>
      <h1>Repertoar za danas ({new Date().toLocaleDateString("sr-RS")})</h1>

      <MovieForm onSave={handleSaveMovie} movieToEdit={editingMovie} />

      {movies.map((m, index) => (
        <div key={index} className="movie-list-item">
          <Movies
            movie={m}
            title={m.title}
            hall={m.hall}
            price={m.price}
            poster={m.poster}
            likes={m.likes}
            dislikes={m.dislikes}
            onReact={handleReaction}
            onEdit={setEditingMovie}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;