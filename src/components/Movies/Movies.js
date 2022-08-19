import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import image1 from "../../images/pic1.svg";
import image2 from "../../images/pic2.svg";
import image3 from "../../images/pic3.svg";
import image4 from "../../images/pic4.svg";
import image5 from "../../images/pic5.svg";
import image6 from "../../images/pic6.svg";
import image7 from "../../images/pic7.svg";
import image8 from "../../images/pic8.svg";
import image9 from "../../images/pic9.svg";
import image10 from "../../images/pic10.svg";
import image11 from "../../images/pic11.svg";
import image12 from "../../images/pic12.svg";
import image13 from "../../images/pic13.svg";
import image14 from "../../images/pic14.svg";
import image15 from "../../images/pic15.svg";
import image16 from "../../images/pic16.svg";

function Movies() {
  const movies = [
    {
      image: image1,
      title: "33 слова о дизайне",
      time: "1ч 42м",
      _id: 1,
      like: true,
    },
    {
      image: image2,
      title: "Киноальманах 100 лет дизайна",
      time: "1ч 42м",
      _id: 2,
      like: true,
    },
    {
      image: image3,
      title: "В погоне за Бенкси",
      time: "1ч 42м",
      _id: 3,
      like: false,
    },
    {
      image: image4,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 4,
      like: false,
    },
    {
      image: image5,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 5,
      like: false,
    },
    {
      image: image6,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 6,
      like: true,
    },
    {
      image: image7,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 7,
      like: true,
    },
    {
      image: image8,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 8,
      like: false,
    },
    {
      image: image9,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 9,
      like: false,
    },
    {
      image: image10,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 10,
      like: false,
    },
    {
      image: image11,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 11,
      like: true,
    },
    {
      image: image12,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 12,
      like: false,
    },
    {
      image: image13,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 13,
      like: false,
    },
    {
      image: image14,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 14,
      like: false,
    },
    {
      image: image15,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 15,
      like: true,
    },
    {
      image: image16,
      title: "Название Фильма",
      time: "1ч 42м",
      _id: 16,
      like: false,
    },
  ]

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} buttonMore={true}/>
    </main>
  );
}

export default Movies; 