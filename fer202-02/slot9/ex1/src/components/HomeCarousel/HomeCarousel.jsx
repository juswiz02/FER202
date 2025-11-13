import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import "./HomeCarousel.css";

function HomeCarousel({ slides }) {
  return (
    <Carousel>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx} interval={3000}>
          <img
            className="d-block w-100"
            src={slide.imgSrc}
            alt={slide.title}
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <Badge bg="info">{slide.genre}</Badge>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
