// src/components/UserManagement.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../assets/css/styles.min.css'; 
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Ahmad', email: 'Ahmad@gmail.com', phone: '0781617814', role: 'User' },
        { id: 2, name: 'Mohammad', email: 'Mohammad@gmail.com', phone: '0772827918', role: 'Admin' },
        { id: 3, name: 'Hamza', email: 'Hamza@gmail.com', phone: '0797563837', role: 'Super Admin' },
        { id: 4, name: 'Muna', email: 'Muna@gmail.com', phone: '0776522644', role: 'User' },
        { id: 5, name: 'Mousa', email: 'Mousa@gmail.com', phone: '0786644322', role: 'Admin' },
    ]);

    const [modalUser, setModalUser] = useState(null);
    const [editUser, setEditUser] = useState({ id: '', name: '', email: '', phone: '', role: '' });

    const openModal = (user) => {
        setModalUser(user);
        setEditUser(user);
    };

    const saveChanges = () => {
        setUsers(users.map(user => (user.id === editUser.id ? editUser : user)));
        setModalUser(null);
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
                                <h5 className="card-title fw-semibold mb-4">Users Management</h5>
                                <div className="d-flex justify-content-start mb-3">
                                    <Link to="/add-user" className="btn btn-primary btn-sm" style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }}>Add User</Link>
                                </div>
                                <div className="table-responsive">
                                    <table className="table text-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="border-2 border-bottom border-primary border-0">
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col" className="text-center">Phone</th>
                                                <th scope="col" className="text-center">Role</th>
                                                <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <th scope="row">{user.id}</th>
                                                    <td>{user.name}</td>
                                                    <td>
                                                        <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">{user.email}</a>
                                                    </td>
                                                    <td className="text-center">{user.phone}</td>
                                                    <td className="text-center">{user.role}</td>
                                                    <td className="text-center">
                                                        <i className="fas fa-edit" onClick={() => openModal(user)} style={{ cursor: 'pointer' }}></i>
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

                {/* Modal for Editing User */}
                {modalUser && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit User</h5>
                                    <button type="button" className="btn-close" onClick={() => setModalUser(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <input type="hidden" value={editUser.id} />
                                        <div className="mb-3">
                                            <label htmlFor="userName" className="form-label">Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={editUser.name} 
                                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="userEmail" className="form-label">Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                value={editUser.email} 
                                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="userPhone" className="form-label">Phone</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={editUser.phone} 
                                                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} 
                                                required 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="userRole" className="form-label">Role</label>
                                            <select 
                                                className="form-select" 
                                                value={editUser.role} 
                                                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })} 
                                                required
                                            >
                                                <option value="" disabled>Select Role</option>
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Super Admin">Super Admin</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setModalUser(null)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={saveChanges}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserManagement;