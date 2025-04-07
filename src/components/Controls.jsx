import React, { useState, useEffect } from "react";
import {
  FaCogs,
  FaPlay,
  FaPause,
  FaExclamationCircle,
  FaCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Controls = ({ socket }) => {
  const [feedStatus, setFeedStatus] = useState(false);
  const [socketValue, setSocketValue] = useState(1);

  useEffect(() => {
    socket.emit("subscribe_alerta");

    socket.on("alerta", (data) => {
      setSocketValue(data);
    });
    socket.on("connected", (msg) => {
      console.log("Socket conectado:", msg);
    });
    socket.on("error_control", (error) => {
      console.log("Error de control:", error);
    });

    return () => {
      socket.off("alerta");
      socket.off("connected");
      socket.off("error_control");
    };
  }, [socket]);

  const handleToggleFeed = () => {
    const newStatus = !feedStatus;
    const mensaje = newStatus ? "encender" : "apagar";

    socket.emit("enviar_control", mensaje);
    console.log(newStatus);
    setFeedStatus(newStatus);
      Swal.fire({
        icon: "success",
        title: `${newStatus ? "Compuerta abierta" : "Compuerta cerrada"}`,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#27ae60",
      });
  };

  const isButtonDisabled = !feedStatus && !socketValue;
  return (
    <section id="controls" className="section">
      <h2>
        <FaCogs /> Controles del Sistema
      </h2>
      <div className="control-panel">
        <button
          className={`control-button ${feedStatus ? "pause" : "play"}`}
          onClick={handleToggleFeed}
          disabled={isButtonDisabled}>
          {feedStatus ? <FaPause /> : <FaPlay />}
          {feedStatus ? "Pausar" : "Activar"} Alimentación
          {isButtonDisabled && (
            <FaExclamationCircle style={{ color: "red", marginLeft: "5px" }} />
          )}
        </button>
        <div
          style={{ marginTop: "15px", display: "flex", alignItems: "center" }}>
          <FaCircle
            style={{
              color: socketValue ? "green" : "red",
              marginRight: "8px",
            }}
          />
          <span>{socketValue ? "Sin obstrucción" : "Compuerta obstruida"}</span>
        </div>
        {isButtonDisabled && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Alimentación bloqueada por obstrucción de la compuerta
          </p>
        )}
      </div>
    </section>
  );
};

export default Controls;
