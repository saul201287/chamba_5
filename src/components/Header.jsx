import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1>Sistema Automatizado de Alimentación de Pollos</h1>
      <p>Económico, eficiente y monitoreado remotamente</p>
      <div className="auth-buttons">
        <Link to="/login" className="auth-button login-button">
          Login
        </Link>
        <Link to="/register" className="auth-button register-button">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
