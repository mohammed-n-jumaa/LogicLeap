// src/pages/ServiceRequests.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.min.css';
import Header from '../components/Header'; 

const ServiceRequests = () => {
    const [requests, setRequests] = useState([
        { id: 1, userId: 101, serviceId: 201, name: 'Ahmad', email: 'ahmad@gmail.com', phone: '0781617814', serviceType: 'Website Development', status: 'In Progress' },
        { id: 2, userId: 102, serviceId: 202, name: 'Mohammad', email: 'mohammad@gmail.com', phone: '0772827918', serviceType: 'Custom Training', status: 'Pending' },
        { id: 3, userId: 103, serviceId: 203, name: 'Hamza', email: 'hamza@gmail.com', phone: '0797563837', serviceType: 'Other', status: 'Completed' },
    ]);

    const [modalRequest, setModalRequest] = useState(null);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleView = (request) => {
        setModalRequest(request);
        setViewModalOpen(true);
    };

    const handleEdit = (request) => {
        setModalRequest(request);
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setViewModalOpen(false);
        setEditModalOpen(false);
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <Header /> 

                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Service Requests</h5>
                                <div className="table-responsive">
                                    <table className="table text-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="border-2 border-bottom border-primary border-0">
                                                <th scope="col">Request ID</th>
                                                <th scope="col">User ID</th>
                                                <th scope="col">Service ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col" className="text-center">Phone</th>
                                                <th scope="col" className="text-center">Service Type</th>
                                                <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.map((request) => (
                                                <tr key={request.id}>
                                                    <th scope="row">{request.id}</th>
                                                    <td>{request.userId}</td>
                                                    <td>{request.serviceId}</td>
                                                    <td>{request.name}</td>
                                                    <td>{request.email}</td>
                                                    <td className="text-center">{request.phone}</td>
                                                    <td className="text-center">{request.serviceType}</td>
                                                    <td className="text-center">
                                                        <i className="fas fa-eye" onClick={() => handleView(request)} style={{ cursor: 'pointer' }}></i>
                                                        <i className="fas fa-edit" style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleEdit(request)}></i>
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

                {/* View Modal */}
                {isViewModalOpen && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="viewModalLabel">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="viewModalLabel">Service Request Details</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    {modalRequest && (
                                        <>
                                            <p><strong>Request ID:</strong> {modalRequest.id}</p>
                                            <p><strong>User ID:</strong> {modalRequest.userId}</p>
                                            <p><strong>Service ID:</strong> {modalRequest.serviceId}</p>
                                            <p><strong>Name:</strong> {modalRequest.name}</p>
                                            <p><strong>Email:</strong> {modalRequest.email}</p>
                                            <p><strong>Phone:</strong> {modalRequest.phone}</p>
                                            <p><strong>Service Type:</strong> {modalRequest.serviceType}</p>
                                            <p><strong>Status:</strong> {modalRequest.status}</p>
                                        </>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Edit Service Request</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <form id="editForm">
                                        <input type="hidden" value={modalRequest?.id} />
                                        <div className="mb-3">
                                            <label htmlFor="editName" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="editName" defaultValue={modalRequest?.name} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editEmail" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="editEmail" defaultValue={modalRequest?.email} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editPhone" className="form-label">Phone</label>
                                            <input type="text" className="form-control" id="editPhone" defaultValue={modalRequest?.phone} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editServiceType" className="form-label">Service Type</label>
                                            <input type="text" className="form-control" id="editServiceType" defaultValue={modalRequest?.serviceType} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editStatus" className="form-label">Status</label>
                                            <select className="form-select" id="editStatus" defaultValue={modalRequest?.status} required>
                                                <option value="pending">Pending</option>
                                                <option value="in progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        alert('Changes saved!');
                                        handleCloseModal();
                                    }}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceRequests;