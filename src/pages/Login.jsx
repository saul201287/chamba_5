import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Importar el ícono de Home
import imgPollo from "../assets/polloloco.png";
import "../styles/LoginRegister.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el login (por ejemplo, una llamada a una API)
    alert("Iniciando sesión...");
  };

  return (
    <>
      <Link to="/" className="home-icon">
        <FaHome />
      </Link>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-image-column">
            <img src={imgPollo} alt="Pollo Loco" className="auth-image" />
          </div>
          <div className="auth-form-column">
            <h2>Iniciar Sesión</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Iniciar Sesión
              </button>
            </form>
            <p className="auth-link">
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
