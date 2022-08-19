import React from "react";
import "./Navigation.css";
import { Link, useRouteMatch } from "react-router-dom";
import iconProfile from "../../images/profile.svg";

function Navigation() {
  const isMovies = useRouteMatch({ path: "/movies", exact: false });
  const isSavedMovies = useRouteMatch({ path: "/saved-movies", exact: false });
  return(
    <div className="navigation__container">
        <div className="navigation__films">
          <Link
            className={`navigation__movies link ${isMovies ? "link_active" : ""}`}
            to="/movies">
            Фильмы
          </Link>
          <Link
            className={`navigation__saved-movies link ${isSavedMovies ? "link_active" : ""}`}
            to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </div>
        <Link className="navigation__profile link" to="/profile">
          <img className="profile__icon link" alt="Аккаунт-значок" src={iconProfile}></img>
        </Link>
      </div>
  );
}

export default Navigation; 