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
            href="https://github.com/Tvmarko/how-to-learn" target="_blank" rel="noopener noreferrer"  >
            Статичный сайт
            <img className="portfolio__link-arrow" src={Arrow} alt="ссылка" />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link portfolio__link_underline link"
            href="https://github.com/Tvmarko/russian-travel" target="_blank" rel="noopener noreferrer" >
            Адаптивный сайт
            <img className="portfolio__link-arrow" src={Arrow} alt="ссылка" />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link link"
            href="https://github.com/Tvmarko/react-mesto-api-full" target="_blank" rel="noopener noreferrer" >
            Одностраничное приложение
            <img className="portfolio__link-arrow" src={Arrow} alt="ссылка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;