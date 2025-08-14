import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSection from "../components/Testimonial";
import Weblayout from '../layout/Weblayout';
import BookingSection from "../components/BookingSection";
import RightStickyBar from "../components/RightStickyBar";
import WOW from 'wowjs';
import Menu from '../components/Menu';


function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Appetizer');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  
  // Initialize WOW.js
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);
  
  // Fetch menu items and categories - using the same data as Menu.js
  useEffect(() => {
    // Using the same mock data as in Menu.js
    const mockCategories = [
      { id: 1, name: 'Appetizer' },
      { id: 2, name: 'Soup' },
      { id: 3, name: 'Salad' },
      { id: 4, name: 'Main Course' },
      { id: 5, name: 'Dessert' }
    ];
    
    const mockMenuItems = [
      // Appetizer items
      { id: 1, name: 'Devils on Horseback', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-01.jpg', category_id: 1 },
      { id: 2, name: 'Salami', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-02.jpg', category_id: 1 },
      { id: 3, name: 'Bourbon-Glazed Salmon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-03.jpg', category_id: 1 },
      { id: 4, name: 'Teriyaki Meatballs', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-04.jpg', category_id: 1 },
      { id: 5, name: 'Asparagus', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-05.jpg', category_id: 1 },
      { id: 6, name: 'Sweet Potato Bites', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-06.jpg', category_id: 1 },
      { id: 7, name: 'Pear Prosciutto - Copy', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 1 },
      { id: 8, name: 'Herb & Walnut Mini Cheese Balls', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-08.jpg', category_id: 1 },
      
      // Soup items
      { id: 9, name: 'Vegetable Beef Soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-1.png', category_id: 2 },
      { id: 10, name: 'CriWinter-Vegetable Soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-2.png', category_id: 2 },
      { id: 11, name: 'Vegetable soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-3.png', category_id: 2 },
      { id: 12, name: 'Vegetable Soup without Tomatoes', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-4.png', category_id: 2 },
      { id: 13, name: 'Thick and Creamy Tomato Soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-5.png', category_id: 2 },
      { id: 14, name: 'Vegan Tomato Soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-6.png', category_id: 2 },
      { id: 15, name: 'Beef Broth Vegetable Soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-7.png', category_id: 2 },
      { id: 16, name: 'Chicken Soup', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/soup-8.png', category_id: 2 },
      
      // Salad items
      { id: 17, name: 'Vegetable Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-1.png', category_id: 3 },
      { id: 18, name: 'Thai Cucumber Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-2.png', category_id: 3 },
      { id: 19, name: 'Grilled Chicken Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-3.png', category_id: 3 },
      { id: 20, name: 'Garden Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-4.png', category_id: 3 },
      { id: 21, name: 'Cobb Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-5.png', category_id: 3 },
      { id: 22, name: 'Chicken Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-6.png', category_id: 3 },
      { id: 23, name: 'Avocado Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-7.png', category_id: 3 },
      { id: 24, name: 'Greek Salad', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/salad-8.png', category_id: 3 },
      
      // Main Course items
      { id: 25, name: 'Chicken Dijon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-3 Chicken Dijon.png', category_id: 4 },
      { id: 26, name: 'Thai-Style Fried Chicken Wings', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-3 Seared Chicken Thighs with Blistered Tomatoes & Basil.png', category_id: 4 },
      { id: 27, name: 'Seared Chicken Thighs with Blistered Tomatoes & Basil', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-2 Seared Chicken Thighs with Blistered Tomatoes & Basil.png', category_id: 4 },
      { id: 28, name: 'Prunes Stuffed Chicken Roulade with Vegetables', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-1 Prunes Stuffed Chicken Roulade with Vegetables.png', category_id: 4 },
      { id: 29, name: 'Pan Roast Chicken', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-4 Pan Roast Chicken.png', category_id: 4 },
      { id: 30, name: 'Chicken Veggie Roll with Honey Sauce', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-6 Chicken Veggie Roll with Honey Sauce.png', category_id: 4 },
      { id: 31, name: 'Chicken Stew', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-7 Chicken Stew.png', category_id: 4 },
      { id: 32, name: 'Chicken Roulade', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/main-8 Chicken Roulade.png', category_id: 4 },
      
      // Dessert items
      { id: 33, name: 'Banana Bites', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-1 banana-bites.jpg', category_id: 5 },
      { id: 34, name: 'Birthday Cake Whoopie Pies', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-2 Birthday-Cake-Whoopie-Pies-02.jpg', category_id: 5 },
      { id: 35, name: 'Candy Number Cupcake Topper', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-3 candy-number-cupcake-topper.jpg', category_id: 5 },
      { id: 36, name: 'Chocolate Chip Cookie Bowls', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-4 Chocolate-Chip-Cookie-Bowls.jpg', category_id: 5 },
      { id: 37, name: 'Fudgy Brownies', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-5 fudgy-brownies.jpg', category_id: 5 },
      { id: 38, name: 'Jumbo Ice-cream Sandwhich Cookies', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-6 jumbo-ice-cream-sandwhich-cookies.jpg', category_id: 5 },
      { id: 39, name: 'Lemon Bars', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-7 lemon-bars.jpg', category_id: 5 },
      { id: 40, name: 'Pina Colada Cupcakes', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/dessert-8 pina-colada-cupcakes.jpg', category_id: 5 }
    ];
    
    setCategories(mockCategories);
    setMenuItems(mockMenuItems);
  }, []);
  
  // Add item to cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    alert(`${item.name} added to cart!`);
  };
  
  // Open lightbox
  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  // Filter menu items by active category
  const filteredItems = menuItems.filter(item => {
    const category = categories.find(cat => cat.id === item.category_id);
    return category && category.name === activeCategory;
  });
  
  return (
    <Weblayout>
      <RightStickyBar />
      
      {/* Hero Section */}
      <div className="container-fluid bg-light py-6 my-6 mt-0">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7 col-md-12">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-4 animated bounceInDown">Welcome to CaterServ</small>
              <h1 className="display-1 mb-4 animated bounceInDown">Book <span className="text-primary">Cater</span>Serv For Your Dream Event</h1>
              <a href="Booking" className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 me-4 animated bounceInLeft">Book Now</a>
              <a href="About" className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 animated bounceInLeft">Know More</a>
            </div>
            <div className="col-lg-5 col-md-12">
              <img src="assets/img/hero.png" className="img-fluid rounded animated zoomIn" alt="catering"/>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="container-fluid py-6">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
              <img src="assets/img/about.jpg" className="img-fluid rounded" alt="About"/>
            </div>
            <div className="col-lg-7 wow bounceInUp" data-wow-delay="0.3s">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">About Us</small>
              <h1 className="display-5 mb-4">Trusted By 200 + satisfied clients</h1>
              <p className="mb-4">Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore eit esdioilore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation ullaemco laboeeiris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor iesdein reprehendeerit in voluptate velit esse cillum dolore.</p>
              <div className="row g-4 text-dark mb-5">
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>Fresh and Fast food Delivery
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>24/7 Customer Support
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>Easy Customization Options
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2"></i>Delicious Deals for Delicious Meals
                </div>
              </div>
              <a href="About" className="btn btn-primary py-3 px-5 rounded-pill">About Us<i className="fas fa-arrow-right ps-2"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fact/Counter Section */}
      <div className="container-fluid faqt py-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-sm-4 wow bounceInUp" data-wow-delay="0.3s">
                  <div className="faqt-item bg-primary rounded p-4 text-center">
                    <i className="fas fa-users fa-4x mb-4 text-white"></i>
                    <h1 className="display-4 fw-bold" data-toggle="counter-up">689</h1>
                    <p className="text-dark text-uppercase fw-bold mb-0">Happy Customers</p>
                  </div>
                </div>
                <div className="col-sm-4 wow bounceInUp" data-wow-delay="0.5s">
                  <div className="faqt-item bg-primary rounded p-4 text-center">
                    <i className="fas fa-users-cog fa-4x mb-4 text-white"></i>
                    <h1 className="display-4 fw-bold" data-toggle="counter-up">107</h1>
                    <p className="text-dark text-uppercase fw-bold mb-0">Expert Chefs</p>
                  </div>
                </div>
                <div className="col-sm-4 wow bounceInUp" data-wow-delay="0.7s">
                  <div className="faqt-item bg-primary rounded p-4 text-center">
                    <i className="fas fa-check fa-4x mb-4 text-white"></i>
                    <h1 className="display-4 fw-bold" data-toggle="counter-up">253</h1>
                    <p className="text-dark text-uppercase fw-bold mb-0">Events Complete</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
              <div className="video">
                <button type="button" className="btn btn-play" data-bs-toggle="modal" data-bs-target="#videoModal">
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Youtube Video</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ZGUpcsA19xA?si=RUvs8upIPbUFONmB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="container-fluid service py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Our Services</small>
            <h1 className="display-5 mb-5">What We Offer</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.1s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-cheese fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Wedding Services</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.3s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-pizza-slice fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Corporate Catering</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-hotdog fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Cocktail Reception</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.7s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-hamburger fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Bento Catering</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.1s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-wine-glass-alt fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Pub Party</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.3s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-walking fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Home Delivery</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-wheelchair fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Sit-down Catering</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.7s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-utensils fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Buffet Catering</h4>
                    <p className="mb-4">Contrary to popular belief, ipsum is not simply random.</p>
                    <a href="/" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Events Gallery Section */}
      <div className="container-fluid event py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Latest Events</small>
            <h1 className="display-5 mb-5">Our Social & Professional Events Gallery</h1>
          </div>
          <div className="tab-class text-center">
            <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 wow bounceInUp" data-wow-delay="0.1s">
              <li className="nav-item p-2">
                <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                  <span className="text-dark" style={{width: '150px'}}>All Events</span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="d-flex py-2 mx-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                  <span className="text-dark" style={{width: '150px'}}>Wedding</span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="d-flex py-2 mx-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                  <span className="text-dark" style={{width: '150px'}}>Corporate</span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="d-flex py-2 mx-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                  <span className="text-dark" style={{width: '150px'}}>Cocktail</span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="d-flex py-2 mx-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                  <span className="text-dark" style={{width: '150px'}}>Buffet</span>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.1s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-1.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Wedding</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-1.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.3s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-2.jpg" alt="event"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Corporate</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-2.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.5s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-3.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Wedding</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-3.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.7s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-4.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Buffet</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-4.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.1s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-5.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Cocktail</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-5.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.3s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-6.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Wedding</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-6.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.5s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-7.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Buffet</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-7.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.7s">
                        <div className="event-img position-relative">
                          <img className="img-fluid rounded w-100" src="assets/img/event-8.jpg" alt="catering"/>
                          <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto">Corporate</h4>
                            <button 
                              className="my-auto btn btn-link p-0 text-white"
                              onClick={() => openLightbox('assets/img/event-8.jpg')}
                            >
                              <i className="fas fa-search-plus text-dark fa-2x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Other tabs (tab-2 to tab-5) would follow similar structure */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section with Add to Cart - Using Menu Component */}
      <div className="container-fluid menu bg-light py-6 my-6">
        <Menu 
          categories={categories}
          menuItems={menuItems}
          showHeader={true}
        />
      </div>
      
      <BookingSection />
      
      {/* Team Section */}
      <div className="container-fluid team py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Our Team</small>
            <h1 className="display-5 mb-5">We have experienced chef Team</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
              <div className="team-item rounded">
                <img className="img-fluid rounded-top " src="assets/img/team-1.jpg" alt="catering"/>
                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                  <h4 className="text-primary">Henry</h4>
                  <p className="text-white mb-0">Decoration Chef</p>
                </div>
                <div className="team-icon d-flex flex-column justify-content-center m-4">
                  <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fas fa-share-alt"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-facebook-f"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-twitter"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.3s">
              <div className="team-item rounded">
                <img className="img-fluid rounded-top " src="assets/img/team-2.jpg" alt="catering"/>
                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                  <h4 className="text-primary">Jemes Born</h4>
                  <p className="text-white mb-0">Executive Chef</p>
                </div>
                <div className="team-icon d-flex flex-column justify-content-center m-4">
                  <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fas fa-share-alt"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-facebook-f"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-twitter"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.5s">
              <div className="team-item rounded">
                <img className="img-fluid rounded-top " src="assets/img/team-3.jpg" alt="catering"/>
                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                  <h4 className="text-primary">Martin Hill</h4>
                  <p className="text-white mb-0">Kitchen Porter</p>
                </div>
                <div className="team-icon d-flex flex-column justify-content-center m-4">
                  <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fas fa-share-alt"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-facebook-f"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-twitter"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.7s">
              <div className="team-item rounded">
                <img className="img-fluid rounded-top " src="assets/img/team-4.jpg" alt="catering"/>
                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                  <h4 className="text-primary">Adam Smith</h4>
                  <p className="text-white mb-0">Head Chef</p>
                </div>
                <div className="team-icon d-flex flex-column justify-content-center m-4">
                  <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fas fa-share-alt"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-facebook-f"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-twitter"></i></a>
                  <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="catering"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TestimonialSection/>
      
      {/* Blog Section */}
      <div className="container-fluid blog py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Our Blog</small>
            <h1 className="display-5 mb-5">Be First Who Read News</h1>
          </div>
          <div className="row gx-4 justify-content-center">
            <div className="col-md-6 col-lg-4 wow bounceInUp" data-wow-delay="0.1s">
              <div className="blog-item">
                <div className="overflow-hidden rounded">
                  <img src="assets/img/blog-1.jpg" className="img-fluid w-100" alt="catering"/>
                </div>
                <div className="blog-content mx-4 d-flex rounded bg-light">
                  <div className="text-dark bg-primary rounded-start">
                    <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                      <p className="fw-bold mb-0">16</p>
                      <p className="fw-bold mb-0">Sep</p>
                    </div>
                  </div>
                  <a href="/" className="h5 lh-base my-auto h-100 p-3">How to get more test in your food from</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow bounceInUp" data-wow-delay="0.3s">
              <div className="blog-item">
                <div className="overflow-hidden rounded">
                  <img src="assets/img/blog-2.jpg" className="img-fluid w-100" alt="catering"/>
                </div>
                <div className="blog-content mx-4 d-flex rounded bg-light">
                  <div className="text-dark bg-primary rounded-start">
                    <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                      <p className="fw-bold mb-0">16</p>
                      <p className="fw-bold mb-0">Sep</p>
                    </div>
                  </div>
                  <a href="/" className="h5 lh-base my-auto h-100 p-3">How to get more test in your food from</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 wow bounceInUp" data-wow-delay="0.5s">
              <div className="blog-item">
                <div className="overflow-hidden rounded">
                  <img src="assets/img/blog-3.jpg" className="img-fluid w-100" alt="catering"/>
                </div>
                <div className="blog-content mx-4 d-flex rounded bg-light">
                  <div className="text-dark bg-primary rounded-start">
                    <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                      <p className="fw-bold mb-0">16</p>
                      <p className="fw-bold mb-0">Sep</p>
                    </div>
                  </div>
                  <a href="/" className="h5 lh-base my-auto h-100 p-3">How to get more test in your food from</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
            <img src={lightboxImage} alt="Event" className="img-fluid" />
          </div>
        </div>
      )}
    </Weblayout>
  );
}

export default Home;