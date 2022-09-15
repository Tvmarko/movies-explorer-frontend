import React from "react";
import "./Promo.css";
import promoLogo from "../../images/promo-logo.svg";
import NavTab from "../NavTab/NavTab";

function Promo() {
    return (
      <section className="promo">
        <img src={promoLogo} alt="логотип" className="promo__logo" />
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab />
      </section>
    );
  }

export default Promo 