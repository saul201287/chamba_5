import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import imgPollo from "../assets/polloloco.png";
import "../styles/LoginRegister.css";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Función para decodificar el token JWT
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error al decodificar el token:", e);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/user/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        if (response.status === 404) {
          throw new Error("Usuario y/o contraseña inválida");
        }
        throw new Error(data.message || "Error al iniciar sesión");
      }

      const token = data.data.token;
      console.log("Token recibido:", token);

      const decodedToken = decodeJwt(token);
      console.log("Token decodificado:", decodedToken);

      localStorage.setItem("token", token);
      localStorage.setItem("id_user", JSON.stringify(decodedToken.client_id));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor");
      console.error("Error de inicio de sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        <Link to="/" className="home-icon">
          <FaHome />
        </Link>
        <div className="auth-container">
          <div className="auth-form-column">
            <h2>Iniciar Sesión</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">Contraseña</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={toggleShowPassword}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={loading}>
                {loading ? "Procesando..." : "Iniciar Sesión"}
              </button>
            </form>
            <div className="auth-link">
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </div>
          </div>
          <div className="auth-image-column">
            <img src={imgPollo} alt="Logo" className="auth-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
