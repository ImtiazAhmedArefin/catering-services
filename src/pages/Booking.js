// src/pages/Booking.js
//import React, { useState } from "react";
//import axios from "axios";
import Weblayout from "../layout/Weblayout";
import BookingSection from "../components/BookingSection";
import RightStickyBar from "../components/RightStickyBar";

export default function BookingPage() {
  return (
    <Weblayout>
      <RightStickyBar/>
      <BookingSection />
    </Weblayout>
  );
}