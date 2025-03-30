import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "../styles/ImageSection.css"
import img1 from "../assets/fotor-ai-2025032722145.jpg";
import img2 from "../assets/fotor-ai-2025032722210.jpg";
import img3 from "../assets/pp.webp";

const items = [
  {
    src: img1,
    altText: "Sistema automatizado",
    caption: "Sistema de dispensación inteligente",
  },
  {
    src: img2,
    altText: "Pollos siendo alimentados",
    caption: "Alimentación eficiente y económica",
  },
  {
    src: img3,
    altText: "Pollos felices",
    caption: "Cuidado óptimo para tus pollos",
  },
];

const ImageSection = () => {
  return (
    <section className="image-section">
      <h2>Nuestro Sistema en Acción</h2>
      <div className="carousel-wrapper">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={5000}
          className="custom-carousel">
          {items.map((item, index) => (
            <div key={index}>
              <img src={item.src} alt={item.altText} className="carousel-img" />
              <p className="legend">{item.caption}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ImageSection;
