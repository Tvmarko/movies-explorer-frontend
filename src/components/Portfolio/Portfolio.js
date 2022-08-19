import React from "react";
import "./Portfolio.css";
import Arrow from "../../images/Arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li>
          <a
            className="portfolio__link portfolio__link_underline link"
            href="https://github.com/Tvmarko/how-to-learn">
            Статичный сайт
            <img className="portfolio__link-arrow" src={Arrow} alt="ссылка" />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link portfolio__link_underline link"
            href="https://github.com/Tvmarko/russian-travel">
            Адаптивный сайт
            <img className="portfolio__link-arrow" src={Arrow} alt="ссылка" />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link link"
            href="https://github.com/Tvmarko/react-mesto-api-full">
            Одностраничное приложение
            <img className="portfolio__link-arrow" src={Arrow} alt="ссылка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;