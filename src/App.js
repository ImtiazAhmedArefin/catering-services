import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import Booking from './pages/Booking';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Testimonial from './pages/Testimonial';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Header from './components/Header'; // Add this import
import './assets/importfile.css';
import './assets/css/bootstrap.min.css';
import './assets/lib/animate/animate.min.css';
import './assets/css/style.css';
import './assets/lib/lightbox/js/lightbox.min.js';
import './assets/lib/easing/easing.min.js';
import './assets/lib/lightbox/js/lightbox.min.js';
// import './assets/lib/counterup/counterup.min.js';
import './assets/lib/wow/wow.min.js';
// import './assets/js/main.js';


/* admin route */
import Login from './Admin/Login';
import Register from './Admin/Register';
import Dashboard from './Admin/Dashboard';
import Users from './Admin/Users';
//import Useradd from './Admin/Useradd';
import Protected from './Admin/protected';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import { CartProvider } from 'react-use-cart';



function App() {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return sessionStorage.getItem("access_token") || false;
  });

  return (
    <>
      {/* <Header /> Add Header component here */}
<CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/booking" element={<Booking />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />} />
        
        {/* Admin route */}
        <Route path="/admin/dashboard" element={
          <Protected isSignedIn={isSignedIn}>
            <Dashboard />
          </Protected>
        } />
        <Route path="/admin/user" element={
          <Protected isSignedIn={isSignedIn}>
            <Users />
          </Protected>
        } />

        
      </Routes>
</CartProvider>
    </>
  );
}

export default App;