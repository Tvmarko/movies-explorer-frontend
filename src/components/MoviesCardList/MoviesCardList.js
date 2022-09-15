import React, { useState, useEffect, Suspense } from 'react';
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import {
  BIGScreen,
  MEDIUMScreen,
  SMALLScreen,
  CardsNumberBIG,
  CardsNumberMEDIUM,
  CardsNumberSMALLER,
  CardsNumberSMALL,
  CardsAddMoreBIG,
  CardsAddMoreMEDIUM,
  CardsAddMoreSMALLER,
  CardsAddMoreSMALL,
} from "../../utils/config";
const MoviesCard = React.lazy(() => import("../MoviesCard/MoviesCard")); // Ленивая загрузка

function MoviesCardList(props) {
  const {
    movies,
    savedMovies,
    saveMovie,
    pathSavedMovie = false,
    deleteMovie,
    deleteSavedMovie,
    count,
    message,
   } = props;
  //const moviesArray = Array.from(movies);
   const [addMoreMovies, setAddMoreMovies] = useState(0);

   const getMoreMovies = () => {
       count.setCountMovies(count.countMovies + addMoreMovies)
   }

   const widthCheck = () => {
    const width = window.innerWidth;

      if (width > BIGScreen) {
        count.setCountMovies(CardsNumberBIG);
        setAddMoreMovies(CardsAddMoreBIG);
      } else if (width <= BIGScreen && width > MEDIUMScreen) {
        count.setCountMovies(CardsNumberMEDIUM);
        setAddMoreMovies(CardsAddMoreMEDIUM);
      } else if (width <= MEDIUMScreen && width > SMALLScreen) {
        count.setCountMovies(CardsNumberSMALLER);
        setAddMoreMovies(CardsAddMoreSMALLER);
      } else if (width <= SMALLScreen) {
        count.setCountMovies(CardsNumberSMALL);
        setAddMoreMovies(CardsAddMoreSMALL);
      }
    }
   
      useEffect(() => {
        widthCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isLikedMovie = (movie) => {
      const isLiked =  savedMovies.find((item) => {
      return item.movieId === movie.id;
    });
      return Boolean(isLiked);
    }
    
    return (
    <section className="moviescard-list">
      <div className="moviescard-list__container">
      <Suspense fallback={<Preloader />}>
      {message ? (
            <p className="movies-message">{message}</p>
          ) : (
            movies.slice(0, count.countMovies).map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}             
          isLikedMovie={isLikedMovie}
          saveMovie={saveMovie} 
          pathSavedMovie={pathSavedMovie}
          deleteMovie={deleteMovie} 
          deleteSavedMovie={deleteSavedMovie}
          />
        ))
      )}
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