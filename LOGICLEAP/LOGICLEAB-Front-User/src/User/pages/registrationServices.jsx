import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { FaUserAlt, FaEnvelope, FaPhone, FaListAlt, FaInfoCircle } from 'react-icons/fa';

const CustomServiceForm = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceEmail, setServiceEmail] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch available services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/site-services');
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services');
        setLoading(false);
        console.error('Error fetching services:', err);
      }
    };

    // Fetch current user if authenticated
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setCurrentUser(response.data);
          setUserId(response.data.id);
        } else {
          setUserId(1);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setUserId(1);
      }
    };

    fetchServices();
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      setError(''); 
      
      const serviceData = {
        name: serviceName,
        email: serviceEmail,
        phone: servicePhone,
        details: serviceDetails,
        service_id: parseInt(serviceId),
        user_id: userId
      };

      console.log('Submitting data:', serviceData);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(
        'http://localhost:8000/api/service-requests', 
        serviceData,
        config
      );
      
      console.log('Response:', response.data); 
      
      // Show success toast
      toast.success('Your request has been submitted successfully! We will contact you soon.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Clear form fields
      setServiceName('');
      setServiceEmail('');
      setServicePhone('');
      setServiceDetails('');
      setServiceId('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      
      // Detailed error handling
      if (err.response) {
        console.error('Error response:', err.response.data);
        if (err.response.data && err.response.data.message) {
          setError(`Server error: ${err.response.data.message}`);
          toast.error(`Server error: ${err.response.data.message}`);
        } else if (err.response.data && err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat();
          setError(`Validation errors: ${errorMessages.join(', ')}`);
          toast.error(`Validation errors: ${errorMessages.join(', ')}`);
        } else {
          setError(`Failed to submit service request (${err.response.status})`);
          toast.error(`Failed to submit service request (${err.response.status})`);
        }
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('No response received from server. Please check your connection.');
        toast.error('No response received from server. Please check your connection.');
      } else {
        console.error('Error message:', err.message);
        setError(`Request failed: ${err.message}`);
        toast.error(`Request failed: ${err.message}`);
      }
    }
  };

  return (
    <div className="main">
      <Header />
      
      {/* Hero section with new gradient background */}
      <div className="service-hero-section py-5 text-white text-center" style={{
        background: `linear-gradient(135deg, #a7d477 0%, #df1529 100%)`,
        padding: '60px 0',
        marginBottom: '40px',
      }}>
        <div className="container" style={{ marginTop: '70px' }}>
          <h1 className="display-4 fw-bold mb-3">Request Custom Service</h1>
          <p className="lead mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
            We believe that every client is unique, which is why we offer services customized to meet your individual needs.
            Fill out the form below and we will tailor our services to match your specific requirements.
          </p>
        </div>
      </div>
      
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Process description section - positioned lower as requested */}
            <div className="service-description text-center mb-5" style={{ marginTop: '50px' }}>
              <h2 className="mb-4">How Our Custom Services Work</h2>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <div className="icon-circle mb-3 mx-auto" style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span className="fs-1" style={{ color: '#df1529' }}>1</span>
                      </div>
                      <h5 className="card-title">Submit Request</h5>
                      <p className="card-text">Fill out the form with details of the service you need.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <div className="icon-circle mb-3 mx-auto" style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span className="fs-1" style={{ color: '#df1529' }}>2</span>
                      </div>
                      <h5 className="card-title">Receive Quote</h5>
                      <p className="card-text">Our team will contact you with a customized quote for your needs.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <div className="icon-circle mb-3 mx-auto" style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span className="fs-1" style={{ color: '#df1529' }}>3</span>
                      </div>
                      <h5 className="card-title">Enjoy Service</h5>
                      <p className="card-text">We deliver the service with the highest standards of quality and professionalism.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="service-request-container bg-white p-4 p-md-5 rounded-lg shadow">
              <h3 className="text-center mb-4">Service Request Form</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="serviceName" className="form-label fw-bold">
                    <FaUserAlt className="me-2" style={{ color: '#a7d477' }} /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="serviceName"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="serviceEmail" className="form-label fw-bold">
                    <FaEnvelope className="me-2" style={{ color: '#a7d477' }} /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="serviceEmail"
                    value={serviceEmail}
                    onChange={(e) => setServiceEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="servicePhone" className="form-label fw-bold">
                    <FaPhone className="me-2" style={{ color: '#a7d477' }} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    id="servicePhone"
                    value={servicePhone}
                    onChange={(e) => setServicePhone(e.target.value)}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="serviceId" className="form-label fw-bold">
                    <FaListAlt className="me-2" style={{ color: '#a7d477' }} /> Service Name
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="serviceId"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    required
                  >
                    <option value="">Select a Service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title || service.name || 'Unnamed Service'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="serviceDetails" className="form-label fw-bold">
                    <FaInfoCircle className="me-2" style={{ color: '#a7d477' }} /> Service Details
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="serviceDetails"
                    rows="5"
                    value={serviceDetails}
                    onChange={(e) => setServiceDetails(e.target.value)}
                    required
                    placeholder="Describe your custom service requirements in detail"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-lg w-100 py-3"
                  disabled={loading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    backgroundColor: isHovered ? '#a7d477' : '#df1529',
                    border: 'none',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Service Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast container for notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Footer />
    </div>
  );
};

export default CustomServiceForm;