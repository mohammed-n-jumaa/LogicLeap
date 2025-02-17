import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header';
import Swal from 'sweetalert2';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validations, setValidations] = useState({
    email: { isValid: true, message: '' },
    password: { isValid: true, message: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newValidations = { ...validations };
    if (name === 'email') {
      newValidations.email = {
        isValid: value.length > 0,
        message: value.length === 0 ? 'Email is required' : ''
      };
    } else if (name === 'password') {
      newValidations.password = {
        isValid: value.length > 0,
        message: value.length === 0 ? 'Password is required' : ''
      };
    }
    setValidations(newValidations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isFormValid = Object.values(validations).every(field => field.isValid);
    if (!isFormValid) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please check all fields and try again',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role === 'user') {
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          onLogin();

          await Swal.fire({
            title: 'Welcome!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true
          });

          const from = location.state?.from?.pathname || '/home';
          navigate(from, { replace: true });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'You are not authorized to access this page.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Login failed. Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Connection error. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="page-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '100px' }}>
        <div className="register-container" style={{ width: '100%', maxWidth: '500px', padding: '15px' }}>
          <div className="logo-container" style={{ textAlign: 'center', marginBottom: '15px' }}>
            <div className="logo">
              <span className="L1">L</span>
              <span className="ogic">ogic</span>
              <span className="L2">L</span>
              <span className="eap">eap</span>
            </div>
            <div className="logo-text">User Login</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="form-floating position-relative">
                  <input
                    type="email"
                    className={`form-control ${!validations.email.isValid ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <label>Email Address</label>
                  <i className={`fas fa-envelope input-icon ${!validations.email.isValid ? 'text-danger' : ''}`}></i>
                  {!validations.email.isValid && (
                    <div className="invalid-feedback">{validations.email.message}</div>
                  )}
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="form-floating position-relative">
                  <input
                    type="password"
                    className={`form-control ${!validations.password.isValid ? 'is-invalid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <label>Password</label>
                  <i className={`fas fa-lock input-icon ${!validations.password.isValid ? 'text-danger' : ''}`}></i>
                  {!validations.password.isValid && (
                    <div className="invalid-feedback">{validations.password.message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
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
            </div>
          </form>

          <div className="text-center mt-3">
            Don't have an account?
            <Link to="/register" className="ms-2 text-primary text-decoration-none">Register now!</Link>
          </div>
        </div>
      </div>

      <style>{`
        .form-floating {
          margin-bottom: 0;
        }
        
        .input-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          box-shadow: none;
          border-color: #80bdff;
        }
        
        .form-control.is-valid:focus,
        .form-control.is-invalid:focus {
          box-shadow: none;
        }
        
        .invalid-feedback {
          margin-top: 0.25rem;
          font-size: 0.875em;
        }

        .register-container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .register-container {
            padding: 15px;
            margin: 10px;
          }
        }

        .animated-icon {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default LoginPage;