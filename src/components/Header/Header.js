import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({loggedIn}) {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const isMain = useRouteMatch({ path: "/", exact: true });

  return (
    <header className={`header ${isMain  ? "header_dark" : ""}`}>
        <Link to="/"> 
          <div className={`header__logo ${isMain ? "logo": "logo2"}`}></div>
        </Link>
        {loggedIn ? (
          <Navigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          ) : (
           <div className="header__container">
            <Link className="header__register link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__login link" to="/signin">
              <button className="header__button btn" type="button">Войти</button>
            </Link>
          </div>
          )}
    </header>
         )
    }

export default Header;