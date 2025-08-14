// src/pages/About.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Weblayout from '../layout/Weblayout';
import RightStickyBar from "../components/RightStickyBar";

export default function About() {
  const { pathname } = useLocation();
  const currentUrl = `${window.location.origin}${pathname}`;

  return (
    <Weblayout>
      <RightStickyBar/>
      {/* <!-- About Start --> */}
      <div className="container-fluid py-6">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
              <img
                src={`${process.env.PUBLIC_URL}/assets/img/about.jpg`}
                className="img-fluid rounded"
                alt="About Us"
              />
            </div>
            <div className="col-lg-7 wow bounceInUp" data-wow-delay="0.3s">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                About Us
              </small>
              <h1 className="display-5 mb-4">
                Trusted By 200+ satisfied clients
              </h1>
              <p className="mb-4">
                Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </p>
              <div className="row g-4 text-dark mb-5">
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>
                  Fresh and Fast food Delivery
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>
                  24/7 Customer Support
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>
                  Easy Customization Options
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>
                  Delicious Deals for Delicious Meals
                </div>
              </div>
              <a href="/" className="btn btn-primary py-3 px-5 rounded-pill">
                About Us
                <i className="fas fa-arrow-right ps-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}

      {/* <!-- Fact Start --> */}
      <div className="container-fluid faqt py-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="row g-4">
                {[
                  { icon: 'fas fa-users',    count: 689,  label: 'Happy Customers', delay: 0.3 },
                  { icon: 'fas fa-users-cog', count: 107,  label: 'Expert Chefs',    delay: 0.5 },
                  { icon: 'fas fa-check',     count: 253,  label: 'Events Complete', delay: 0.7 },
                ].map((item, i) => (
                  <div
                    className="col-sm-4 wow bounceInUp"
                    data-wow-delay={`${item.delay}s`}
                    key={i}
                  >
                    <div className="faqt-item bg-primary rounded p-4 text-center">
                      <i className={`${item.icon} fa-4x mb-4 text-white`}></i>
                      <h1 className="display-4 fw-bold" data-toggle="counter-up">
                        {item.count}
                      </h1>
                      <p className="text-dark text-uppercase fw-bold mb-0">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
              <div className="video">
                <button
                  type="button"
                  className="btn btn-play"
                  data-bs-toggle="modal"
                  data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                  data-bs-target="#videoModal"
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Fact End --> */}

      {/* <!-- Modal Video --> */}
      <div
        className="modal fade"
        id="videoModal"
        tabIndex={-1}
        aria-labelledby="videoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalLabel">
                YouTube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                  id="video"
                  title="Video Frame"
                  allow="autoplay; fullscreen; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Video End --> */}
    {/* <!-- Team Start --> */}
      <div className="container-fluid team py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Team
            </small>
            <h1 className="display-5 mb-5">We have experienced chef Team</h1>
          </div>
          <div className="row g-4">
            {[{
               name: "Henry",
               role: "Decoration Chef",
               img: "assets/img/team-1.jpg"
             },{
               name: "Jemes Born",
               role: "Executive Chef",
               img: "assets/img/team-2.jpg"
             },{
               name: "Martin Hill",
               role: "Kitchen Porter",
               img: "assets/img/team-3.jpg"
             },{
               name: "Adam Smith",
               role: "Head Chef",
               img: "assets/img/team-4.jpg"
             }].map((member, idx) => (
              <div
                className="col-lg-3 col-md-6 wow bounceInUp"
                data-wow-delay={`0.${idx * 2 + 1}s`}
                key={member.name}
              >
                <div className="team-item rounded">
                  <img
                    className="img-fluid rounded-top"
                    src={member.img}
                    alt={member.name}
                  />
                  <div className="team-content text-center py-3 bg-dark rounded-bottom">
                    <h4 className="text-primary">{member.name}</h4>
                    <p className="text-white mb-0">{member.role}</p>
                  </div>
                  <div className="team-icon d-flex flex-column justify-content-center m-4">
                    {/* Share current page */}
                    <a
                      className="btn btn-primary btn-md-square rounded-circle mb-2"
                      href={currentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-share-alt"></i>
                    </a>
                    {/* Facebook share */}
                    <a
                      className="btn btn-primary btn-md-square rounded-circle mb-2"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    {/* Twitter share */}
                    <a
                      className="btn btn-primary btn-md-square rounded-circle mb-2"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    {/* Instagram profile */}
                    <a
                      className="btn btn-primary btn-md-square rounded-circle mb-2"
                      href="https://www.instagram.com/YourProfileName"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Team End --> */}
    </Weblayout>
  );
}
