import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Weblayout from "../layout/Weblayout";
import RightStickyBar from "../components/RightStickyBar";

function MyBookings() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/catering-api';

  useEffect(() => {
    const userData = sessionStorage.getItem("userdata");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchBookings(parsedUser.id);
      } catch (e) {
        console.error("Error parsing user data:", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBookings = (userId) => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/bookings/my_bookings.php?user_id=${userId}`)
      .then(response => {
        if (response.data && response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          setBookings([]);
        }
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setErrorMessage('Failed to load your bookings. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cancelBooking = (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    setCanceling(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    axios.post(`${API_BASE_URL}/bookings/cancel_booking.php`, {
      booking_id: bookingId,
      user_id: user.id
    })
      .then(response => {
        if (response.data.success) {
          setSuccessMessage('Booking cancelled successfully!');
          // Update the booking status in the list
          setBookings(bookings.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status: 'Cancelled' } 
              : booking
          ));
        } else {
          setErrorMessage(response.data.message || 'Failed to cancel booking');
        }
      })
      .catch(error => {
        console.error('Error cancelling booking:', error);
        setErrorMessage('Failed to cancel booking. Please try again.');
      })
      .finally(() => {
        setCanceling(false);
      });
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'Confirmed':
        return <span className="badge bg-success">Confirmed</span>;
      case 'Cancelled':
        return <span className="badge bg-danger">Cancelled</span>;
      case 'Completed':
        return <span className="badge bg-info">Completed</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          Please <Link to="/login">login</Link> to view your bookings.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Bookings</h2>
        <Link to="/new-booking" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i> New Booking
        </Link>
      </div>
      
      {successMessage && (
        <div className="alert alert-success mb-4">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="alert alert-danger mb-4">
          {errorMessage}
        </div>
      )}
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="btn-group" role="group">
                <button 
                  type="button" 
                  className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('all')}
                >
                  All Bookings
                </button>
                <button 
                  type="button" 
                  className={`btn ${filter === 'Pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('Pending')}
                >
                  Pending
                </button>
                <button 
                  type="button" 
                  className={`btn ${filter === 'Confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('Confirmed')}
                >
                  Confirmed
                </button>
                <button 
                  type="button" 
                  className={`btn ${filter === 'Completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('Completed')}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <p className="mb-0">Showing {filteredBookings.length} of {bookings.length} bookings</p>
            </div>
          </div>
        </div>
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h4>No bookings found</h4>
          <p className="text-muted">
            {filter === 'all' 
              ? "You haven't made any bookings yet." 
              : `You don't have any ${filter.toLowerCase()} bookings.`}
          </p>
          <Link to="/new-booking" className="btn btn-primary mt-3">Make a Booking</Link>
        </div>
      ) : (
        <div className="row">
          {filteredBookings.map(booking => (
            <div className="col-md-6 col-lg-4 mb-4" key={booking.id}>
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">{booking.event_type}</span>
                  {getStatusBadge(booking.status)}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{booking.venue || 'Venue to be determined'}</h5>
                  <p className="card-text">
                    <i className="fas fa-calendar-day me-2"></i>
                    {new Date(booking.event_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <i className="fas fa-clock me-2"></i>
                    {booking.event_time}
                  </p>
                  <p className="card-text">
                    <i className="fas fa-users me-2"></i>
                    {booking.number_of_guests} guests
                  </p>
                  {booking.special_requests && (
                    <p className="card-text">
                      <i className="fas fa-comment me-2"></i>
                      {booking.special_requests}
                    </p>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Booked on {new Date(booking.created_at).toLocaleDateString()}
                  </small>
                  {booking.status === 'Pending' || booking.status === 'Confirmed' ? (
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => cancelBooking(booking.id)}
                      disabled={canceling}
                    >
                      {canceling ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;