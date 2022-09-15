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
    filmsInputSearch,
    setFilmsInputSearch,
    serverError,
    message,
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
       setFilmsInputSearch={setFilmsInputSearch}
       />
      <MoviesCardList 
      movies={savedMovies}
      deleteSavedMovie={deleteSavedMovie}
      pathSavedMovie={true}
      count={{ countMovies, setCountMovies }}
      serverError={serverError}
      message={message}
      />
     <div className="more-movies-card"></div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies