import React, { useEffect, useState } from "react";
import { FaSeedling } from "react-icons/fa";

const Overview = ({ socket }) => {
  const [peso, setPeso] = useState(0);
  const [estado, setEstado] = useState("apagado"); // Inicia como "apagado"
  const [estatus, setEstatus] = useState("presentes");
  const [timeoutId, setTimeoutId] = useState(null); // Para manejar el temporizador

  useEffect(() => {
    socket.emit("subscribe_estatus");
    socket.emit("subscribe_estado");
    socket.emit("subscribe_peso");

    socket.on("peso", (data) => {
      setPeso(Number(data));
    });

    socket.on("estatus", (data) => {
      setEstatus(data);
    });

    socket.on("estado", (data) => {
      console.log("Mensaje recibido (estado):", data);
      setEstado(data);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        console.log(
          "No se recibieron datos en 4 segundos, cambiando estado a 'apagado'"
        );
        setEstado("apagado");
      }, 4000); 
      setTimeoutId(newTimeoutId);
    });

    socket.on("connected", (msg) => {
      console.log("Socket conectado:", msg);
    });

    socket.on("error_control", (error) => {
      console.log("Error de control:", error);
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      socket.off("peso");
      socket.off("estado");
      socket.off("estatus");
      socket.off("connected");
      socket.off("error_control");
    };
  }, [socket, timeoutId]);

  const nivelAlimento = ((peso / 1000) * 100).toFixed(1);

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
          <p>{nivelAlimento}%</p>
        </div>
        <div className="stat-card">
          <h3>Pollos</h3>
          <p>{estatus}</p>
        </div>
        <div className="stat-card">
          <h3>Estado del sistema</h3>
          <p>{estado}</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
