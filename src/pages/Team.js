import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Weblayout from '../layout/Weblayout';
import RightStickyBar from "../components/RightStickyBar";

function Team() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Weblayout>
      <RightStickyBar/>
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

export default Team;
