import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu({ categories: propCategories, menuItems: propMenuItems, showHeader = true }) {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Appetizer');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("userdata");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Fetch cart count when user is logged in
        fetchCartCount(parsedUser.id);
      } catch (e) {
        console.error("Error parsing user data:", e);
        sessionStorage.removeItem("userdata");
      }
    }
    
    // Only use mock data if props are not provided
    if (!propCategories || !propMenuItems) {
      // Mock menu data - in a real app, fetch from your API
      const mockCategories = [
        { id: 1, name: 'Appetizer' },
        { id: 2, name: 'Soup' },
        { id: 3, name: 'Salad' },
        { id: 4, name: 'Main Course' },
        { id: 5, name: 'Dessert' }
      ];
      
      const mockMenuItems = [
        // Appetizer items
        { id: 1, name: 'Paneer', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-01.jpg', category_id: 1 },
        { id: 2, name: 'Sweet Potato', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-02.jpg', category_id: 1 },
        { id: 3, name: 'Sabudana Tikki', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-03.jpg', category_id: 1 },
        { id: 4, name: 'Pizza', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-04.jpg', category_id: 1 },
        { id: 5, name: 'Bacon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-05.jpg', category_id: 1 },
        { id: 6, name: 'Chicken', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-06.jpg', category_id: 1 },
        { id: 7, name: 'Blooming', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 1 },
        { id: 8, name: 'Sweet', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-08.jpg', category_id: 1 },
        
        // Soup items
        { id: 9, name: 'Argentinian', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-01.jpg', category_id: 2 },
        { id: 10, name: 'Crispy', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-03.jpg', category_id: 2 },
        { id: 11, name: 'Lemon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-03.jpg', category_id: 2 },
        { id: 12, name: 'Water Drink', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-02.jpg', category_id: 2 },
        { id: 13, name: 'Salty lemon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-01.jpg', category_id: 2 },
        { id: 14, name: 'Juice', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-02.jpg', category_id: 2 },
        { id: 15, name: 'Orange', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/mg/menu-03.jpg', category_id: 2 },
        { id: 16, name: 'Apple Juice', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-04.jpg', category_id: 2 },
        
        // Salad items
        { id: 17, name: 'Crispy water', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-01.jpg', category_id: 3 },
        { id: 18, name: 'Banana', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-05.jpg', category_id: 3 },
        { id: 19, name: 'Sweet Water', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-06.jpg', category_id: 3 },
        { id: 20, name: 'Hot Coffee', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 3 },
        { id: 21, name: 'Sweet Potato', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-08.jpg', category_id: 3 },
        { id: 22, name: 'Argentinian', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-09.jpg', category_id: 3 },
        { id: 23, name: 'Crispy', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 3 },
        { id: 24, name: 'Pizza', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-09.jpg', category_id: 3 },
        
        // Main Course items
        { id: 25, name: 'Sabudana Tikki', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-06.jpg', category_id: 4 },
        { id: 26, name: 'Bacon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-02.jpg', category_id: 4 },
        { id: 27, name: 'Chicken', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-03.jpg', category_id: 4 },
        { id: 28, name: 'Blooming', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-05.jpg', category_id: 4 },
        { id: 29, name: 'Sweet', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 4 },
        { id: 30, name: 'Argentinian', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-09.jpg', category_id: 4 },
        { id: 31, name: 'Crispy', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 4 },
        { id: 32, name: 'Pizza', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-09.jpg', category_id: 4 },
        
        // Dessert items
        { id: 33, name: 'Sabudana Tikki', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-06.jpg', category_id: 5 },
        { id: 34, name: 'Crispy', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 5 },
        { id: 35, name: 'Pizza', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-09.jpg', category_id: 5 },
        { id: 36, name: 'Bacon', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-02.jpg', category_id: 5 },
        { id: 37, name: 'Chicken', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-03.jpg', category_id: 5 },
        { id: 38, name: 'Blooming', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-05.jpg', category_id: 5 },
        { id: 39, name: 'Sweet', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-07.jpg', category_id: 5 },
        { id: 40, name: 'Argentinian', description: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.', price: 90.00, image_url: 'assets/img/menu-09.jpg', category_id: 5 }
      ];
      
      setCategories(mockCategories);
      setMenuItems(mockMenuItems);
      
      // Initialize quantities
      const initialQuantities = {};
      mockMenuItems.forEach(item => {
        initialQuantities[item.id] = 1;
      });
      setQuantities(initialQuantities);
    } else {
      // Use provided props
      setCategories(propCategories);
      setMenuItems(propMenuItems);
      
      // Initialize quantities for provided menu items
      const initialQuantities = {};
      // propMenuItems.forEach(item => {
      //   initialQuantities[item.id] = 1;
      // });
      setQuantities(initialQuantities);
    }
    
    setLoading(false);
  }, [propCategories, propMenuItems]);

  // Function to fetch cart count
  const fetchCartCount = (userId) => {
    axios.get(`http://localhost/catering-api/cart.php?user_id=${userId}`)
      .then(response => {
        if (response.data && response.data.items) {
          setCartCount(response.data.items.length);
        }
      })
      .catch(error => {
        console.error("Error fetching cart count:", error);
      });
  };
  
  // Function to add item to cart
  const addToCart = async (itemId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const response = await axios.post('http://localhost/catering-api/add_to_cart.php', {
        user_id: user.id,
        menu_item_id: itemId,
        quantity: quantity
      });
      
      if (response.data.success) {
        alert('Item added to cart!');
        // Update cart count
        fetchCartCount(user.id);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };
  
  // Function to update quantity (+/-)
  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };
  
  // Manual typing handler
  const handleQuantityChange = (itemId, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setQuantities(prev => ({
        ...prev,
        [itemId]: num
      }));
    } else if (value === "") {
      setQuantities(prev => ({
        ...prev,
        [itemId]: ""
      }));
    }
  };
  
  // Filter menu items by active category
  // const filteredItems = menuItems.filter(item => {
  //   const category = categories.find(cat => cat.id === item.category_id);
  //   return category && category.name === activeCategory;
  // });
  
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-fluid menu py-6">
      <div className="container">
        {showHeader && (
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Our Menu</small>
            <h1 className="display-5 mb-5">Most Popular Food in the World</h1>
          </div>
        )}
        
        <div className="tab-class text-center">
          <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 wow bounceInUp" data-wow-delay="0.1s">
            {categories.map(category => (
              <li className="nav-item p-2" key={category.id}>
                <a 
                  className={`d-flex py-2 mx-2 border border-primary bg-white rounded-pill ${activeCategory === category.name ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  <span className="text-dark" style={{width: '150px'}}>{category.name}</span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              <div className="row g-4">
                {menuItems.map(item => (
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.1s" key={item.id}>
                    <div className="menu-item d-flex align-items-center">
                      <img className="flex-shrink-0 img-fluid rounded-circle" src={item.image_url} alt={item.name} style={{width: '80px', height: '80px'}}/>
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>{item.name}</h4>
                          <h4 className="text-primary">${item.price.toFixed(2)}</h4>
                        </div>
                        <p className="mb-2">{item.description}</p>
                        <div className="d-flex align-items-center mt-2">
                          <div className="input-group input-group-sm" style={{ width: '120px', marginRight: '10px' }}>
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button" 
                              onClick={() => updateQuantity(item.id, -1)}
                            >-</button>
                            <input 
                              type="number"
                              min="1"
                              className="form-control text-center"
                              value={quantities[item.id] || ""}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button" 
                              onClick={() => updateQuantity(item.id, 1)}
                            >+</button>
                          </div>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => addToCart(item.id, quantities[item.id] || 1)}
                          >
                            <i className="fas fa-shopping-cart me-2"></i> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;