import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import granjero from "../assets/granjero.png";
import Swal from "sweetalert2";
import "../styles/LoginRegister.css";

const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Respuesta no es JSON:", text);
        throw new Error("La respuesta del servidor no es un JSON válido");
      }

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(data.message || "El correo ya está registrado");
        }
        if (response.status === 500) {
          throw new Error(
            "Error interno del servidor. Intenta de nuevo más tarde."
          );
        }
        throw new Error(data.message || "Error al registrar el usuario");
      }

      await Swal.fire({
        icon: "success",
        title: "¡Registro Exitoso!",
        text: "Usuario registrado exitosamente. Serás redirigido al inicio de sesión.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#27ae60", 
      });

      navigate("/login");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Error al conectar con el servidor",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e74c3c", 
      });
      console.error("Error de registro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="home-icon">
        <FaHome />
      </Link>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="submit-button submit-button-register"
              disabled={loading}>
              {loading ? "Procesando..." : "Registrarse"}
            </button>
          </form>
          <p className="auth-link">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
