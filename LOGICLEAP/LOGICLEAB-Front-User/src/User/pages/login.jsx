import React, { useState } from 'react';
import '../assets/css/reg.css';
import Header from '../components/header';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role === 'user') {
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          onLogin();
          
          // Replace alert with SweetAlert2
          await Swal.fire({
            title: 'Welcome!',
            text: 'You have successfully logged in',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#28a745',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });

          const from = location.state?.from?.pathname || '/home';
          navigate(from, { replace: true });
        } else {
          setError('You are not authorized to access this page.');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <>
      <style>
        {`
          :root {
            --primary-red: #ff3333;
            --primary-green: #28a745;
            --accent-red: #ff6b6b;
            --accent-green: #34eb74;
          }

          body, html {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            overflow: hidden;
            background: #fff;
          }

          .page-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 80px);
            padding-top: 80px;
          }

          .login-container {
            background: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 400px;
            width: 100%;
            text-align: center;
          }

          .logo-container {
            margin-bottom: 20px;
          }

          .form-floating {
            position: relative;
            margin-bottom: 15px;
          }

          .form-floating input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .register-text {
            margin-top: 15px;
            font-size: 14px;
          }

          .register-text a {
            color: var(--primary-red);
            text-decoration: none;
          }

          .error-message {
            color: var(--primary-red);
            margin-bottom: 15px;
          }

          .btn-login {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 10px;
            font-size: 16px;
            background-color: var(--primary-green);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .btn-login:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .spinner-border {
            width: 1rem;
            height: 1rem;
            border-width: 0.2em;
          }
        `}
      </style>
      <Header />
      <div className="page-container">
        <div className="login-container">
          <div className="logo-container">
            <div className="logo">
              <span className="L1">L</span>
              <span className="ogic">ogic</span>
              <span className="L2">L</span>
              <span className="eap">eap</span>
            </div>
            <div className="logo-text">User Portal</div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address" 
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password" 
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Sign In
                </>
              )}
            </button>

            <div className="register-text">
              <span>Don't have an account?</span>{' '}
              <a href="/register">Register now!</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;