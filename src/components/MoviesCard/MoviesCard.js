import React from "react";
import "./MoviesCard.css";

function MoviesCard({movie, deleteMovie, isLikedMovie, handleLikeClick, pathSavedMovie }) {
  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  const isLikeStatus = pathSavedMovie ? true : isLikedMovie(movie);

  const buttonClassName = !pathSavedMovie
  ? isLikeStatus
    ? "movies__card-like-button_liked btn"
    : "btn"
  : "movies__card-like-button_saved btn";

   return (
    <li className="movies__card">
      <a
      href={movie.trailerLink}
      title={movie.trailerLink} 
      className='movies__link'
      target="_blank"
      rel="noopener noreferrer">
      <img src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU} className="movies__card-image"/>
      </a>
       <div className="movies__card-container">
       <h2 className="movies__card-title">{movie.nameRU}</h2>
       <button 
       className={`movies__card-like-button ${buttonClassName}`}
          type="button" 
          onClick={
            pathSavedMovie ? deleteMovie : handleLikeClick
          }
          >
          </button>
        </div>
      <p className="movies__card-movie-time">{getMovieDuration(movie.duration)}</p>
    </li>
  );
}

export default MoviesCard;