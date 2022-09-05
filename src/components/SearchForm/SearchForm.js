import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const {
      searchMovies,
      isShortMovie,
      searchShortMovies,
      filmsInputSearch,
    } = props;
  const [findedMovie, setFindedMovie] = useState("");
  const [error, setError] = useState("");  
  const [formValid, setFormValid] = useState(false);
  
  useEffect(() => {
     setFindedMovie(filmsInputSearch);
  }, [filmsInputSearch]);

  function handleSearching(e) {
    setFindedMovie(e.target.value);
    if (e.target.value.length === 0) {
      setError("Нужно ввести ключевое слово");
    } else if (e.target.value.length < 2) {
      setError("Длина должна быть не менее 2 символов"); 
   } else if (e.target.value.length > 30) {
     setFormValid(false);
       setError("Длина должна должна быть не более 30 символов");
    } else {
      setError("");
    }
  }
  
  function handleSearchSubmit(e) {
    e.preventDefault();
    searchMovies(findedMovie);
    setFindedMovie("");
    setError("");
  }

  useEffect(() => {
    if (findedMovie && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [findedMovie, error]);
  
  return (
    <section className="search" >
      <form className="search__container" onSubmit={handleSearchSubmit}>
        <input 
        className="search__input" 
        placeholder="Фильм" 
        type="text" 
        value={findedMovie || ''}
        minLength="2"
        maxLength="30"
        required 
        onChange={handleSearching}/>
        <div className="form__field_error">{error}</div>
        <button 
        className="search__button btn" 
        type="submit"
        disabled={!formValid}
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