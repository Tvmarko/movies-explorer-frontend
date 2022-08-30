import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function Movies(props) {
  const [countMovies, setCountMovies] = useState(0);
   const {
    movies,
    savedMovies,
    searchMovies,
    saveMovie,
    isLikedMovie,
    isShortMovie,
    searchShortMovies,
    deleteMovie,
  } = props;

  const deleteSavedMovie = function(movie) {
    savedMovies.forEach((item) => {
        if (+item.movieId === movie.id)
        deleteMovie(item);
    });
}

  return (
    <>
      <Header/>
    <main className="movies">
      <SearchForm searchMovies={searchMovies} isShortMovie={isShortMovie} searchShortMovies={searchShortMovies}/>
      <MoviesCardList 
      movies={movies} 
      isLikedMovie={isLikedMovie}
      saveMovie={saveMovie} 
      savedMovies={savedMovies}
      deleteSavedMovie={deleteSavedMovie} 
      count={{ countMovies, setCountMovies }}
      />
     </main>   
<Footer/>
</>
);
}

export default Movies; 