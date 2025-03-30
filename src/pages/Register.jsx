import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import granjero from "../assets/granjero.png";
import "../styles/LoginRegister.css";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registrando usuario...");
  };

  return (
    <>
      <Link to="/" className="home-icon">
        <FaHome />
      </Link>
      <div className="auth-page">
        <div className="auth-container auth-container-register">
          <div className="auth-image-column">
            <img src={granjero} alt="Granjero" className="auth-image" />
          </div>
          <div className="auth-form-column auth-form-column-register">
            <h2>Registrarse</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
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
              <button
                type="submit"
                className="submit-button submit-button-register">
                Registrarse
              </button>
            </form>
            <p className="auth-link">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
