import React, { useState, useEffect } from "react";
import Form from "../Form/Form";


function Login({handleLogin, loggedIn, message}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formValid, setFormValid] = useState(false);
  
    useEffect(() => {
      if (loggedIn) {
        setEmail("");
        setPassword("");
      }
    }, [loggedIn]);
    
    useEffect(() => {
      if (email && password && !emailError && !passwordError) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }, [email, password, emailError, passwordError]);
    
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
      
    function handleLoginSubmit(evt) {
      evt.preventDefault();
      if (!email || !password) {
        return;
      }
      handleLogin(email, password);
    }

  return (
    <Form 
      title="Рады видеть!"
      name="login" 
      text="Ещё не зарегистрированы?" 
      link="Регистрация" 
      path="/signup"
      onSubmit={handleLoginSubmit}> 

    <label className="form__item">
        <p className="form__item-text">E-mail</p>
        <input 
            className={`form__field ${emailError ? "form__text-error" : ""}`}
            id="email-input"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            minLength="8"
            maxLength="30"
            onChange={handleEmailChange}
            required 
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
          maxLength="30"
          onChange={handlePasswordChange}
          required 
          />
          <span id="name-input-error" className="form__text-error">
            {passwordError}
          </span>
      </label>
      
      <div className="form__text-error form__response">
            {message}
      </div>
      <button 
       className={`form__button form__button_login ${!formValid  ? "form__button_inactive" : ""}`}
       type="submit"
       disabled={!formValid}>
        Войти
      </button>
    </Form>
  );
}

export default Login 