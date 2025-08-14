import React from "react";
import { Link } from "react-router-dom";
import Weblayout from '../layout/Weblayout';
import RightStickyBar from "../components/RightStickyBar";
function NotFound() {
  return (
        <Weblayout>
          <RightStickyBar/>
      {/* <!-- 404 Start --> */}
      <div className="container-fluid py-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
              <h1 className="display-1">404</h1>
              <h1 className="mb-4">Page Not Found</h1>
              <p className="mb-4">
                We’re sorry, the page you have looked for does not exist on our website! 
                Maybe go to our home page or try using the navigation.
              </p>
              <Link to="/" className="btn btn-primary rounded-pill py-3 px-5">
                Go Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 404 End --> */}
   </Weblayout>
  );
}

export default NotFound;
