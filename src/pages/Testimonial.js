import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSection from "../components/Testimonial";
import Weblayout from '../layout/Weblayout';
import RightStickyBar from "../components/RightStickyBar";
function Testimonial() {
  return (
      <Weblayout>
        <RightStickyBar/>
  <TestimonialSection/>
  </Weblayout>
  );
}

export default Testimonial;
