import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTable,
  FaChartLine,
  FaCogs,
  FaSignOutAlt,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

import Overview from "../components/Overview";
import Tables from "../components/Tables";
import Sensors from "../components/Sensors";
import Controls from "../components/Controls";
import "../styles/Dashboard.css";

const socket = io("http://3.228.69.138:8090"); 

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", role: "" });
const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const userId = localStorage.getItem("id_user");
    const token = localStorage.getItem("token");

    if (userId) {
      fetch(`${apiUrl}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener el perfil");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          
          setUser(data);
        })
        .catch((error) => {
          console.error("Error obteniendo el perfil:", error);
        });
    }

    socket.on("update", (message) => {
      console.log("Mensaje recibido desde el servidor:", message);
    });

    return () => {
      socket.off("update");
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión y deberás iniciar sesión nuevamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("id_user");
        navigate("/");
      }
    });
  };

  return (
    <div className="dashboard-container">
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FaBars />
      </button>
      <nav className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Sistema Pollos</h2>
        </div>
        <ul className="nav-list">
          <li>
            <Link
              to="/dashboard"
              className={`nav-item ${
                activeSection === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveSection("overview")}>
              <FaHome /> Inicio
            </Link>
          </li>
          <li>
            <a
              href="#tables"
              className={`nav-item ${
                activeSection === "tables" ? "active" : ""
              }`}
              onClick={() => setActiveSection("tables")}>
              <FaTable /> Tablas
            </a>
          </li>
          <li>
            <a
              href="#sensors"
              className={`nav-item ${
                activeSection === "sensors" ? "active" : ""
              }`}
              onClick={() => setActiveSection("sensors")}>
              <FaChartLine /> Sensores
            </a>
          </li>
          <li>
            <a
              href="#controls"
              className={`nav-item ${
                activeSection === "controls" ? "active" : ""
              }`}
              onClick={() => setActiveSection("controls")}>
              <FaCogs /> Controles
            </a>
          </li>
          <li className="nav-item-bottom">
            <a className="nav-item" onClick={handleLogout}>
              <FaSignOutAlt /> Cerrar Sesión
            </a>
          </li>
          <li className="nav-item-bottom">
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(!isModalOpen);
              }}>
              <FaUser /> Perfil
            </a>
          </li>
        </ul>
      </nav>

      <main className={`main-content ${isSidebarOpen ? "open" : "closed"}`}>
        {activeSection === "overview" && <Overview />}
        {activeSection === "tables" && <Tables />}
        {activeSection === "sensors" && <Sensors />}
        {activeSection === "controls" && <Controls />}
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Perfil del Usuario</h3>
            <div className="modal-content">
              <p>
                <strong>Nombre:</strong> {user.data.name}
              </p>
              <p>
                <strong>Correo:</strong> {user.data.email}
              </p>
              <p>
                <strong>Rol:</strong> Abministrador
              </p>
            </div>
            <button
              className="modal-close-button"
              onClick={() => setIsModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
