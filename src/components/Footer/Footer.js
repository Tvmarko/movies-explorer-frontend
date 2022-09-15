import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__links-container">
        <p className="footer__year">&copy; 2022</p>
        <ul className="footer__links">
          <li>
            <a className="footer__link link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link link" href="https://github.com/tvmarko">GitHub</a>
          </li>
          <li>
            <a className="footer__link link" href="https://www.instagram.com/tvmarko/">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;