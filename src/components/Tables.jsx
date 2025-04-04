import React, { useState, useEffect } from "react";
import { FaTable } from "react-icons/fa";
import Swal from "sweetalert2"; 
import "sweetalert2/dist/sweetalert2.min.css";

const Tables = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    minute: "30",
    hour: "1",
  });

  const fetchData = () => {
    fetch(`${apiUrl}/horario/`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          console.error("Error al obtener datos:", json.message);
        }
      })
      .catch((error) => console.error("Error en fetch:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Enviando JSON:", formData);

    try {
      const response = await fetch(`${apiUrl}/horario/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "¡Guardado!",
          text: "La configuración se guardó correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchData();
      } else {
        throw new Error(result.message || "Error al guardar");
      }
    } catch (error) {
      console.error("Error al enviar:", error);

      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar la configuración.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <section id="tables" className="section">
      <h2>
        <FaTable /> Horarios Registrados
      </h2>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hora</th>
              <th>Minuto</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.hour}</td>
                  <td>{item.minute}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

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
