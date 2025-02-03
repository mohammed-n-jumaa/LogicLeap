// src/pages/ServiceManagement.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.min.css';
import Header from '../components/Header'; 

const ServiceManagement = () => {
    const [services, setServices] = useState([
        { id: 1, title: 'Web Development', description: 'Creating responsive websites', category: 10, price: '$1500.00', status: 'active' },
        { id: 2, title: 'Graphic Design', description: 'Designing visual content', category: 11, price: '$800.00', status: 'active' },
        { id: 3, title: 'SEO Services', description: 'Search Engine Optimization', category: 12, price: '$1200.00', status: 'inactive' },
    ]);

    const [modalService, setModalService] = useState(null);

    const openModal = (service) => {
        setModalService(service);
    };

    const closeModal = () => {
        setModalService(null);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <Header /> 
                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <a href="/add-service">
                                            <button className="btn btn-primary">Add Service</button>
                                        </a>
                                    </div>
                                    <h5 className="card-title fw-semibold" style={{ flex: 1, textAlign: 'center' }}>Service Management</h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table text-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="border-2 border-bottom border-primary border-0">
                                                <th scope="col">ID</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Category ID</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service) => (
                                                <tr key={service.id}>
                                                    <td>{service.id}</td>
                                                    <td>{service.title}</td>
                                                    <td>{service.description}</td>
                                                    <td>{service.category}</td>
                                                    <td>{service.price}</td>
                                                    <td><span className={`badge bg-${service.status === 'active' ? 'success' : 'danger'}`}>{service.status}</span></td>
                                                    <td>
                                                        <i className="fas fa-edit" onClick={() => openModal(service)} style={{ cursor: 'pointer' }}></i>
                                                        <i className="fas fa-trash" style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for Editing Service */}
                {modalService && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Service</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSaveChanges}>
                                        <div className="mb-3">
                                            <label htmlFor="serviceTitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="serviceTitle" defaultValue={modalService.title} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="serviceDescription" className="form-label">Description</label>
                                            <textarea className="form-control" id="serviceDescription" defaultValue={modalService.description} required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="serviceCategory" className="form-label">Category ID</label>
                                            <input type="number" className="form-control" id="serviceCategory" defaultValue={modalService.category} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="servicePrice" className="form-label">Price</label>
                                            <input type="text" className="form-control" id="servicePrice" defaultValue={modalService.price} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="serviceStatus" className="form-label">Status</label>
                                            <select className="form-select" id="serviceStatus" defaultValue={modalService.status} required>
                                                <option value="" disabled>Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceManagement;