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
    <h2 className="text-center mb-4 page-title light-background">Request Custom Service</h2>
    <div className="container">
      <div className="service-request-container">
        {/* <h2 className="text-center mb-4">Request Custom Service</h2> */}
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
              Service Type
            </label>
            <select
              className="form-select"
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
              <option value="">Select Service</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile App Development</option>
              <option value="data-analysis">Data Analysis</option>
              <option value="cloud-services">Cloud Services</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="serviceDetails" className="form-label">
              Service Details
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
          </div>
          <div className="mb-3">
            <label htmlFor="servicebudget" className="form-label">
              Estimated Budget
            </label>
            <input
              type="number"
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
