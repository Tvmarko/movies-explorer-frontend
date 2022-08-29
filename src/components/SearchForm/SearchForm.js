import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const {
      searchMovies,
      isShortMovie,
      searchShortMovies,
  } = props;
  const [findedMovie, setFindedMovie] = useState("");
  
    
  function handleSearching(e) {
    setFindedMovie(e.target.value);
  }
  
  function handleSearchSubmit(e) {
    e.preventDefault();
    searchMovies(findedMovie);
    setFindedMovie("");
  }
    
  return (
    <section className="search" >
      <form className="search__container" onSubmit={handleSearchSubmit}>
        <input 
        className="search__input" 
        placeholder="Фильм" 
        type="text" 
        value={findedMovie}
        required 
        onChange={handleSearching}/>
        <button 
        className="search__button btn" 
        type="submit"
        onClick={handleSearchSubmit}>
        </button>
      </form>
      <div className="search__toggle">
        <p className="search__films">Короткометражки</p>
        <label className="search__tumbler">
          <input 
          type="checkbox" 
          className="search__checkbox"
          onChange={searchShortMovies}
          checked={isShortMovie}
          />
          <span className="search__slider" />
        </label>
      </div>
    </section>
  )
}

export default SearchForm; 