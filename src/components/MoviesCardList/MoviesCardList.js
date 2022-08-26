import React, { useState, useEffect } from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const {
    movies,
    handleMovie,
    pathSavedMovie = false,
    isLikedMovie,
} = props;

  const [movieCards, setMovieCards] = useState(0);
  const [moreMovieCards, setMoreMovieCards] = useState(0);
    
  useEffect(() => {
    function  widthCheck() {
    const width = window.innerWidth;

      if (width > 1270) {
        setMovieCards(12);
        setMoreMovieCards(4);
      } else if (width <= 1270 && width > 1020) {
        setMovieCards(8);
        setMoreMovieCards(3);
      } else if (width <= 1020 && width > 650) {
        setMovieCards(8);
        setMoreMovieCards(2);
      } else if (width <= 650) {
        setMovieCards(5);
        setMoreMovieCards(1);
      }
    }
    widthCheck();
      }, []);

   function getMoreMovies() {
    setMovieCards(movieCards + moreMovieCards);
  }

  return (
    <section className="moviescard-list">
        <div className="moviescard-list__container">
        {movies.map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}
          isLikedMovie={isLikedMovie}
          handleMovie={handleMovie}
          pathSavedMovie={pathSavedMovie}
        />
        ))
    }
      </div>
      <div className={`more-movies-card ${
              movies.length >= movieCards ? 'more-movies-card_active' : ''}`}>
          <button className="movies__button btn" type="button" name="more" onClick={getMoreMovies}>Ещё</button>
        </div>
      </section>
    )
}

export default MoviesCardList 