import React from "react";
import "./MoviesCard.css";

function MoviesCard({movie, deleteMovie, isLikedMovie, handleLikeClick, pathSavedMovie }) {
  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

   return (
    <li className="movies__card">
      <a
      href={movie.trailerLink}
      title={movie.trailerLink} 
      className='movies__link'
      target="_blank"
      rel="noopener noreferrer">
      <img className="movies__card-image" src={movie.image} alt={movie.title} />
      </a>
       <div className="movies__card-container">
       <h2 className="movies__card-title">{movie.title}</h2>
        {
          pathSavedMovie ? 
          <button className={`movies__card-like-button  ${isLikedMovie ? "movies__card-like-button_liked btn" : ""}`}
          type="button" onClick={handleLikeClick}></button>
          : 
          <button 
          className="movies__card-like-button movies__card-like-button_saved btn"
          onClick={deleteMovie}
          type="button"></button>
        }
      </div>
      <p className="movies__card-movie-time">{getMovieDuration(movie.duration)}</p>
    </li>
  );
}

export default MoviesCard;