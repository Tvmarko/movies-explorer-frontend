import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" required />
        <button className="search__button btn" type="submit"></button>
      </div>
      <div className="search__toggle">
        <p className="search__films">Короткометражки</p>
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox"/>
          <span className="search__slider" />
        </label>
      </div>
    </form>
  )
}

export default SearchForm; 