import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Modal } from 'react-bootstrap';
import Header from '../components/header';
import Footer from '../components/footer';

const CustomServiceForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    details: '',
    status: 'pending', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., sending data to the server)
    console.log('Form Data:', formData);

    setShowModal(true); // Show success modal
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      service_type: '',
      details: '',
      status: 'pending', // Reset status to default
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <h2 className="text-center mb-4 page-title light-background">Request Custom Service</h2>
      <div className="container">
        <div className="service-request-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="service_type" className="form-label">
                Service Type
              </label>
              <select
                className="form-select"
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Service</option>
                <option value="Website Development">Website Development</option>
                <option value="Custom Training">Custom Training</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="details" className="form-label">
                Service Details
              </label>
              <textarea
                className="form-control"
                id="details"
                name="details"
                rows="4"
                value={formData.details}
                onChange={handleChange}
                required
                placeholder="Describe your custom service requirements"
              ></textarea>
            </div>
           
            <button type="submit" className="btn btn-primary w-100">
              Submit Service Request
            </button>
          </form>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your service request has been submitted successfully!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomServiceForm;
