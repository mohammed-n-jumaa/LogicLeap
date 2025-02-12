import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container,Modal } from 'react-bootstrap';
import Header from '../components/header';
import Footer from '../components/footer';

const CustomServiceForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceEmail, setServiceEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [serviceBudget, setServiceBudget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setShowModal(true); // Show success modal
    // Clear form fields
    setServiceName('');
    setServiceEmail('');
    setServiceType('');
    setServiceDetails('');
    setServiceBudget('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Header/>
    <div id="carouselExampleDark" className="carousel-inner" data-bs-ride="carousel">
    <div className="carousel-item active">
      <img src="assets/img/code5.jpg" className="d-block w-100" alt="Image" />
      <div className="overlay-text">
        <div className="  container">
          <h1>Courses</h1>
          <nav className=" breadcrumbs">
            <ol>
              <li><a href="/home">Home</a></li>
              <li><span>/</span></li>
              <li className="current">Courses</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
    <h2 className="text-center mb-4 page-title light-background">Request Custom Courses</h2>
    <div className="container">
      <div className="service-request-container">
        {/* <h2 className="text-center mb-4">Request Custom Service</h2> */}
        {/* <div className="page-title light-background"> */}
        {/* <nav className="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li className="current">Starter Page</li>
          </ol> 
        </nav> */}
      {/* </div> */}
    
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="serviceName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serviceName" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNamber"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serviceEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="serviceEmail"
              value={serviceEmail}
              onChange={(e) => setServiceEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="serviceType" className="form-label">
              Courses
            </label>
            <select
              className="form-select"
              id="Courses"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
              <option value="">Front-End</option>
              <option value="web-development">Back-End</option>
              <option value="mobile-app">UI/UX</option>
              <option value="data-analysis">Data Analysis</option>
              <option value="cloud-services">Cloud Services</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="serviceDetails" className="form-label">
              lavel
            </label>
            <textarea
              className="form-control"
              id="serviceDetails"
              rows="4"
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
              required
              placeholder="Describe your custom service requirements"
            ></textarea>
          </div> */}
          <div className="mb-3">
            <label htmlFor="servicebudget" className="form-label">
              Nots
            </label>
            <input
              type="text"
              className="form-control"
              id="servicebudget"
              value={serviceBudget}
              onChange={(e) => setServiceBudget(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="termsCheck" required />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to the terms and conditions
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit Service Request
          </button>
        </form>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your service request has been submitted successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CustomServiceForm;
