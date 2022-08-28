import React, { useState } from "react";
import Form from "../Form/Form";

function Register({handleRegister}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
    }
  
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    }
    
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    }
    
  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    handleRegister(name, email, password);
  }
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
          className="form__field" 
          name="name"
          value={name}
          placeholder="Name"
          minLength="2" 
          maxLength="20"
          required
          onChange={handleChangeName}
          />
        <p className="form__error"></p>
      </label>

      <label className="form__item">
        <p className="form__item-text">E-mail</p>
        <input 
          className="form__field" 
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          minLength="6" 
          maxLength="30"
          required
          onChange={handleChangeEmail}
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
            minLength="6" 
            maxLength="12"
            required 
            onChange={handleChangePassword}
          />
        <p className="form__error form__error_text"></p>
      </label>
      <button className="form__button" type="submit">
        Зарегистрироваться
      </button>
    </Form>
  );
}

export default Register;