import React from "react";
import Carousel from "react-bootstrap/Carousel";

import carousel1 from "../assets/img/carousel-1.jpg";
import carousel2 from "../assets/img/carousel-2.jpg";
import hero3 from "../assets/img/hero.png";

const slides = [
  {
    src: carousel1,
    alt: "Delicious buffet spread",
    captionTitle: "Book CaterServ For Your Dream Event",
    captionText: "Experience world-class catering and professional service for any occasion.",
    href: "/Booking"
  },
  {
    src: carousel2,
    alt: "Beautiful wedding decor",
    captionTitle: "Weddings, Corporate & More",
    captionText: "Let us handle the food, you focus on your celebration.",
    href: "/About"
  },
  {
    src: hero3,
    alt: "Chef at work",
    captionTitle: "Trusted by 200+ Clients",
    captionText: "We deliver taste and memories.",
    href: "/"
  }
];

export default function HeroCarousel() {
  return (
    <div className="container py-3">
      <Carousel fade interval={3000}>
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx} className="carousel-item-custom">
            {/* Image */}
            {slide.href ? (
              <a href={slide.href}>
                <img
                  src={slide.src}
                  className="d-block w-100"
                  alt={slide.alt}
                  style={{ objectFit: "cover", maxHeight: 500, borderRadius: "1.5rem" }}
                />
              </a>
            ) : (
              <img
                src={slide.src}
                className="d-block w-100"
                alt={slide.alt}
                style={{ objectFit: "cover", maxHeight: 500, borderRadius: "1.5rem" }}
              />
            )}
            {/* Overlay */}
            <div className="carousel-img-overlay"></div>
            {/* Caption */}
            {(slide.captionTitle || slide.captionText) && (
              <Carousel.Caption>
                <h1 className="display-4" style={{ color: "#000000ff" }}>{slide.captionTitle}</h1>
                <p className="lead" style={{ color: "#000000ff" }}>{slide.captionText}</p>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
