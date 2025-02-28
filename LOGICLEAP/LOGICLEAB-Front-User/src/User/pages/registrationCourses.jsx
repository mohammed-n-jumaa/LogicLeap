import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner, Alert } from 'react-bootstrap';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CustomServiceForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [programActive, setProgramActive] = useState(true); // New state for program status
  
  const { id: urlParamId } = useParams();
  const query = useQuery();
  const queryParamId = query.get('program');
  const navigate = useNavigate(); // For redirecting users

  const programId = queryParamId || urlParamId;

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);
        console.log('Fetching form data for program ID:', programId);
        
        if (!programId) {
          setError('No program ID provided');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`http://localhost:8000/api/forms?program_id=${programId}`);
        console.log('API Response:', response.data);

        if (response.data && response.data.length > 0) {
          setFormData(response.data[0]);

          // Check program status
          if (response.data[0].program && response.data[0].program.status !== 'active') {
            setProgramActive(false);
            // You could redirect here instead of showing an error message
            // navigate('/inactive-program'); // If you have a dedicated page
            
            setError('This program is currently not active');
          } else {
            const initialValues = {};
            response.data[0].fields.forEach(field => {
              initialValues[field.name] = '';
            });
            setFormValues(initialValues);
          }
        } else {
          setError('No form found for this program');
        }
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError('Error loading form: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [programId, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setFormSubmitted(true);
      console.log('Submitting form values:', formValues);

      // Get authentication token from localStorage
      const token = localStorage.getItem('auth_token'); // or however you store your auth token
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post('http://localhost:8000/api/form-submissions', {
        form_id: formData.id,
        program_id: formData.program_id,
        values: formValues
      }, { headers });

      console.log('Form submission response:', response.data);
      
      // Show success toast notification
      toast.success('Your request has been sent successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      const resetValues = {};
      formData.fields.forEach(field => {
        resetValues[field.name] = '';
      });
      setFormValues(resetValues);
      setFormSubmitted(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      
      // Check if it's an authentication error
      if (err.response?.status === 401) {
        // Redirect to login page
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        toast.error('Please log in to submit this form', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setError('Error submitting form: ' + (err.response?.data?.message || err.message));
        
        // Show error toast notification
        toast.error('An error occurred while submitting the form. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      
      setFormSubmitted(false);
    }
  };

  // Render form field based on type
  const renderField = (field) => {
    const { name, label, type, required, question, options } = field;

    switch (type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="form-label fw-bold">
              {label}
            </label>
            {question && (
              <div className="form-text text-muted mb-2">{question}</div>
            )}
            <input
              type={type}
              className="form-control form-control-lg rounded-pill border-primary"
              id={name}
              name={name}
              value={formValues[name] || ''}
              onChange={handleInputChange}
              required={required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="form-label fw-bold">
              {label}
            </label>
            {question && (
              <div className="form-text text-muted mb-2">{question}</div>
            )}
            <textarea
              className="form-control border-primary rounded-3"
              id={name}
              name={name}
              value={formValues[name] || ''}
              onChange={handleInputChange}
              required={required}
              rows="4"
            />
          </div>
        );

      case 'select':
        return (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="form-label fw-bold">
              {label}
            </label>
            {question && (
              <div className="form-text text-muted mb-2">{question}</div>
            )}
            <select
              className="form-select form-select-lg rounded-pill border-primary"
              id={name}
              name={name}
              value={formValues[name] || ''}
              onChange={handleInputChange}
              required={required}
            >
              <option value="">-- Select --</option>
              {options && options.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div className="mb-4" key={name}>
            {question && (
              <div className="form-text text-muted mb-2">{question}</div>
            )}
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input border-primary"
                id={name}
                name={name}
                checked={formValues[name] || false}
                onChange={handleInputChange}
                required={required}
                style={{ width: '1.25rem', height: '1.25rem' }}
              />
              <label className="form-check-label fw-bold ms-2" htmlFor={name}>
                {label}
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // If program is not active, you can redirect or show a custom message
  if (!loading && !programActive) {
    return (
      <>
        <Header />
        <div className="bg-light py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card shadow border-0 rounded-4">
                  <div className="card-body p-5 text-center">
                    <div className="mb-4">
                      <i className="bi bi-exclamation-circle text-warning" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h2 className="card-title mb-3 fw-bold">Program Not Available</h2>
                    <p className="lead mb-4">This program is currently inactive or not available for registration.</p>
                    <a href="/courses2" className="btn btn-primary btn-lg rounded-pill px-5">
                      View Available Programs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Toast Container Component */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div id="carouselExampleDark" className="carousel-inner" data-bs-ride="carousel">
        <div className="carousel-item active">
          <img src="assets/img/code5.jpg" className="d-block w-100" alt="Image" />
          <div className="overlay-text">
            <div className="container">
              <h1>{formData.program?.title || 'Courses'}</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li><a href="/home">Home</a></li>
                  <li><span>/</span></li>
                  <li className="current">{formData.program?.title || 'Courses'}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4 page-title fw-bold">
            {formData.title || 'Request Custom Courses'}
          </h2>

          {/* Form Container with description beside it */}
          <div className="row">
            {/* Description Column - Only shown when there's a description */}
            {formData.description && (
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4 d-flex flex-column justify-content-center">
                    <h4 className="card-title mb-3 fw-bold">About This Program</h4>
                    <p className="lead mb-0">{formData.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Column - Takes full width if no description */}
            <div className={formData.description ? "col-md-8" : "col-md-8 mx-auto"}>
              <div className="service-request-container p-4 border-0 rounded-4 shadow bg-white">
                {loading ? (
                  <div className="text-center my-5">
                    <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : error ? (
                  <Alert variant="danger" className="rounded-3 shadow-sm">{error}</Alert>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="p-3">
                      {formData.fields && formData.fields.map(field => renderField(field))}

                      <div className="d-grid gap-2 mt-5">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg rounded-pill py-3 shadow-sm"
                          disabled={formSubmitted}
                        >
                          {formSubmitted ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Sending...
                            </>
                          ) : (
                            'Submit Request'
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomServiceForm;