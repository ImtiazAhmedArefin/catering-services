import * as React from 'react';
import Weblayout from '../layout/Weblayout';
import { useCart } from "react-use-cart";
import RightStickyBar from "../components/RightStickyBar";
import { Link } from 'react-router-dom';

function Cart() {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart
  } = useCart();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateItemQuantity(id, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      removeItem(id);
    }
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      emptyCart();
    }
  };

  return (
    <Weblayout>
      <RightStickyBar />
      
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h2>Shopping Cart</h2>
                <p>Review your selected items</p>
              </div>
              <div className="page_link">
                <Link to="/">Home</Link>
                /
                <Link to="/cart">Cart</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cart_area section_gap">
        <div className="container">
          <div className="cart_inner">
            {isEmpty ? (
              <div className="text-center py-5">
                <h3>Your cart is empty</h3>
                <p className="mt-3">Add some delicious items to your cart!</p>
                <Link to="/menu" className="btn btn-primary mt-3">Browse Menu</Link>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="media">
                              <div className="d-flex">
                                <img 
                                  src={item.image ? `${process.env.REACT_APP_API_URL || ''}${item.image}` : "assets/img/default-food.jpg"} 
                                  alt={item.name} 
                                  width="100px" 
                                  className="img-fluid rounded"
                                />
                              </div>
                              <div className="media-body ms-3">
                                <p className="mb-0 fw-bold">{item.name}</p>
                                <small className="text-muted">{item.description || ''}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h5>{formatCurrency(item.price)}</h5>
                          </td>
                          <td>
                            <div className="product_count d-flex align-items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="reduced items-count btn btn-outline-secondary btn-sm"
                                type="button"
                                disabled={item.quantity <= 1}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input
                                type="text"
                                name="qty"
                                id={`sst-${item.id}`}
                                value={item.quantity}
                                readOnly
                                className="input-text qty form-control text-center mx-2"
                                style={{ width: '50px' }}
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="increase items-count btn btn-outline-secondary btn-sm"
                                type="button"
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <h5>{formatCurrency(item.itemTotal)}</h5>
                          </td>
                          <td>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="btn btn-danger btn-sm"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      
                      <tr>
                        <td colSpan="3">
                          <div className="d-flex justify-content-between">
                            <Link to="/menu" className="btn btn-outline-primary">
                              <i className="fas fa-arrow-left me-2"></i> Continue Shopping
                            </Link>
                            <button 
                              onClick={handleClearCart}
                              className="btn btn-outline-danger"
                            >
                              <i className="fas fa-trash me-2"></i> Clear Cart
                            </button>
                          </div>
                        </td>
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>{formatCurrency(cartTotal)}</h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="checkout_btn_inner d-flex justify-content-end mt-4">
                  <Link className="btn btn-primary" to="/checkout">
                    Proceed to Checkout
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Weblayout>
  );
}

export default Cart;