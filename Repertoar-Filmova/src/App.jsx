import React from "react";
import Movies from "./Movies";
import "./styles/main.scss";

const App = () => {
  const movies = [
    {
      title: "Captain America - The First Avenger",
      hall: 2,
      price: 350,
      poster: "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg"
    },
    {
      title: "The Papillon",
      hall: 1,
      price: 300,
      poster: "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg"
    },
    {
      title: "The Lost City of Z",
      hall: 5,
      price: 350,
      poster: "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
      title: "Klaus",
      hall: 3,
      poster: "https://m.media-amazon.com/images/I/7128yjOjl9L.jpg"
    },
    {
      title: "Bullet Train",
      poster: "https://m.media-amazon.com/images/I/71INz6LX8aL._AC_UF894,1000_QL80_.jpg"
    }
  ];

  const handleReaction = (movieTitle, reaction) => {
    alert(`Dodelili ste "${reaction}" za film "${movieTitle}"!`);
  };

  return (
    <div>
      <h1>Repertoar za danas ({new Date().toLocaleDateString("sr-RS")})</h1>
      {movies.map(m => (
        <Movies title={m.title} hall={m.hall} price={m.price} poster={m.poster} onReact={handleReaction}/>
      ))}
    </div>
  );
};

export default App;
