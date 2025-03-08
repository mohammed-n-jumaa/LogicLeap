import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AddUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://logicleap-769836b54d38.herokuapp.com/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User added:', data);
                setUserData({
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    password: ''
                });
                setAlertMessage({ type: 'success', text: 'User added successfully!' });
                setTimeout(() => {
                    navigate('/user-management');
                }, 2000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setAlertMessage({ type: 'danger', text: 'Error adding user. Please try again.' });
            });
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="card border-0 shadow-lg" style={{ marginTop: "40px", background: 'linear-gradient(to right bottom, #ffffff, #fff5f5)' }}>
                                <div className="card-body p-5">
                                    <div className="text-center mb-4">
                                        <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                                            <i className="fas fa-user-plus" style={{ color: '#ff4c4c', fontSize: '2.5rem' }}></i>
                                        </div>
                                        <h3 className="fw-bold" style={{ color: '#ff4c4c' }}>Add New User</h3>
                                        <p className="text-muted">Create a new user account by filling out the form below</p>
                                    </div>

                                    {alertMessage && (
                                        <div className={`alert alert-${alertMessage.type} alert-dismissible fade show text-center`} role="alert">
                                            <strong>{alertMessage.text}</strong>
                                            <button type="button" className="btn-close" onClick={() => setAlertMessage(null)}></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="mt-4">
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 shadow-sm"
                                                        id="name"
                                                        name="name"
                                                        value={userData.name}
                                                        onChange={handleChange}
                                                        placeholder="Full Name"
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    />
                                                    <label htmlFor="name" className="text-muted">
                                                        <i className="fas fa-user me-2"></i>Full Name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control border-0 shadow-sm"
                                                        id="email"
                                                        name="email"
                                                        value={userData.email}
                                                        onChange={handleChange}
                                                        placeholder="Email Address"
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    />
                                                    <label htmlFor="email" className="text-muted">
                                                        <i className="fas fa-envelope me-2"></i>Email Address
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 shadow-sm"
                                                        id="phone"
                                                        name="phone"
                                                        value={userData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Phone Number"
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    />
                                                    <label htmlFor="phone" className="text-muted">
                                                        <i className="fas fa-phone me-2"></i>Phone Number
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select border-0 shadow-sm"
                                                        id="role"
                                                        name="role"
                                                        value={userData.role}
                                                        onChange={handleChange}
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    >
                                                        <option value="" disabled>Select Role</option>
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="super_admin">Super Admin</option>
                                                    </select>
                                                    <label htmlFor="role" className="text-muted">
                                                        <i className="fas fa-user-shield me-2"></i>User Role
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control border-0 shadow-sm"
                                                        id="password"
                                                        name="password"
                                                        value={userData.password}
                                                        onChange={handleChange}
                                                        placeholder="Password"
                                                        required
                                                        style={{ backgroundColor: 'rgba(255, 76, 76, 0.03)' }}
                                                    />
                                                    <label htmlFor="password" className="text-muted">
                                                        <i className="fas fa-lock me-2"></i>Password
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-lg px-5 py-3 rounded-pill shadow-sm" 
                                                style={{ 
                                                    background: 'linear-gradient(to right, #ff4c4c, #ff6666)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                            >
                                                <i className="fas fa-user-plus me-2"></i>
                                                Add User
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

export default AddUser;