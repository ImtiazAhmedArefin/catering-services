import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/qacc/api/logout.php');
      const data = await response.json();
      if (data.message) {
        onLogout();
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="user-dropdown">
      <div className="user-greeting">Hello, {user.first_name}</div>
      <div className="dropdown-menu">
        <button onClick={() => navigate('/profile')}>My Profile</button>
        <button onClick={() => navigate('/bookings')}>My Bookings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserDropdown;