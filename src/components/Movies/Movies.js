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
    likeMovie,
    isLikedMovie,
    isShortMovie,
    searchShortMovies,
    deleteMovie,
  } = props;

  return (
    <>
      <Header/>
    <main className="movies">
      <SearchForm searchMovies={searchMovies} isShortMovie={isShortMovie} searchShortMovies={searchShortMovies}/>
      <MoviesCardList 
      movies={movies} 
      isLikedMovie={isLikedMovie}
      saveMovie={saveMovie} 
      likeMovie={likeMovie}
      savedMovies={savedMovies}
      pathSavedMovie={false}
      deleteMovie={deleteMovie} 
      count={{ countMovies, setCountMovies }}
      />
     </main>   
<Footer/>
</>
);
}

export default Movies; 