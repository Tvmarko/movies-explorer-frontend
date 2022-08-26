import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";

function Movies(props) {
   const {
    movies,
    findMovies,
    isLoading,
    searchMovies,
    saveMovie,
  } = props;


  return (
    <>
      <Header />
    <main className="movies">
      <SearchForm searchMovies={searchMovies}/>
      {isLoading ? <Preloader /> : (
              findMovies && (
      <MoviesCardList 
      movies={movies} 
      handleMovie={{saveMovie}} 
      />
         )
      )}
    </main>
    <Footer />
    </>
  );
}

export default Movies; 