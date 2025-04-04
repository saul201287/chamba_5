import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ImageSection.css"
import img1 from "../assets/fotor-ai-2025032722145.jpg";
import img2 from "../assets/fotor-ai-2025032722210.jpg";
import img3 from "../assets/pp.webp";

const images = [
  {
    src: img1,
    alt: "Sistema automatizado",
    caption: "Sistema de dispensación inteligente",
  },
  {
    src: img2,
    alt: "Pollos siendo alimentados",
    caption: "Alimentación eficiente y económica",
  },
  {
    src: img3,
    alt: "Pollos felices",
    caption: "Cuidado óptimo para tus pollos",
  },
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="carousel-slide">
            <img src={img.src} alt={img.alt} className="carousel-image" />
            <p className="carousel-caption">{img.caption}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
