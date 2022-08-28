import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  const [countMovies, setCountMovies] = useState(0);
  const {
    savedMovies,
    searchMovies,
    deleteMovie, 
    searchShortMovies,
    isShortMovie,
    isSavedMovies,                 
    } = props;

  return (
    <>
    <Header/>
    <main className="movies">
      <SearchForm searchMovies={searchMovies}/>
      <MoviesCardList 
      movies={savedMovies}
      isSavedMovies={isSavedMovies}
      isShortMovie={isShortMovie}
      searchShortMovies={searchShortMovies}
      deleteMovie={deleteMovie} 
      pathSavedMovie={true}
      count={{ countMovies, setCountMovies }}
           />
      <div className="more-movies-card"></div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies