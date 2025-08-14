import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [formData, setFormData] = useState({
    event_date: '',
    event_time: '',
    event_type: '',
    number_of_guests: '',
    venue: '',
    special_requests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerId = localStorage.getItem('customerId');
    
    axios.post('/api/bookings', {
      ...formData,
      customer_id: customerId
    })
    .then(response => {
      alert('Booking submitted successfully!');
      // Reset form
      setFormData({
        event_date: '',
        event_time: '',
        event_type: '',
        number_of_guests: '',
        venue: '',
        special_requests: ''
      });
    })
    .catch(error => {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking');
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Book Our Services</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Event Date</label>
            <input 
              type="date" 
              className="form-control" 
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Event Time</label>
            <input 
              type="time" 
              className="form-control" 
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Event Type</label>
            <select 
              className="form-select" 
              name="event_type"
              value={formData.event_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Corporate">Corporate</option>
              <option value="Birthday">Birthday</option>
              <option value="Cocktail">Cocktail</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Number of Guests</label>
            <input 
              type="number" 
              className="form-control" 
              name="number_of_guests"
              value={formData.number_of_guests}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input 
            type="text" 
            className="form-control" 
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Special Requests</label>
          <textarea 
            className="form-control" 
            name="special_requests"
            value={formData.special_requests}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;