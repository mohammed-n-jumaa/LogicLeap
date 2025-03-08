import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import validator from 'validator';
import Swal from 'sweetalert2';
import '../assets/css/reg.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [validations, setValidations] = useState({
    name: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    phone: { isValid: true, message: '' },
    password: { isValid: true, message: '', checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }},
    confirmPassword: { isValid: true, message: '' }
  });

  useEffect(() => {
    const icons = document.querySelectorAll('.input-icon');
    icons.forEach(icon => icon.classList.add('animated-icon'));
  }, []);

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newValidations = { ...validations };

    switch (name) {
      case 'name':
        newValidations.name = {
          isValid: value.length >= 3,
          message: value.length < 3 ? 'Name must be at least 3 characters long' : ''
        };
        break;

      case 'email':
        newValidations.email = {
          isValid: validator.isEmail(value),
          message: validator.isEmail(value) ? '' : 'Please enter a valid email address'
        };
        break;

      case 'phone':
        newValidations.phone = {
          isValid: validator.isMobilePhone(value),
          message: validator.isMobilePhone(value) ? '' : 'Please enter a valid phone number'
        };
        break;

      case 'password':
        const checks = validatePassword(value);
        const isValid = Object.values(checks).every(check => check);
        newValidations.password = {
          isValid,
          checks,
          message: isValid ? '' : 'Password must meet all requirements'
        };
        if (formData.confirmPassword) {
          newValidations.confirmPassword = {
            isValid: value === formData.confirmPassword,
            message: value === formData.confirmPassword ? '' : 'Passwords do not match'
          };
        }
        break;

      case 'confirmPassword':
        newValidations.confirmPassword = {
          isValid: value === formData.password,
          message: value === formData.password ? '' : 'Passwords do not match'
        };
        break;

      default:
        break;
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

    const submitData = {
      ...formData,
      password_confirmation: formData.confirmPassword
    };
  
    setIsLoading(true);
  
    try {
      const response = await fetch('https://logicleap-769836b54d38.herokuapp.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        Swal.fire({
          title: 'Registration successful!',
          text: 'You will be directed to the login page',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          navigate('/login'); 
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Registration failed. Please try again.',
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
            <div className="logo-text">User Registration</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <div className="form-floating position-relative">
                  <input
                    type="text"
                    className={`form-control ${!validations.name.isValid && formData.name ? 'is-invalid' : formData.name && validations.name.isValid ? 'is-valid' : ''}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                  <label>Full Name</label>
                  <i className={`fas fa-user input-icon ${!validations.name.isValid && formData.name ? 'text-danger' : formData.name && validations.name.isValid ? 'text-success' : ''}`}></i>
                  {!validations.name.isValid && formData.name && (
                    <div className="invalid-feedback">{validations.name.message}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <div className="form-floating position-relative">
                  <input
                    type="email"
                    className={`form-control ${!validations.email.isValid && formData.email ? 'is-invalid' : formData.email && validations.email.isValid ? 'is-valid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <label>Email Address</label>
                  <i className={`fas fa-envelope input-icon ${!validations.email.isValid && formData.email ? 'text-danger' : formData.email && validations.email.isValid ? 'text-success' : ''}`}></i>
                  {!validations.email.isValid && formData.email && (
                    <div className="invalid-feedback">{validations.email.message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <div className="form-floating position-relative">
                  <input
                    type="password"
                    className={`form-control ${!validations.password.isValid && formData.password ? 'is-invalid' : formData.password && validations.password.isValid ? 'is-valid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <label>Password</label>
                  <i className={`fas fa-lock input-icon ${!validations.password.isValid && formData.password ? 'text-danger' : formData.password && validations.password.isValid ? 'text-success' : ''}`}></i>
                </div>
                {formData.password && !validations.password.isValid && (
                  <div className="password-requirements mt-2">
                    {!validations.password.checks.length && (
                      <div className="requirement text-danger">
                        <i className="fas fa-times"></i>
                        At least 8 characters
                      </div>
                    )}
                    {!validations.password.checks.uppercase && (
                      <div className="requirement text-danger">
                        <i className="fas fa-times"></i>
                        One uppercase letter
                      </div>
                    )}
                    {!validations.password.checks.lowercase && (
                      <div className="requirement text-danger">
                        <i className="fas fa-times"></i>
                        One lowercase letter
                      </div>
                    )}
                    {!validations.password.checks.number && (
                      <div className="requirement text-danger">
                        <i className="fas fa-times"></i>
                        One number
                      </div>
                    )}
                    {!validations.password.checks.special && (
                      <div className="requirement text-danger">
                        <i className="fas fa-times"></i>
                        One special character
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-2">
                <div className="form-floating position-relative">
                  <input
                    type="password"
                    className={`form-control ${!validations.confirmPassword.isValid && formData.confirmPassword ? 'is-invalid' : formData.confirmPassword && validations.confirmPassword.isValid ? 'is-valid' : ''}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  <label>Confirm Password</label>
                  <i className={`fas fa-lock input-icon ${!validations.confirmPassword.isValid && formData.confirmPassword ? 'text-danger' : formData.confirmPassword && validations.confirmPassword.isValid ? 'text-success' : ''}`}></i>
                  {!validations.confirmPassword.isValid && formData.confirmPassword && (
                    <div className="invalid-feedback">{validations.confirmPassword.message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2 mx-auto">
                <div className="form-floating position-relative">
                  <input
                    type="tel"
                    className={`form-control ${!validations.phone.isValid && formData.phone ? 'is-invalid' : formData.phone && validations.phone.isValid ? 'is-valid' : ''}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  <label>Phone Number</label>
                  <i className={`fas fa-phone input-icon ${!validations.phone.isValid && formData.phone ? 'text-danger' : formData.phone && validations.phone.isValid ? 'text-success' : ''}`}></i>
                  {!validations.phone.isValid && formData.phone && (
                    <div className="invalid-feedback">{validations.phone.message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
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
          </form>

          <div className="text-center mt-3">
            Already have an account?
            <Link to="/login" className="ms-2 text-primary text-decoration-none">Login now!</Link>
          </div>
        </div>
      </div>

      <style>{`
        .password-requirements {
          font-size: 0.85rem;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        
        .requirement {
          margin: 5px 0;
          transition: all 0.3s ease;
        }
        
        .requirement i {
          margin-right: 8px;
          width: 16px;
        }
        
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
      `}</style>
    </>
  );
};

export default RegistrationPage;