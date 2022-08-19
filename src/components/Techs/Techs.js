import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__section-title-wrap">
        <h2 className="techs__section-title">Технологии</h2>
        <div className="techs__title-underline"></div>
      </div>
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__container">
        <li className="techs__cell">
          <p className="techs__item">HTML</p>
        </li>
        <li className="techs__cell">
          <p className="techs__item">CSS</p>
        </li>
        <li className="techs__cell">
          <p className="techs__item">JS</p>
        </li>
        <li className="techs__cell">
          <p className="techs__item">React</p>
        </li>
        <li className="techs__cell">
          <p className="techs__item">Git</p>
        </li>
        <li className="techs__cell">
          <p className="techs__item">Express.js</p>
        </li>
        <li className="techs__cell">
          <p className="techs__item">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;