import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import TestimonialSection from "../components/Testimonial";
import Weblayout from "../layout/Weblayout";
import RightStickyBar from "../components/RightStickyBar";

const services = [
  {
    icon: "fas fa-cheese",
    title: "Wedding Services",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/wedding",
  },
  {
    icon: "fas fa-pizza-slice",
    title: "Corporate Catering",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/corporate",
  },
  {
    icon: "fas fa-hotdog",
    title: "Cocktail Reception",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/cocktail",
  },
  {
    icon: "fas fa-hamburger",
    title: "Bento Catering",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/bento",
  },
  {
    icon: "fas fa-wine-glass-alt",
    title: "Pub Party",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/pub-party",
  },
  {
    icon: "fas fa-walking",
    title: "Home Delivery",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/home-delivery",
  },
  {
    icon: "fas fa-wheelchair",
    title: "Sit-down Catering",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/sit-down",
  },
  {
    icon: "fas fa-utensils",
    title: "Buffet Catering",
    desc: "Contrary to popular belief, ipsum is not simply random.",
    to: "/services/buffet",
  },
];

export default function Services() {
  return (
    <Weblayout>
      <RightStickyBar/>
      {/* <!-- Service Start --> */}
      <div className="container-fluid service py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Services
            </small>
            <h1 className="display-5 mb-5">What We Offer</h1>
          </div>
          <div className="row g-4">
            {services.map((s, idx) => (
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay={`0.${(idx % 4) * 2 + 1}s`}
                key={s.title}
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className={`${s.icon} fa-7x text-primary mb-4`}></i>
                      <h4 className="mb-3">{s.title}</h4>
                      <p className="mb-4">{s.desc}</p>
                      <Link
                        to={s.to}
                        className="btn btn-primary px-4 py-2 rounded-pill"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Service End --> */}

      <TestimonialSection />
    </Weblayout>
  );
}
