import React, { useState } from "react";
import { FaCogs, FaPlay, FaPause } from "react-icons/fa";

const Controls = () => {
  const [feedStatus, setFeedStatus] = useState(false);

  const handleToggleFeed = () => {
    setFeedStatus(!feedStatus);
    alert(`Dispensador ${feedStatus ? "detenido" : "activado"}`);
  };

  return (
    <section id="controls" className="section">
      <h2>
        <FaCogs /> Controles del Sistema
      </h2>
      <div className="control-panel">
        <button
          className={`control-button ${feedStatus ? "pause" : "play"}`}
          onClick={handleToggleFeed}>
          {feedStatus ? <FaPause /> : <FaPlay />}{" "}
          {feedStatus ? "Pausar" : "Activar"} Alimentación
        </button>
        <div className="control-slider">
          <label>Cantidad de Alimento (%):</label>
          <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="slider"
            onChange={() => alert("Ajustando cantidad...")}
          />
          <span>50%</span>
        </div>
      </div>
    </section>
  );
};

export default Controls;
