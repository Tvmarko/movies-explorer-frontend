import React from "react";
import Form from "../Form/Form";

function Register() {
  return (
    <Form 
      title="Добро пожаловать!" 
      text="Уже зарегистрированы?" 
      link="Войти" 
      path="/signin">

      <label className="form__item">
        <p className="form__item-text">Имя</p>
        <input 
          type="text" 
          className="form__field" 
          placeholder="Татьяна" 
          required 
          />
        <p className="form__error">Что-то пошло не так...</p>
      </label>

      <label className="form__item">
        <p className="form__item-text">E-mail</p>
        <input 
          type="email" 
          className="form__field" 
          placeholder="pochta@yandex.ru" 
          required 
          />
        <p className="form__error">Что-то пошло не так...</p>
      </label>

      <label className="form__item">
        <p className="form__item-text">Пароль</p>
        <input 
          type="password" 
          className="form__field form__field_error" 
          placeholder="••••••••••••" 
          required 
          />
        <p className="form__error form__error_text">Что-то пошло не так...</p>
      </label>
      <button className="form__button" type="submit">
        Зарегистрироваться
      </button>
    </Form>
  );
}

export default Register;