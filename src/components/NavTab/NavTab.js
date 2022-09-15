import React from "react";
import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab() {
  return (
    <section className="navtab">
      <nav className="navtab__container">
        <ul className="navtab__list">
          <li className="navtab__list-item">
            <Link className="navtab__link" to="#about-project">О проекте</Link>
          </li>
          <li>
            <Link className="navtab__link" to="#techs">Технологии</Link>
          </li>
          <li>
            <Link className="navtab__link" to="#student">Студент</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab; 