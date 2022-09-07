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
    isShortMovie,
    searchShortMovies,
    deleteMovie,
    message,
    filmsInputSearch,
    loggedIn,
  } = props;

  return (
    <>
      <Header loggedIn={loggedIn} />
    <main className="movies">
      <SearchForm 
      searchMovies={searchMovies} 
      isShortMovie={isShortMovie} 
      searchShortMovies={searchShortMovies} 
      filmsInputSearch={filmsInputSearch}
      />
      <MoviesCardList 
      movies={movies} 
      saveMovie={saveMovie} 
      savedMovies={savedMovies}
      deleteMovie={deleteMovie} 
      count={{ countMovies, setCountMovies }}
      message={message}
      />
     </main>   
<Footer/>
</>
);
}

export default Movies; 