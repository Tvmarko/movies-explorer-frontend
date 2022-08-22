import React from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const isMain = useRouteMatch({ path: "/", exact: true });

  return (
    <header className={`header ${isMain ? "header_dark" : ""}`}>
      <Link to="/"> 
          <div className={`header__logo ${isMain ? "logo": "logo2"}`}></div>
        </Link>
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <Link className="header__register link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__login link" to="/signin">
              <button className="header__button btn" type="button">Войти</button>
            </Link>
          </div>
        </Route>
        <Route path={["/movies", "/saved-movies", "/profile"]}>
          <Navigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}  />
        </Route>
      </Switch>
    </header>
  );
}

export default Header;