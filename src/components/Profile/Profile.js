import React from "react";
import "./Profile.css";
import {Link} from "react-router-dom";

const Profile = () => {

  return (
    <section className="profile">
      <form className="profile__form">
        <h3 className="profile__username">Привет, Татьяна!</h3>
        <div className="profile__form-fields">
          <p className="profile__text">Имя</p>
          <div className="profile__input profile__input_name">
            <input className="profile__info" placeholder="Татьяна" required />
          </div>
          <div className="profile__input profile__input_email">
            <input className="profile__info" placeholder="pochta@pochta.ru" required />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <Link to="/profile" className="profile__button btn">Редактировать</Link>
        <Link to="/" className="profile__link link">Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default Profile;