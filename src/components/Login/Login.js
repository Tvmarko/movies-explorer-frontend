import React from "react";
import Form from "../Form/Form";

function Login() {
  return (
    <Form 
      title="Рады видеть!" 
      text="Ещё не зарегистрированы?" 
      link="Регистрация" 
      path="/signup">

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
          required 
          />
        <p className="form__error form__error-text ">Что-то пошло не так...</p>
      </label>
      <button className="form__button form__button_padding" type="submit">
        Войти
      </button>
    </Form>
  );
}

export default Login 