import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  const [countMovies, setCountMovies] = useState(0);
  const {
    movies,
    savedMovies,
    searchMovies,
    deleteMovie,          
    } = props;

    function deleteSavedMovie(movie) {
      if (movies.some((item) => item.id === +movie.movieId))
          deleteMovie(movie);
  }

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