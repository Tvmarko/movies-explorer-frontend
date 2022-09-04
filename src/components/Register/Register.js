import React, { useState,  useEffect } from "react";
import Form from "../Form/Form";

function Register({handleRegister, message}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  function handleNameChange(evt) {
    const validName = /^[A-Za-zА-Яа-яЁё /s -]+$/.test(evt.target.value);
    if (evt.target.value.length < 2) {
      setNameError("Введите не менее 2 символов");
    } else if (evt.target.value.length > 30) {
      setNameError("Введите не более 30 символов");
    } else if (!validName) {
      setNameError("Используйте латиницу, кириллицу, пробел или дефис");
    } else {
      setNameError("");
    }
    setName(evt.target.value);
  }
  
  function handleEmailChange(evt) {
    const validEmail = /^([^ ]+@[^ ]+\.[a-z]{2,6}|)$/i.test(evt.target.value);
    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(evt.target.value);
  }
        
  function handlePasswordChange(evt) {
    if (evt.target.value.length < 8) {
      setPasswordError("Длина пароля должна быть не менее 8 символов");
    } else {
      setPasswordError("");
    }
    setPassword(evt.target.value);
    }
    
    
  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    handleRegister(name, email, password);
  }
   
  useEffect(() => {
    if ( name && email && password && !nameError && !emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);
    
  return (
    <Form 
      title="Добро пожаловать!"
      name="register" 
      text="Уже зарегистрированы?" 
      link="Войти" 
      path="/signin"
      onSubmit={handleRegisterSubmit}>

      <label className="form__item">
        <p className="form__item-text">Имя</p>
        <input 
          type="text" 
          className={`form__field ${nameError ? "form__text-error" : ""}`} 
          id="name-input"
          name="name"
          value={name}
          placeholder="Name"
          minLength="2" 
          maxLength="20"
          required
          onChange={handleNameChange}
          />
          <span id="name-input-error" className="form__text-error">
            {nameError}
          </span>
      </label>

      <label className="form__item">
        <p className="form__item-text">E-mail</p>
        <input 
          className={`form__field ${emailError ? "form__text-error" : ""}`} 
          id="email-input"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          minLength="6" 
          maxLength="30"
          required
          onChange={handleEmailChange}
          />
          <span id="name-input-error" className="form__text-error">
            {emailError}
          </span>
      </label>

      <label className="form__item">
        <p className="form__item-text">Пароль</p>
        <input 
            className={`form__field ${passwordError ? "form__text-error" : ""}`}
            id="password-input"
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            minLength="8" 
            maxLength="12"
            required 
            onChange={handlePasswordChange}
          />
          <span id="name-input-error" className="form__text-error">
            {passwordError}
          </span>
      </label>

      <div className="form__text-error form__response">
            {message}
      </div>
      <button className={`form__button ${!formValid  ? "form__button_inactive" : ""}`} 
      type="submit"
      disabled={!formValid}>
        Зарегистрироваться
      </button>
    </Form>
  );
}

export default Register;