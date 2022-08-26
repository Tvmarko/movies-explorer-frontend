import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const {
    findSavedMovies,
    savedMovies,
    isLoading,
      searchMovies,
     deleteMovie,
    } = props;

    function handleDelete(movie) {
      const movieForDelete = savedMovies.forEach((item) => {
          if (+item.movieId === movie.id)
              deleteMovie(movieForDelete[0]);
      });
    }

  return (
<>
      <Header />
    <main className="movies">
      <SearchForm searchMovies={searchMovies}/>
      {isLoading ? <Preloader /> : (
              findSavedMovies && (
      <MoviesCardList 
      movies={savedMovies} 
      handleMovie={handleDelete} 
           />
         )
        )}
        <div className="more-movies-card"></div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies