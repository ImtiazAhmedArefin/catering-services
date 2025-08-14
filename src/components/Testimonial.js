import React from 'react';
import Slider from "react-slick";

const TestimonialSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      id: 1,
      image: "/assets/img/testimonial-1.jpg",
      name: "Person Name",
      profession: "Profession",
      content: "Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      rating: 5
    },
    {
      id: 2,
      image: "/assets/img/testimonial-2.jpg",
      name: "Person Name",
      profession: "Profession",
      content: "Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      rating: 5
    },
    {
      id: 3,
      image: "/assets/img/testimonial-3.jpg",
      name: "Person Name",
      profession: "Profession",
      content: "Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      rating: 5
    },
    {
      id: 4,
      image: "/assets/img/testimonial-4.jpg",
      name: "Person Name",
      profession: "Profession",
      content: "Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      rating: 5
    },
  ];

  return (
    <div className="container-fluid py-6">
      <div className="container">
        <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
          <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
            Testimonial
          </small>
          <h1 className="display-5 mb-5">What Our Customers says!</h1>
        </div>
        
        <Slider {...settings} className="wow bounceInUp" data-wow-delay="0.1s">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-2">
              <div className="testimonial-item rounded bg-light p-4">
                <div className="d-flex mb-3">
                  <img 
                    src={testimonial.image} 
                    className="img-fluid rounded-circle flex-shrink-0" 
                    alt={testimonial.name}
                    style={{width: '60px', height: '60px', objectFit: 'cover'}}
                  />
                  <div className="position-absolute" style={{top: '15px', right: '20px'}}>
                    <i className="fa fa-quote-right fa-2x"></i>
                  </div>
                  <div className="ps-3 my-auto">
                    <h4 className="mb-0">{testimonial.name}</h4>
                    <p className="m-0">{testimonial.profession}</p>
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="d-flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-primary"></i>
                    ))}
                  </div>
                  <p className="fs-5 m-0 pt-3">{testimonial.content}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSection;