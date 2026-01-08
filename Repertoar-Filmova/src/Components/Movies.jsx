import React from "react";

const Movies = (props) => {
  const displayHall = props.hall ? `sala: ${props.hall}` : "Film još uvek nije u ponudi";
  const displayPrice = props.price ? props.price : 300;

  return (
    <div className="container">
      <div className="image">
        <img src={props.poster} alt={props.title} />
        <div className="button">
          <button onClick={() => props.onReact(props.title, "Like")}>Like</button>
          <button onClick={() => props.onReact(props.title, "Dislike")}>Dislike</button>
        </div>
      </div>
      <div className="movie">
        {props.title}, {displayHall}, cena: {displayPrice} din
      </div>
    </div>
  );
};

export default Movies;
