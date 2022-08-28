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
    addMovie,
    isLikedMovie,
    isShortMovie,
    searchShortMovies,
  } = props;

  return (
    <>
      <Header/>
    <main className="movies">
      <SearchForm searchMovies={searchMovies}/>
      <MoviesCardList 
      movies={movies} 
      isLikedMovie={isLikedMovie}
      addMovie={addMovie} 
      searchMovies={searchMovies}
      isShortMovie={isShortMovie}
      searchShortMovies={searchShortMovies}
      savedMovies={savedMovies}
      isSavedMovies={false}
      count={{ countMovies, setCountMovies }}
      />
     </main>   
<Footer/>
</>
);
}

export default Movies; 