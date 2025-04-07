import React, { useState, useEffect } from "react";
import { FaTable, FaTrash, FaPlus } from "react-icons/fa"; 
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Tables = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(false); 
        setFormData({ minute: "30", hour: "1" }); 
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${apiUrl}/horario/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (result.success) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El horario ha sido eliminado correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
        } else {
          throw new Error(result.message || "Error al eliminar");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar el horario.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    } else {
      console.log("Eliminación cancelada por el usuario");
    }
  };

  return (
    <section id="tables" className="section">
      <h2>
        <FaTable /> Horarios Registrados
      </h2>

      <div className="table-header">
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Agregar Horario
        </button>
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hora</th>
              <th>Minuto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.hour}</td>
                  <td>{item.minute}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                      title="Eliminar">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
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
              <div className="modal-buttons">
                <button type="submit">Guardar Configuración</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tables;
