// src/components/AddUser.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/styles.min.css';
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User added:', userData);


        setUserData({
            name: '',
            email: '',
            phone: '',
            role: '',
            password: ''
        });
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Add New User</h5>
                                <form id="addUserForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="userName" className="form-label">Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="userName" 
                                            value={userData.name}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userEmail" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="userEmail" 
                                            value={userData.email}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userPhone" className="form-label">Phone</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="userPhone" 
                                            value={userData.phone}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userRole" className="form-label">Role</label>
                                        <select 
                                            className="form-select" 
                                            id="userRole" 
                                            value={userData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="super_admin">Super Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userPassword" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="userPassword" 
                                            value={userData.password}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add User</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;