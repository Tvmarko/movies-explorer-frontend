import React from "react";
import { Link } from "react-router-dom"
import logo from "../../images/logo3.svg"
import "./Form.css"

function Form({ title, children, text, path, link }) {

    return (
        <section className="form">
        <div className="form__container">
          <Link to="/" className="form__link link">
            <img className="form__logo" src={logo} alt="Логотип"></img>
          </Link>
          <h2 className="form__title">{title}</h2>
          <form className="form__inputs">
            <div className="form__items"> {children} </div>
          </form>
          <p className="form__text">
            {text}
            <Link to={path} className="form__link link">
              {link}
            </Link>
          </p>
        </div>
      </section>
    );
  }
  

  export default Form;
  