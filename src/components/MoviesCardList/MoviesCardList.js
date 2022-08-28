import React, { useState, useEffect, Suspense } from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const {
    movies,
    addMovie,
    pathSavedMovie = false,
    isLikedMovie,
    isSavedMovies,
    deleteMovie,
    count,
   } = props;

   const [addMoreMovies, setAddMoreMovies] = useState(0);

   const getMoreMovies = () => {
       count.setCountMovies(count.countMovies + addMoreMovies)
   }

   const widthCheck = () => {
    const width = window.innerWidth;

      if (width > 1270) {
        count.setCountMovies(12);
        setAddMoreMovies(4);
      } else if (width <= 1270 && width > 1020) {
        count.setCountMovies(9);
        setAddMoreMovies(3);
      } else if (width <= 1020 && width > 650) {
        count.setCountMovies(8);
        setAddMoreMovies(2);
      } else if (width <= 650) {
        count.setCountMovies(5);
        setAddMoreMovies(1);
      }
    }
   
      useEffect(() => {
        widthCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

      
  return (
    <section className="moviescard-list">
      <div className="moviescard-list__container">
      <Suspense fallback={<Preloader />}>
        {movies.slice(0, count.countMovies).map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}
          savedMovies={props.savedMovies}
          isSavedMovies={isSavedMovies}
          isLikedMovie={isLikedMovie}
          addMovie={addMovie}
          pathSavedMovie={pathSavedMovie}
          deleteMovie={deleteMovie} 
          />
        ))
      }
      </Suspense>
      </div>
      { ((movies.length > count.countMovies) || (movies.length <! 4)) ? (
      <div className="more-movies-card more-movies-card_active">
          <button className="movies__button btn" type="button" name="more" onClick={getMoreMovies}>Ещё</button>
        </div>
         ) : null }
      </section>
    )
}

export default MoviesCardList;
