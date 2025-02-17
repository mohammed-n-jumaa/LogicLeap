import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/styles.min.css';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [modalService, setModalService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editService, setEditService] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
        status: '',
    });
    
    // Search and pagination states
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/site-services');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const servicesData = await response.json();
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire('Error', 'Failed to load data', 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            setIsLoading(true);
        };
    }, []);

    // Filter services based on search
    const filteredServices = services.filter(service => 
        service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.price?.toString().includes(searchQuery.toLowerCase()) ||
        service.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const openModal = (service) => {
        setModalService(service);
        setEditService(service);
    };

    const closeModal = () => {
        setModalService(null);
    };

    const saveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/site-services/${editService.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editService),
            });

            if (!response.ok) {
                throw new Error('Failed to update service');
            }

            const updatedService = await response.json();
            setServices(services.map((service) => 
                service.id === editService.id ? updatedService : service
            ));
            closeModal();
            Swal.fire('Success', 'Service updated successfully', 'success');
        } catch (error) {
            console.error('Error updating service:', error);
            Swal.fire('Error', 'Failed to update service', 'error');
        }
    };

    const deleteService = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8000/api/site-services/${id}`, { 
                        method: 'DELETE' 
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete service');
                    }

                    setServices(services.filter((service) => service.id !== id));
                    Swal.fire('Deleted!', 'Service has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting service:', error);
                    Swal.fire('Error', 'Failed to delete service', 'error');
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="page-wrapper">
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
                                <h5 className="card-title fw-semibold mb-4">Service Management</h5>

                                {/* Search and Controls Section */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="search-box">
                                            <div className="input-group" style={{ width: '250px' }}>
                                                <span className="input-group-text border-primary bg-primary">
                                                    <i className="fas fa-search text-white"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-primary"
                                                    placeholder="Search services..."
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
                                    <a href="/add-service" className="btn btn-primary btn-sm" style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }}>Add Service</a>
                                </div>

                                {/* Table Section */}
                                <div className="table-responsive">
                                    <table className="table text-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="border-2 border-bottom border-primary border-0">
                                                <th scope="col">ID</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                                <th scope="col" className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentServices.map((service) => (
                                                <tr key={service.id}>
                                                    <td>{service.id}</td>
                                                    <td>{service.title}</td>
                                                    <td>{service.description}</td>
                                                    <td>{service.price}</td>
                                                    <td>
                                                        <span className={`badge bg-${service.status === 'active' ? 'success' : 'danger'}`}>
                                                            {service.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <i className="fas fa-edit" onClick={() => openModal(service)} style={{ cursor: 'pointer' }}></i>
                                                        <i className="fas fa-trash" style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => deleteService(service.id)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="text-muted fs-13">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredServices.length)} of {filteredServices.length} entries
                                    </div>
                                    <nav>
                                        <ul className="pagination pagination-primary mb-0">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" 
                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                                    <i className="fas fa-chevron-left"></i>
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" 
                                                            onClick={() => setCurrentPage(i + 1)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" 
                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                                    <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
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
                                                    <form>
                                                        <div className="mb-3">
                                                            <label htmlFor="serviceTitle" className="form-label">Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editService.title}
                                                                onChange={(e) => setEditService({ ...editService, title: e.target.value })}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="serviceDescription" className="form-label">Description</label>
                                                            <textarea
                                                                className="form-control"
                                                                value={editService.description}
                                                                onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                                                                required
                                                            ></textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="servicePrice" className="form-label">Price</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editService.price}
                                                                onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="serviceStatus" className="form-label">Status</label>
                                                            <select
                                                                className="form-select"
                                                                value={editService.status}
                                                                onChange={(e) => setEditService({ ...editService, status: e.target.value })}
                                                                required
                                                            >
                                                                <option value="" disabled>Select Status</option>
                                                                <option value="active">Active</option>
                                                                <option value="inactive">Inactive</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                                    <button type="button" className="btn btn-primary" onClick={saveChanges}>Save changes</button>
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

export default ServiceManagement;