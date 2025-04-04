import React from "react";
import { FaChartLine } from "react-icons/fa";

const Sensors = () => {
  return (
    <section id="sensors" className="section">
      <h2>
        <FaChartLine /> Estado de Sensores
      </h2>
      <div className="sensor-grid">
        <div className="sensor-card">
          <h3>Nivel Alimento</h3>
          <p>
            75% <span className="sensor-value">✓</span>
          </p>
        </div>
        <div className="sensor-card">
          <h3>Peso Actual</h3>
          <p>
            5.2 kg <span className="sensor-value">✓</span>
          </p>
        </div>
        <div className="sensor-card">
          <h3>Presencia</h3>
          <p>
            12 Pollos <span className="sensor-value">✓</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sensors;
