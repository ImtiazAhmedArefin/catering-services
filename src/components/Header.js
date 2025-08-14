import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "react-use-cart";

function Header() {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    contact_no: '', 
    password: '', 
    rpassword: '',
    terms: false
  });
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  
  // Initialize useCart hook properly
  const { 
    totalUniqueItems, 
    emptyCart,
    addItem,
    removeItem,
    updateItemQuantity,
    cartTotal
  } = useCart();
  
  useEffect(() => {
    // Check for logged in user on component mount
    const userData = sessionStorage.getItem("userdata");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("User data from session:", parsedUser);
        setUser(parsedUser);
        // Fetch cart items when user is logged in
        fetchCartItems(parsedUser.id);
      } catch (e) {
        console.error("Error parsing user data:", e);
        sessionStorage.removeItem("userdata");
      }
    }
    
    // Hide spinner after component mounts
    const spinner = document.getElementById("spinner");
    if (spinner) {
      setTimeout(() => {
        spinner.classList.remove("show");
      }, 1000);
    }
    
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Function to fetch cart items
  const fetchCartItems = (userId) => {
    axios.get(`http://localhost/catering-api/cart/cart.php?user_id=${userId}`)
      .then(response => {
        if (response.data && response.data.items) {
          // Clear current cart
          emptyCart();
          
          // Add items from database to cart
          response.data.items.forEach(item => {
            addItem({
              id: item.menu_item_id,
              name: item.name,
              price: parseFloat(item.price),
              image: item.image
            }, item.quantity);
          });
        }
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });
  };
  
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("userdata");
    setUser(null);
    setIsUserDropdownOpen(false);
    // Clear cart using react-use-cart
    emptyCart();
  };
  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    
    try {
      let url = 'http://localhost/catering-api/login.php';
      let response = await axios({
        method: 'post',
        responseType: 'json',
        url: url,
        data: loginData
      });
      
      console.log("Login response:", response.data);
      
      if (response.data.jwt) {
        // Make sure we're storing the user data correctly
        const userData = response.data.datas;
        console.log("User data from response:", userData);
        sessionStorage.setItem("access_token", response.data.jwt);
        sessionStorage.setItem("userdata", JSON.stringify(userData));
        setUser(userData);
        // Fetch cart items after login
        fetchCartItems(userData.id);
        setShowLoginModal(false);
        setLoginData({ email: '', password: '' });
      } else {
        setAuthError(response.data.message);
      }
    } catch (e) {
      console.log(e);
      setAuthError("Login failed. Please check your credentials.");
    }
  };
  
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    
    try {
      let url = 'http://localhost/catering-api/forgot_password.php';
      let response = await axios({
        method: 'post',
        responseType: 'json',
        url: url,
        data: forgotPasswordData
      });
      
      console.log("Forgot password response:", response.data);
      
      if (response.data.success) {
        setAuthSuccess("Password reset link sent to your email!");
        setForgotPasswordData({ email: '' });
      } else {
        setAuthError(response.data.message || "Failed to send reset link");
      }
    } catch (e) {
      console.log(e);
      setAuthError("Failed to send reset link. Please try again.");
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    
    if (registerData.password !== registerData.rpassword) {
      setAuthError("Passwords do not match");
      return;
    }
    
    if (!registerData.terms) {
      setAuthError("You must agree to the Terms and Conditions");
      return;
    }
    
    try {
      let url = 'http://localhost/catering-api/users_add.php';
      let response = await axios({
        method: 'post',
        responseType: 'json',
        url: url,
        data: registerData
      });
      
      if (response.data.error === 0) {
        setAuthSuccess("Registration successful! Please login.");
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterData({ name: '', email: '', contact_no: '', password: '', rpassword: '', terms: false });
      } else {
        setAuthError(response.data.message);
      }
    } catch (e) {
      console.log(e);
      setAuthError("Registration failed. Please try again.");
    }
  };
  
  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
    setAuthError('');
    setAuthSuccess('');
  };
  
  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
    setAuthError('');
    setAuthSuccess('');
  };
  
  const switchToForgotPassword = () => {
    setShowForgotPassword(true);
    setAuthError('');
    setAuthSuccess('');
  };
  
  const switchBackToLogin = () => {
    setShowForgotPassword(false);
    setAuthError('');
    setAuthSuccess('');
  };
  
  return (
    <>
      <div
        id="spinner"
        className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
      
      <div className="container-fluid nav-bar">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand-lg py-4">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary fw-bold mb-0">
                Cater<span className="text-dark">Serv</span>
              </h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to={"/"} className="nav-item nav-link">Home</Link>
                <Link to={"/about"} className="nav-item nav-link">About</Link>
                <Link to={"/services"} className="nav-item nav-link">Services</Link>
                <Link to={"/events"} className="nav-item nav-link">Events</Link>
                <Link to={"/menu"} className="nav-item nav-link">Menu</Link>
                <div className="nav-item dropdown">
                  <a
                    href="/"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu bg-light">
                    <Link to={"/booking"} className="dropdown-item">Booking</Link>
                    <Link to={"/blog"} className="dropdown-item">Our Blog</Link>
                    <Link to={"/team"} className="dropdown-item">Our Team</Link>
                    <Link to={"/testimonial"} className="dropdown-item">Testimonial</Link>
                  </div>
                </div>
                <Link to={"/contact"} className="nav-item nav-link">Contact</Link>
              </div>
              <button
                className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search"></i>
              </button>
              
              {/* Cart button - shown only when user is logged in */}
              {user && (
                <Link to={"/cart"} className="btn btn-primary position-relative me-2 d-none d-xl-inline-flex rounded-pill">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Cart
                  {totalUniqueItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalUniqueItems}
                    </span>
                  )}
                </Link>
              )}
              
              {/* User authentication section */}
              {user ? (
                <div className="d-flex align-items-center" ref={userDropdownRef}>
                  <div className="dropdown">
                    <button 
                      className="btn btn-primary dropdown-toggle py-2 px-4 d-none d-xl-inline-block rounded-pill" 
                      type="button" 
                      id="userDropdown" 
                      onClick={toggleUserDropdown}
                      aria-expanded={isUserDropdownOpen}
                    >
                      <i className="fas fa-user me-2"></i>
                      {user.name || 'User'}
                    </button>
                    <div className={`dropdown-menu dropdown-menu-end ${isUserDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
                      <Link to={"/profile"} className="dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
                        <i className="fas fa-user me-2"></i> My Profile
                      </Link>
                      <Link to={"/mybookings"} className="dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
                        <i className="fas fa-calendar me-2"></i> My Bookings
                      </Link>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button></li>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill"
                >
                  Customer Login
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal fade show" 
             tabIndex="-1" 
             role="dialog"
             aria-labelledby="loginModalLabel" 
             aria-hidden="false"
             style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">Customer Login</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {authError && <div className="alert alert-danger">{authError}</div>}
                {authSuccess && <div className="alert alert-success">{authSuccess}</div>}
                
                {showForgotPassword ? (
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <div className="mb-3">
                      <label htmlFor="forgotEmail" className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="forgotEmail" 
                        name="email"
                        value={forgotPasswordData.email}
                        onChange={handleForgotPasswordChange}
                        placeholder="Enter your email address" 
                        required 
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">Send Reset Link</button>
                    </div>
                    <div className="text-center mt-3">
                      <button type="button" className="btn btn-link p-0" onClick={switchBackToLogin}>
                        Back to Login
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3">
                      <label htmlFor="loginEmail" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="loginEmail" 
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="loginPassword" className="form-label">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="loginPassword" 
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required 
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="text-center mt-3">
                      <div className="mb-2">
                        <button type="button" className="btn btn-link p-0" onClick={switchToForgotPassword}>
                          Forgot Password?
                        </button>
                      </div>
                      Don't have an account? <button type="button" className="btn btn-link p-0" onClick={switchToRegister}>Register here</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal fade show" 
             tabIndex="-1" 
             role="dialog"
             aria-labelledby="registerModalLabel" 
             aria-hidden="false"
             style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registerModalLabel">Customer Registration</h5>
                <button type="button" className="btn-close" onClick={() => setShowRegisterModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {authError && <div className="alert alert-danger">{authError}</div>}
                {authSuccess && <div className="alert alert-success">{authSuccess}</div>}
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="registerName" 
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="registerEmail" 
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerContact" className="form-label">Contact Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="registerContact" 
                      name="contact_no"
                      value={registerData.contact_no}
                      onChange={handleRegisterChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="registerPassword" 
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerConfirmPassword" className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="registerConfirmPassword" 
                      name="rpassword"
                      value={registerData.rpassword}
                      onChange={handleRegisterChange}
                      required 
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="termsCheck" 
                      name="terms"
                      checked={registerData.terms}
                      onChange={handleRegisterChange}
                      required 
                    />
                    <label className="form-check-label" htmlFor="termsCheck">
                      I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                    </label>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                  <div className="text-center mt-3">
                    Already have an account? <button type="button" className="btn btn-link p-0" onClick={switchToLogin}>Login here</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input
                  type="search"
                  className="form-control bg-transparent p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;