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
    isShortMovie,
    searchShortMovies,
    deleteSavedMovie,
    message,
  } = props;

  return (
    <>
    <Header/>
    <main className="movies">
      <SearchForm 
       searchMovies={searchMovies} 
       isShortMovie={isShortMovie} 
       searchShortMovies={searchShortMovies} 
       />
      {savedMovies.length > 0 ? (
      <MoviesCardList 
      movies={savedMovies}
      deleteSavedMovie={deleteSavedMovie}
      pathSavedMovie={true}
      count={{ countMovies, setCountMovies }}
      message={message}
      />
      ) : (
        <p className="movies-message">У вас пока нет сохраненных фильмов</p>
      )}
      <div className="more-movies-card"></div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies
