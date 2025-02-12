// src/pages/Registration/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header'; // استيراد الهيدر
import '../assets/css/reg.css';

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const icons = document.querySelectorAll('.input-icon');
    icons.forEach(icon => icon.classList.add('animated-icon'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header /> {/* إضافة الهيدر */}
      <div className="page-container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '80px' }}>
        {/* إضافة هامش علوي لتجنب التداخل مع الهيدر */}
        <ul className="circles">
          <li></li><li></li><li></li><li></li><li></li>
        </ul>

        <div className="register-container" style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
          {/* زيادة العرض وضبط الفورم ليظهر كاملاً */}
          <div className="logo-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className="logo">
              <span className="L1">L</span>
              <span className="ogic">ogic</span>
              <span className="L2">L</span>
              <span className="eap">eap</span>
            </div>
            <div className="logo-text">User Registration</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row form-row">
              <div className="col-md-6 form-col">
                <div className="form-floating" style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                  <label>Full Name</label>
                  <i className="fas fa-user input-icon"></i>
                </div>
              </div>
              <div className="col-md-6 form-col">
                <div className="form-floating" style={{ marginBottom: '10px' }}>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <label>Email Address</label>
                  <i className="fas fa-envelope input-icon"></i>
                </div>
              </div>
            </div>

            <div className="row form-row">
              <div className="col-md-6 form-col">
                <div className="form-floating" style={{ marginBottom: '10px' }}>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <label>Password</label>
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </div>
              <div className="col-md-6 form-col">
                <div className="form-floating" style={{ marginBottom: '10px' }}>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  <label>Confirm Password</label>
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </div>
            </div>

            <div className="row form-row">
              <div className="col-md-6 form-col mx-auto">
                <div className="form-floating" style={{ marginBottom: '10px' }}>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  <label>Phone Number</label>
                  <i className="fas fa-phone input-icon"></i>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mx-auto">
                <button type="submit" className="btn btn-register text-white" disabled={isLoading} style={{ width: '100%' }}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registering...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Register
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="login-text" style={{ textAlign: 'center', marginTop: '10px' }}>
            have an account?
            <Link to="/login" className="login-link">login now!</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
