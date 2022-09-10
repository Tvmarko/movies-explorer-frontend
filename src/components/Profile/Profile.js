import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile({ loggedIn, onSignOut, editProfile, serverError, setServerError }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [changedName, setChangedName] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [isInputInactive, setIsInputInactive] = useState(true);
  
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (nameError || emailError ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name, email, currentUser.name, currentUser.email]);

  function handleNameChange(evt) {
    setChangedName(true);
    const validName = /^[A-Za-zА-Яа-яЁё /s -]+$/.test(evt.target.value);
    if (evt.target.value.length < 2) {
      setNameError("Введите не менее 2 символов");
    } else if (evt.target.value.length > 30) {
      setNameError("Введите не более 30 символов");
    } else if (!validName) {
      setNameError("Разрешено использовать латиницу, кириллицу, пробел или дефис");
    } else {
      setNameError("");
    }
    setName(evt.target.value);
    setServerError({
      failed: false,
      message: "",
    });
  }
  
  function handleEmailChange(evt) {
    setChangedEmail(true);
    const validEmail = /^([^ ]+@[^ ]+\.[a-z]{2,6}|)$/i.test(evt.target.value);
    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(evt.target.value);
  }

  function handleRedactClick() {
    setIsInputInactive(!isInputInactive);
  }

  function handleProfileSubmit(evt) {
    evt.preventDefault();
    editProfile({name, email});
    handleRedactClick();
    evt.target.reset();
  }

 return (
  <>
  <Header loggedIn={loggedIn} />
    <form className="profile" onSubmit={handleProfileSubmit}>
      <div className="profile__form" >
        <h3 className="profile__username">{`Привет, ${currentUser.name}!`}</h3>
        <div className="profile__form-fields" onSubmit={handleProfileSubmit}>
          <div className="profile__input-container">
            <p className="profile__text">Имя</p>
            <input 
            className={`profile__input ${changedName && nameError ? "profile__input-error" : ""}`}
            value={name || ""}
            onChange={handleNameChange}
            placeholder="Имя" 
            type="text" 
            name="name"
            id="name"
            minLength="2" 
            maxLength="30" 
            required 
            disabled={!isInputInactive}/>
          </div>
          <span className="profile__input-error profile_span">{nameError}</span>
          <div className="profile__input-container">
            <p className="profile__text">E-mail</p>
            <input 
            className={`profile__input ${changedEmail && emailError ? "profile__input-error" : ""}`}
            value={email || ""}
            onChange={handleEmailChange}
            placeholder="Email" 
            type="email" 
            name="email"
            id="email" 
            minLength="2" 
            maxLength="30" 
            required 
            disabled={!isInputInactive}/>
          </div>
          <span className="profile__input-error">{emailError}</span>
        </div>
      </div>

      {serverError.failed && (
            <span className="form__response">
              {serverError.message}
            </span>
          )}

        <button 
        className={`profile__button btn ${!formValid  ? "profile__button_inactive btn" : ""}`}
        type="submit"
        disabled={!formValid}
        onClick={handleRedactClick}>
        Редактировать
        </button>
        <Link to="/" className="profile__sign-out btn link" onClick={onSignOut} type="button">Выйти из аккаунта</Link>
    </form>
    </>
  );
};

export default Profile;