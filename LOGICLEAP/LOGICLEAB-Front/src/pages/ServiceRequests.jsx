import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.min.css';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner

const ServiceRequests = () => {
    const [requests, setRequests] = useState([]);
    const [modalRequest, setModalRequest] = useState(null);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    // حالات البحث والصفحات
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true); // Set loading to true before fetching data
            try {
                const response = await axios.get('http://localhost:8000/api/service-requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching service requests:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching data
            }
        };

        fetchRequests();
    }, []);

    // تصفية الطلبات بناءً على البحث
    const filteredRequests = requests.filter(request =>
        request.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // منطق الصفحات
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

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

    const handleUpdate = () => {
        const updatedRequest = {
            id: modalRequest.id,
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            service_type: document.getElementById('editServiceType').value,
            status: document.getElementById('editStatus').value
        };

        axios.put(`http://localhost:8000/api/service-requests/${modalRequest.id}`, updatedRequest)
            .then(response => {
                setRequests(requests.map(req => req.id === response.data.id ? response.data : req));
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error updating service request:', error);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/service-requests/${id}`)
                    .then(() => {
                        setRequests(requests.filter(req => req.id !== id));
                        Swal.fire('Deleted!', 'Service request has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting service request:', error);
                    });
            }
        });
    };

    // Show loading spinner if loading
    if (isLoading) {
        return (
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <Header />

                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Service Requests</h5>

                                {/* Search and Controls Section */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="search-box">
                                        <div className="input-group" style={{ width: '250px' }}>
                                            <span className="input-group-text border-primary bg-primary">
                                                <i className="fas fa-search text-white"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control border-primary"
                                                placeholder="Search requests..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <select
                                        className="form-select border-primary"
                                        style={{ width: '100px' }}
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>

                                {/* Table Section */}
                                <div className="table-responsive">
                                    <table className="table text-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="border-2 border-bottom border-primary border-0">
                                                <th scope="col">Request ID</th>
                                                <th scope="col">User Name</th>
                                                <th scope="col">Service Name</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col" className="text-center">Phone</th>
                                                <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRequests.map((request) => (
                                                <tr key={request.id}>
                                                    <th scope="row">{request.id}</th>
                                                    <td>{request.user ? request.user.name : 'Loading...'}</td>
                                                    <td>{request.site_service ? request.site_service.title : 'Loading...'}</td>
                                                    <td>{request.name}</td>
                                                    <td>{request.email}</td>
                                                    <td className="text-center">{request.phone}</td>
                                                    <td className="text-center">
                                                        <i className="fas fa-eye" onClick={() => handleView(request)} style={{ cursor: 'pointer' }}></i>
                                                        <i className="fas fa-edit" style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleEdit(request)}></i>
                                                        <i className="fas fa-trash" style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDelete(request.id)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="text-muted fs-13">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRequests.length)} of {filteredRequests.length} entries
                                    </div>
                                    <nav>
                                        <ul className="pagination pagination-primary mb-0">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                                    <i className="fas fa-chevron-left"></i>
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                                    <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
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
                                                            <p><strong>User Name:</strong> {modalRequest.userId} ({modalRequest.user?.name})</p>
                                                            <p><strong>Service Name:</strong> {modalRequest.serviceId} ({modalRequest.site_service?.title})</p>
                                                            <p><strong>Name:</strong> {modalRequest.name}</p>
                                                            <p><strong>Email:</strong> {modalRequest.email}</p>
                                                            <p><strong>Phone:</strong> {modalRequest.phone}</p>
                                                            <p><strong>Service Type:</strong> {modalRequest.service_type}</p>
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
                                                            <select className="form-select" id="editServiceType" defaultValue={modalRequest?.service_type} required>
                                                                <option value="Website Development">Website Development</option>
                                                                <option value="Custom Training">Custom Training</option>
                                                                <option value="Other">Other</option>
                                                            </select>
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
                                                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceRequests;