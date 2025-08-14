import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    id: '',
    event_date: '',
    event_time: '',
    event_type: '',
    number_of_guests: '',
    venue: '',
    special_requests: '',
    status: 'Pending'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/catering-api';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    setError(null);
    
    axios.get(`${API_BASE_URL}/admin/bookings.php`)
      .then(response => {
        if (response.data && response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          setBookings([]);
        }
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setEditForm({
      id: booking.id,
      event_date: booking.event_date,
      event_time: booking.event_time,
      event_type: booking.event_type,
      number_of_guests: booking.number_of_guests,
      venue: booking.venue || '',
      special_requests: booking.special_requests || '',
      status: booking.status
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const updateBooking = () => {
    setUpdating(true);
    setError(null);
    setSuccessMessage('');
    
    axios.post(`${API_BASE_URL}/admin/update_booking.php`, editForm)
      .then(response => {
        if (response.data.success) {
          setSuccessMessage('Booking updated successfully!');
          setShowEditModal(false);
          fetchBookings(); // Refresh the list
        } else {
          setError(response.data.message || 'Failed to update booking');
        }
      })
      .catch(error => {
        console.error('Error updating booking:', error);
        setError('Failed to update booking. Please try again.');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const deleteBooking = () => {
    setUpdating(true);
    setError(null);
    setSuccessMessage('');
    
    axios.post(`${API_BASE_URL}/admin/delete_booking.php`, {
      booking_id: selectedBooking.id
    })
      .then(response => {
        if (response.data.success) {
          setSuccessMessage('Booking deleted successfully!');
          setShowDeleteModal(false);
          fetchBookings(); // Refresh the list
        } else {
          setError(response.data.message || 'Failed to delete booking');
        }
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
        setError('Failed to delete booking. Please try again.');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // Filter bookings based on selected filter and search term
  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = searchTerm === '' || 
      booking.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.venue && booking.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

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

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Bookings</h2>
        <button className="btn btn-primary" onClick={fetchBookings}>
          <i className="fas fa-sync-alt me-2"></i> Refresh
        </button>
      </div>
      
      {successMessage && (
        <div className="alert alert-success mb-4">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="filter" className="form-label">Filter by Status</label>
              <select 
                className="form-select" 
                id="filter" 
                value={filter} 
                onChange={handleFilterChange}
              >
                <option value="all">All Bookings</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-8">
              <label htmlFor="search" className="form-label">Search Bookings</label>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  id="search" 
                  placeholder="Search by event type, venue, or customer name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
              <h4>No bookings found</h4>
              <p className="text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Event Type</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Venue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.customer_name}</td>
                      <td>{booking.event_type}</td>
                      <td>
                        {new Date(booking.event_date).toLocaleDateString()}<br />
                        <small>{booking.event_time}</small>
                      </td>
                      <td>{booking.number_of_guests}</td>
                      <td>{booking.venue || 'TBD'}</td>
                      <td>{getStatusBadge(booking.status)}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary" 
                            onClick={() => openEditModal(booking)}
                            title="Edit booking"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn btn-outline-danger" 
                            onClick={() => openDeleteModal(booking)}
                            title="Delete booking"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Booking Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Booking</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="event_type" className="form-label">Event Type</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="event_type" 
                      name="event_type"
                      value={editForm.event_type}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="event_date" className="form-label">Event Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        id="event_date" 
                        name="event_date"
                        value={editForm.event_date}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="event_time" className="form-label">Event Time</label>
                      <input 
                        type="time" 
                        className="form-control" 
                        id="event_time" 
                        name="event_time"
                        value={editForm.event_time}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="number_of_guests" className="form-label">Number of Guests</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="number_of_guests" 
                      name="number_of_guests"
                      value={editForm.number_of_guests}
                      onChange={handleEditChange}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="venue" className="form-label">Venue</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="venue" 
                      name="venue"
                      value={editForm.venue}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      id="status" 
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="special_requests" className="form-label">Special Requests</label>
                    <textarea 
                      className="form-control" 
                      id="special_requests" 
                      name="special_requests"
                      rows="3"
                      value={editForm.special_requests}
                      onChange={handleEditChange}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={updateBooking}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this booking?</p>
                <div className="alert alert-warning">
                  <strong>Booking Details:</strong><br />
                  Event: {selectedBooking.event_type}<br />
                  Date: {new Date(selectedBooking.event_date).toLocaleDateString()}<br />
                  Customer: {selectedBooking.customer_name}
                </div>
                <p className="text-danger">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={deleteBooking}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Deleting...
                    </>
                  ) : (
                    'Delete Booking'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal backdrop */}
      {(showEditModal || showDeleteModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}

export default Bookings;