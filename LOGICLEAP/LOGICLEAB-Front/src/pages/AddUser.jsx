import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/styles.min.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AddUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
    });
    const [alertMessage, setAlertMessage] = useState(null); // State for alert message
    const navigate = useNavigate(); // useNavigate hook to handle redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:8000/api/users', {
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

                setAlertMessage({ type: 'success', text: 'User added successfully!' }); // Show success message
                
                // Redirect to User Management after a brief moment
                setTimeout(() => {
                    navigate('/user-management');
                }, 2000); // Adjust timeout as needed
            })
            .catch((error) => {
                console.error('Error:', error);
                setAlertMessage({ type: 'danger', text: 'Error adding user. Please try again.' }); // Show error message
            });
    };

    return (
        <div className="page-wrapper bg-light" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid py-4">
                    <div className="card shadow-sm border-0 rounded-lg overflow-hidden">
                        <div className="card-body p-5">
                            <h3 className="card-title fw-bold text-primary mb-4 text-center">Add New User</h3>
                            
                            {alertMessage && (
                                <div className={`alert alert-${alertMessage.type} text-center`} role="alert">
                                    {alertMessage.text}
                                </div>
                            )}
                            
                            <div className="card border-0 shadow-none">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        name="name"
                                                        value={userData.name}
                                                        onChange={handleChange}
                                                        placeholder="Full Name"
                                                        required
                                                    />
                                                    <label htmlFor="name">Full Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        value={userData.email}
                                                        onChange={handleChange}
                                                        placeholder="Email Address"
                                                        required
                                                    />
                                                    <label htmlFor="email">Email Address</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        name="phone"
                                                        value={userData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Phone Number"
                                                        required
                                                    />
                                                    <label htmlFor="phone">Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select"
                                                        id="role"
                                                        name="role"
                                                        value={userData.role}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="" disabled>Select Role</option>
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="super_admin">Super Admin</option>
                                                    </select>
                                                    <label htmlFor="role">User Role</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        value={userData.password}
                                                        onChange={handleChange}
                                                        placeholder="Password"
                                                        required
                                                    />
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-primary btn-lg px-5 py-2 shadow-sm">Add User</button>
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
