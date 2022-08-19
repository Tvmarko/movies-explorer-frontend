import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import image1 from "../../images/pic1.svg";
import image2 from "../../images/pic2.svg";
import image3 from "../../images/pic3.svg";

function SavedMovies() {
  const savedMovies = [
      {
        image: image1,
        title: "Название Фильма",
        time: "1ч 42м",
        _id: 1,
        saved: true,
      },
      {
        image: image2,
        title: "Название Фильма",
        time: "1ч 42м",
        _id: 2,
        saved: true,
      },
      {
        image: image3,
        title: "Название Фильма",
        time: "1ч 42м",
        _id: 3,
        saved: true,
      },
    ]

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} buttonMore={false}/>
      <div className="more-movies-card"></div>
    </main>
  )
} 

export default SavedMovies