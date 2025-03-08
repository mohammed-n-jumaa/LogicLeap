import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/styles.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const [service, setService] = useState({
        title: '',
        description: '',
        price: '',
        status: 'active',
    });

    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setService({
            ...service,
            [id]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://logicleap-769836b54d38.herokuapp.com/api/site-services', service)
            .then((response) => {
                setAlertMessage({ type: 'success', text: 'Service added successfully!' });
                setTimeout(() => {
                    navigate('/service-management');
                }, 2000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setAlertMessage({ type: 'danger', text: 'Error adding service. Please try again.' });
            });
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="card border-0 shadow-lg" style={{ marginTop: "40px", background: 'linear-gradient(to right bottom, #ffffff, #fff5f5)' }}>
                                <div className="card-body p-5">
                                    <div className="text-center mb-4">
                                        <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                                            <i className="fas fa-cog" style={{ color: '#ff4c4c', fontSize: '2.5rem' }}></i>
                                        </div>
                                        <h3 className="fw-bold" style={{ color: '#ff4c4c' }}>Add New Service</h3>
                                        <p className="text-muted">Create a new service by filling out the form below</p>
                                    </div>

                                    {alertMessage && (
                                        <div className={`alert alert-${alertMessage.type} alert-dismissible fade show text-center`} role="alert">
                                            <strong>{alertMessage.text}</strong>
                                            <button type="button" className="btn-close" onClick={() => setAlertMessage(null)}></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="mt-4">
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 shadow-sm"
                                                        id="title"
                                                        value={service.title}
                                                        onChange={handleChange}
                                                        placeholder="Service Title"
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    />
                                                    <label htmlFor="title" className="text-muted">
                                                        <i className="fas fa-tag me-2"></i>Service Title
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <textarea
                                                        className="form-control border-0 shadow-sm"
                                                        id="description"
                                                        value={service.description}
                                                        onChange={handleChange}
                                                        placeholder="Service Description"
                                                        style={{ height: '120px', backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                        required
                                                    ></textarea>
                                                    <label htmlFor="description" className="text-muted">
                                                        <i className="fas fa-align-left me-2"></i>Service Description
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="number"
                                                        className="form-control border-0 shadow-sm"
                                                        id="price"
                                                        value={service.price}
                                                        onChange={handleChange}
                                                        placeholder="Service Price"
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    />
                                                    <label htmlFor="price" className="text-muted">
                                                        <i className="fas fa-dollar-sign me-2"></i>Service Price
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select border-0 shadow-sm"
                                                        id="status"
                                                        value={service.status}
                                                        onChange={handleChange}
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                    <label htmlFor="status" className="text-muted">
                                                        <i className="fas fa-toggle-on me-2"></i>Service Status
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button 
                                                type="submit" 
                                                className="btn btn-lg px-5 py-3 rounded-pill shadow-sm"
                                                style={{ 
                                                    background: 'linear-gradient(to right, #ff4c4c, #ff6666)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                            >
                                                <i className="fas fa-plus-circle me-2"></i>
                                                Add Service
                                            </button>
                                        </div>
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