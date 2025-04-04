import React, { useState } from "react";
import { FaTable } from "react-icons/fa";

const Tables = () => {
  const [formData, setFormData] = useState({
    minute: "30",
    hour: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Enviando JSON:", formData);

    // Aquí podrías hacer un fetch:
    // fetch('/api/ruta', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <section id="tables" className="section">
      <h2>
        <FaTable /> Datos Históricos
      </h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Peso (kg)</th>
            <th>Pollos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30/03/2025</td>
            <td>5.2</td>
            <td>12</td>
            <td>Activo</td>
          </tr>
          <tr>
            <td>29/03/2025</td>
            <td>5.0</td>
            <td>11</td>
            <td>Activo</td>
          </tr>
          <tr>
            <td>28/03/2025</td>
            <td>4.8</td>
            <td>10</td>
            <td>Pausado</td>
          </tr>
        </tbody>
      </table>

      {/* Formulario para JSON */}
      <div className="form-container">
        <h3>Configurar Intervalo</h3>
        <form onSubmit={handleSubmit} className="config-form">
          <label>
            Minuto:
            <input
              type="number"
              name="minute"
              value={formData.minute}
              onChange={handleChange}
              min="0"
              max="59"
              required
            />
          </label>
          <label>
            Hora:
            <input
              type="number"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
              min="0"
              max="23"
              required
            />
          </label>
          <button type="submit">Guardar Configuración</button>
        </form>
      </div>
    </section>
  );
};

export default Tables;
