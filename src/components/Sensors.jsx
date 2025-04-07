import React, { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import FeedLevelChart from "./FeedLevelChart";
import FeedDispensationChart from "./FeedDispensationChart";
import "../styles/Graficas.css";

const Sensors = ({ socket }) => {
  const [peso, setPeso] = useState(0);
  const [estado, setEstado] = useState("presentes");

  useEffect(() => {
    socket.emit("subscribe_estatus");
    socket.emit("subscribe_peso");

    socket.on("peso", (data) => {
      setPeso(Number(data));
    });

    socket.on("estatus", (data) => {
      setEstado(data);
    });

    socket.on("connected", (msg) => {
      console.log("Socket conectado:", msg);
    });

    socket.on("error_control", (error) => {
      console.log("Error de control:", error);
    });

    return () => {
      socket.off("peso");
      socket.off("estado");
      socket.off("connected");
      socket.off("error_control");
    };
  }, [socket]);

  const nivelAlimento = ((peso / 1000) * 100).toFixed(1); 
  const pesoActual = (peso / 1000).toFixed(1); 

  return (
    <section id="sensors" className="section">
      <h2>
        <FaChartLine /> Estado de Sensores
      </h2>
      <div className="sensor-grid">
        <div className="sensor-card">
          <h3>Nivel Alimento</h3>
          <p>
            {nivelAlimento}% <span className="sensor-value">✓</span>
          </p>
        </div>
        <div className="sensor-card">
          <h3>Peso Actual</h3>
          <p>
            {pesoActual} kg <span className="sensor-value">✓</span>
          </p>
        </div>
        <div className="sensor-card">
          <h3>Presencia</h3>
          <p>
            {estado} <span className="sensor-value">✓</span>
          </p>
        </div>
      </div>
      <FeedLevelChart nivelAlimento={Number(nivelAlimento)} />
      <FeedDispensationChart pesoActual={Number(pesoActual)} />
    </section>
  );
};

export default Sensors;
