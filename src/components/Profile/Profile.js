import React from "react";
import "./Profile.css";
import {Link} from "react-router-dom";

function Profile() {

  function handleSubmit(evt) {
    evt.preventDefault();
  }
  
  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__username">Привет, Татьяна!</h3>
        <div className="profile__form-fields">
          <div className="profile__input-container">
            <p className="profile__text">Имя</p>
            <input className="profile__input" placeholder="Татьяна" type="text" name="name" minLength="1" maxLength="20" required />
            <span className="profile__input-error"></span>
          </div>
          <div className="profile__input-container">
            <p className="profile__text">E-mail</p>
            <input className="profile__input profile__input_email" placeholder="pochta@pochta.ru" type="email" name="email" minLength="1" maxLength="30" required />
          </div>
        </div>
      </form>
        <Link to="/profile" className="profile__button btn" type="submit">Редактировать</Link>
        <Link to="/" className="profile__sign-out btn" type="button">Выйти из аккаунта</Link>
    </section>
  );
};

export default Profile;