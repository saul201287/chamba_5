import React from "react";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import ImageSection from "../components/ImageSection";

const Home = () => {
  const features = [
    {
      title: "Dispensación Programada",
      description:
        "El ESP32 activa el mecanismo a horas establecidas para alimentar a los pollos.",
    },
    {
      title: "Verificación Previa",
      description:
        "Revisa alimento (sensor de peso), presencia de pollos (ultrasónico) y obstrucciones (infrarrojo).",
    },
    {
      title: "Cierre Automático",
      description:
        "El dispensador se cierra tras la alimentación para mantener la higiene.",
    },
    {
      title: "Monitoreo Remoto",
      description:
        "Envía datos por MQTT para supervisión en tiempo real desde celular o PC.",
    },
  ];

  return (
    <div className="home">
      <Header />
      <main>
        <section className="features">
          <h2 style={{marginTop:"2rem"}}>Funcionamiento General</h2>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
        <ImageSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
