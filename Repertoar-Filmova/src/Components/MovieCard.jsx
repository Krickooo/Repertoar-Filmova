import React from "react";

const MovieCard = (props) => {
  console.log("MovieCard props:", props);
  
  const displayHall = props.hall ? `sala: ${props.hall}` : "Film još uvek nije u ponudi";
  const displayPrice = props.price ? props.price : 300;

  return (
    <div className="container">
      <div className="image">
        <img src={props.poster} alt={props.title} />
        <div className="button">
          {!props.isTopRated && (
            <>
              <button onClick={() => props.onLike(props.movie.id)}>Like</button>
              <button onClick={() => props.onDislike(props.movie.id)}>Dislike</button>
              <button onClick={() => props.onEdit(props.movie.id)}>Izmeni</button>
              <button onClick={() => props.onDelete(props.movie.id)}>Obriši</button>
            </>
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

export default MovieCard;
