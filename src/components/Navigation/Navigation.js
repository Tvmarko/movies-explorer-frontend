import React from "react";
import "./Navigation.css";
import { Link, useRouteMatch } from "react-router-dom";

function Navigation({ toggleMenu, isMenuOpen }) {
  const isMovies = useRouteMatch({ path: "/movies", exact: false });
  const isSavedMovies = useRouteMatch({ path: "/saved-movies", exact: false });
  const isMain = useRouteMatch({ path: "/", exact: true });

  return(
    <nav className="navigation" >
      <button className="navigation__button-menu btn" type="button" onClick={toggleMenu}></button>
      <div className={`navigation__container ${isMenuOpen ? 'navigation__container_active' : ''}`}> 
      <div className="navigation__popup-menu">
        <div className="navigation__list-container">
          <button className="navigation__button-close btn" type="button" onClick={toggleMenu}></button>
          <ul className="navigation__items">
            <li className="navigation__item navigation__item_main">
              <Link className="navigation__item-link link" to="/">
                Главная
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                className={`navigation__item-link link ${isMovies ? "link_active" : ""}${isMain ? "navigation__item-link_main" : ""}`}
                to="/movies">
                Фильмы
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                className={`navigation__item-link link ${isSavedMovies ? "link_active" : ""}${isMain ? "navigation__item-link_main" : ""}`}
                to="/saved-movies">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/profile" 
          className={`navigation__profile link ${isMain ? "navigation__profile_main" : ""}`}>
            Аккаунт<span className={`header__account-icon ${isMenuOpen ? "account2": "account"}`}></span>
        </Link>
       </div>
      </div>
    </nav>
  );
}

export default Navigation; 