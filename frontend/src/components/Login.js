import React from "react";

const Login = ({onLogin}) => {
  const [password, setPassword] = React.useState("");

  function handlePassChange(e){
    setPassword(e.target.value);
  }

  const [email, setEmail] = React.useState("");

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    onLogin(password, email);
  }

  return (
    <section className="login">
      <h1 className="login__header">Вход</h1>
      <form action="#" className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login__input"
          id="email-input"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="login__input"
          id="password-input"
          onChange={handlePassChange}
          required
        />

        <button type="submit" className="login__submit-button">
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
