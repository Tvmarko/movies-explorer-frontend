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
    deleteSavedMovie, 
    } = props;

  return (
    <>
    <Header/>
    <main className="movies">
      <SearchForm searchMovies={searchMovies}/>
      <MoviesCardList 
      movies={savedMovies}
      deleteSavedMovie={deleteSavedMovie}
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
