// src/pages/AddService.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.min.css';

const AddService = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Service added");
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-4">Add Service</h5>
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="serviceId" className="form-label">ID</label>
                                                    <input type="text" className="form-control" id="serviceId" readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="serviceTitle" className="form-label">Title</label>
                                                    <input type="text" className="form-control" id="serviceTitle" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="serviceDescription" className="form-label">Description</label>
                                                    <textarea className="form-control" id="serviceDescription" rows="3" required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="categoryId" className="form-label">Category ID</label>
                                                    <input type="text" className="form-control" id="categoryId" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="servicePrice" className="form-label">Price</label>
                                                    <input type="text" className="form-control" id="servicePrice" required />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="serviceStatus" className="form-label">Status</label>
                                                    <select className="form-control" id="serviceStatus" required>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;