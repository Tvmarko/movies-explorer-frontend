import React from "react";
import "./AboutProject.css";

function AboutProject() {
return (
  <section className="about-project">
    <h2 className="about-project__title">О проекте</h2>
    <div className="about-project__info">
      <div className="about-project__info-container">
        <div className="about-project__info-section">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__info-section">
          <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
    </div>
    <div className="about-project__time">
      <div className="about-project__time-backend">
        <div className="about-project__time-backend-item about-project__time-backend-item_1">1 неделя</div>
        <div className="about-project__time-backend-item about-project__time-item_2">Back-end</div>
      </div>
      <div className="about-project__time-frontend">
        <div className="about-project__time-frontend-item about-project__time-frontend-item_1">4 недели</div>
        <div className="about-project__time-frontend-item about-project__time-item_2">Front-end</div>
      </div>
    </div>
  </section>
  )
}

export default AboutProject; 