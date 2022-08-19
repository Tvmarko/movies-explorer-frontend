import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({movies, buttonMore}) {
  const [isLoading, setLoading] = useState(false);

  function handlePreloader() {
  setLoading(true);
}
  return (
    <section className="moviescard-list">
      <div className="moviescard-list__container">
        {movies.map((movie) => (
        <MoviesCard
          key={movie._id}
          movie={movie}
          saved={false}
        />
        ))
    }
      </div>
    {isLoading ? <Preloader /> : (
      buttonMore && (
        <div className="more-movies-card more-movies-card_active">
          <button className="movies__button btn" type="button" name="more" onClick={handlePreloader}>Ещё</button>
        </div>
        )
      )}
      </section>
    )
}

export default MoviesCardList 