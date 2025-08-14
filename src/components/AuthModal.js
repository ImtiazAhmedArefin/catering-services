import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, onClose, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      generateCaptcha();
    }
  }, [show]);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (captcha.toUpperCase() !== captchaText) {
      setError('Invalid CAPTCHA');
      generateCaptcha();
      return;
    }

    try {
      const response = await fetch('http://localhost/qacc/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, captcha }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        generateCaptcha();
      } else {
        setMessage('Login successful!');
        onClose();
        window.location.reload(); // Refresh to update auth state
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      generateCaptcha();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !firstName || !lastName) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost/qacc/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, phone }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setMessage(data.message);
        setActiveTab('login');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  if (!show) return null;

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-message">{message}</div>}
        
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="auth-form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label>CAPTCHA: {captchaText}</label>
              <input 
                type="text" 
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="auth-submit-btn">Sign In</button>
            
            <div className="auth-links">
              <a href="#" onClick={() => setActiveTab('register')}>Create an account</a>
              <a href="#">Forgot password?</a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="auth-form-group">
              <label>First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label>Phone (Optional)</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <button type="submit" className="auth-submit-btn">Register</button>
            
            <div className="auth-links">
              <a href="#" onClick={() => setActiveTab('login')}>Already have an account? Sign In</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;