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

import Overview from "../components/Overview";
import Tables from "../components/Tables";
import Sensors from "../components/Sensors";
import Controls from "../components/Controls";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [name] = useState("");
  const [email] = useState("");

  useEffect(() => {
    const newSocket = io("http://3.228.69.138:8090");

    newSocket.on("connect", () => {
      console.log("✅ Conectado a Socket.IO");

      newSocket.emit("subscribe_alerta");
      newSocket.emit("subscribe_control");
    });

    newSocket.on("subscribed", (msg) => {
      console.log("🟢 Subscrito:", msg);
    });

    newSocket.on("disconnect", () => {
      console.warn("🔌 Desconectado de Socket.IO");
    });

    newSocket.on("error", (err) => {
      console.error("❌ Error de socket:", err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
            <Link
              className="nav-item"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("id_user");
                navigate("/");
              }}>
              <FaSignOutAlt /> Cerrar Sesión
            </Link>
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
                <strong>Nombre:</strong> {name}
              </p>
              <p>
                <strong>Correo:</strong> {email}
              </p>
              <p>
                <strong>Rol:</strong> Administrador
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
