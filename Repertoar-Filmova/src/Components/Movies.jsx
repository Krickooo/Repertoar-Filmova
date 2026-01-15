import React, { useEffect } from "react";

const Movies = (props) => {
  useEffect(() => {
    console.log("Postavka filmova");

    return () => {
      console.log("Sklanjanje filmova");
    };
  }, []);

  const displayHall = props.hall ? `sala: ${props.hall}` : "Film još uvek nije u ponudi";
  const displayPrice = props.price ? props.price : 300;

  return (
    <div className="container">
      <div className="image">
        <img src={props.poster} alt={props.title} />
        <div className="button">
          {!props.isTopRated && (
            <>
              <button onClick={() => props.onReact(props.title, "Like")}>Like</button>
              <button onClick={() => props.onReact(props.title, "Dislike")}>Dislike</button>
            </>
          )}
          {props.onEdit && (
            <button onClick={() => props.onEdit(props.movie)}>Izmeni</button>
          )}
        </div>
      </div>
      <div className="movie-info">
        <div className="movie">
          {props.title}, {displayHall}, cena: {displayPrice} din
        </div>
        <div className="reactions">
          <span>Likes: {props.likes}</span>{" "}
          <span>Dislikes: {props.dislikes}</span>
        </div>
      </div>
    </div>
  );
};

export default Movies;
