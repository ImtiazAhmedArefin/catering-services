import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Weblayout from "../layout/Weblayout";
import RightStickyBar from "../components/RightStickyBar";

function Profile() {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_no: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/catering-api';

  useEffect(() => {
    const userData = sessionStorage.getItem("userdata");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchUserData(parsedUser.id);
      } catch (e) {
        console.error("Error parsing user data:", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = (userId) => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/user/profile.php?user_id=${userId}`)
      .then(response => {
        if (response.data && response.data.user && response.data.customer) {
          setUser(response.data.user);
          setCustomer(response.data.customer);
          
          // Set form data
          setFormData({
            name: response.data.user.name || '',
            email: response.data.user.email || '',
            contact_no: response.data.user.contact_no || '',
            first_name: response.data.customer.first_name || '',
            last_name: response.data.customer.last_name || '',
            phone: response.data.customer.phone || '',
            address: response.data.customer.address || ''
          });
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to load profile data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    axios.post(`${API_BASE_URL}/user/update_profile.php`, {
      user_id: user.id,
      ...formData
    })
      .then(response => {
        if (response.data.success) {
          // Update session storage with new user data
          const updatedUser = { ...user, name: formData.name, email: formData.email, contact_no: formData.contact_no };
          sessionStorage.setItem("userdata", JSON.stringify(updatedUser));
          setUser(updatedUser);
          
          setSuccessMessage('Profile updated successfully!');
          setEditMode(false);
        } else {
          setErrorMessage(response.data.message || 'Failed to update profile');
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        setErrorMessage('Failed to update profile. Please try again.');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    setSaving(true);
    
    axios.post(`${API_BASE_URL}/user/change_password.php`, {
      user_id: user.id,
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword
    })
      .then(response => {
        if (response.data.success) {
          setSuccessMessage('Password changed successfully!');
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        } else {
          setPasswordError(response.data.message || 'Failed to change password');
        }
      })
      .catch(error => {
        console.error('Error changing password:', error);
        setPasswordError('Failed to change password. Please try again.');
      })
      .finally(() => {
        setSaving(false);
      });
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
          Please <Link to="/login">login</Link> to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Profile</h2>
      
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
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Personal Information</h5>
              {!editMode ? (
                <button 
                  className="btn btn-sm btn-outline-primary" 
                  onClick={() => setEditMode(true)}
                >
                  <i className="fas fa-edit me-1"></i> Edit
                </button>
              ) : (
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={() => setEditMode(false)}
                >
                  <i className="fas fa-times me-1"></i> Cancel
                </button>
              )}
            </div>
            <div className="card-body">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="contact_no" className="form-label">Contact Number</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="contact_no" 
                        name="contact_no"
                        value={formData.contact_no}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Alternative Phone</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="first_name" className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="first_name" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="last_name" className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="last_name" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea 
                      className="form-control" 
                      id="address" 
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="d-flex justify-content-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><strong>Full Name:</strong> {user.name}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><strong>Contact Number:</strong> {user.contact_no || 'Not provided'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Alternative Phone:</strong> {customer?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><strong>First Name:</strong> {customer?.first_name || 'Not provided'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Last Name:</strong> {customer?.last_name || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p><strong>Address:</strong> {customer?.address || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Change Password</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordSubmit}>
                {passwordError && (
                  <div className="alert alert-danger mb-3">
                    {passwordError}
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">Current Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="currentPassword" 
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="newPassword" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Account Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Member Since:</span>
                <span>{new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Account Status:</span>
                <span className="badge bg-success">Active</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Bookings:</span>
                <span>0</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total Orders:</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;