import React, { useState } from "react";
import Form from "../Form/Form";


function Login({handleLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function handleEmailChange(evt) {
      setEmail(evt.target.value);
      }
      
    function handlePasswordChange(evt) {
      setPassword(evt.target.value);
      }
      
    function handleLoginSubmit(evt) {
      evt.preventDefault();
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
            className="form__field"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            minLength="8"
            maxLength="30"
            onChange={handleEmailChange}
            required 
          />
        <p className="form__error"></p>
      </label>

      <label className="form__item">
        <p className="form__item-text">Пароль</p>
        <input 
          className="form__field"
          type="password"
           name="password"
          value={password}
          placeholder="Пароль"
          minLength="8"
          maxLength="30"
          onChange={handlePasswordChange}
          required 
          />
        <p className="form__error"></p>
      </label>

      <button 
      className="form__button form__button_login" type="submit">
        Войти
      </button>
    </Form>
  );
}

export default Login 