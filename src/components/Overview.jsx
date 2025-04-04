import React from "react";
import { FaSeedling } from "react-icons/fa";

const Overview = () => {
  return (
    <section id="overview" className="section">
      <h1>
        <FaSeedling /> Bienvenido al DASHBOARD
      </h1>
      <p className="overview-text">
        Monitorea y controla el sistema de alimentación de pollos en tiempo
        real. Aquí tienes un resumen general de los datos y controles
        disponibles.
      </p>
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Alimento</h3>
          <p>75%</p>
        </div>
        <div className="stat-card">
          <h3>Pollos</h3>
          <p>12 Detectados</p>
        </div>
        <div className="stat-card">
          <h3>Estado</h3>
          <p>Activo</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
