import React from "react";

const Movies = (props) => {
    return (
        <div className="container">
            <div className="image">
                <img src="https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg"/>
            </div>
            <div className="movie">
                {props.title}, sala: {props.hall}, cena: {props.price}din
            </div>
        </div>
    )
}
export default Movies;