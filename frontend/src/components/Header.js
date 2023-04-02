import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import logoPath from "../images/header-logo.svg";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип Место" className="header__logo" />
      <div className="header__page-info">
        <Switch>
          <Route path="/mesto">
            <p className="header__email-info">{email}</p>
            <button className="header__logout" onClick={onLogout}>Выйти</button>
          </Route>
          <Route path="/sign-up">
            <Link className="header__redirect-link" to="/sign-in">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__redirect-link" to="/sign-up">Регистрация</Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
