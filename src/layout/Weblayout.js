// src/layout/Weblayout.js

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/importfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Weblayout({ children }) {
  useEffect(() => {
    const scriptUrls = [
      // jQuery (one copy only)
      'https://code.jquery.com/jquery-3.6.0.min.js',
      // Bootstrap bundle (includes Popper)
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js',
      // Local libs in your public/assets folder:
      `${process.env.PUBLIC_URL}/assets/lib/wow/wow.min.js`,
      `${process.env.PUBLIC_URL}/assets/lib/easing/easing.min.js`,
      `${process.env.PUBLIC_URL}/assets/lib/waypoints/waypoints.min.js`,
      `${process.env.PUBLIC_URL}/assets/lib/counterup/counterup.min.js`,
      `${process.env.PUBLIC_URL}/assets/lib/lightbox/js/lightbox.min.js`,
      `${process.env.PUBLIC_URL}/assets/lib/owlcarousel/owl.carousel.min.js`,
      // Your template’s main script
      `${process.env.PUBLIC_URL}/assets/js/main.js`,
    ];

    // Dynamically inject each script tag in order
    scriptUrls.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    // Optional cleanup if you ever unmount this layout:
    return () => {
      scriptUrls.forEach(src => {
        const tag = document.querySelector(`script[src="${src}"]`);
        if (tag) document.body.removeChild(tag);
      });
    };
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Weblayout;
