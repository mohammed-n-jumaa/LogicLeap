import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/styles.min.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [modalUser, setModalUser] = useState(null);
    const [editUser, setEditUser] = useState({ id: '', name: '', email: '', phone: '', role: '' });
    const [isLoading, setIsLoading] = useState(true);

    // Search and pagination states
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://logicleap-769836b54d38.herokuapp.com/api/users')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
                Swal.fire('Error!', 'Failed to fetch users data.', 'error');
            });

        return () => {
            setIsLoading(true); // Reset loading state when component unmounts
        };
    }, []);

    // Filter users based on search
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const openModal = (user) => {
        setModalUser(user);
        setEditUser(user);
    };

    const saveChanges = () => {
        setIsLoading(true);
        fetch(`https://logicleap-769836b54d38.herokuapp.com/api/users/${editUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editUser),
        })
            .then((response) => response.json())
            .then(() => {
                setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
                setModalUser(null);
                Swal.fire('Success!', 'User updated successfully.', 'success');
            })
            .catch((error) => {
                console.error('Error updating user:', error);
                Swal.fire('Error!', 'Failed to update user.', 'error');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteUser = (id) => {
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
                setIsLoading(true);
                fetch(`https://logicleap-769836b54d38.herokuapp.com/api/users/${id}`, { method: 'DELETE' })
                    .then(() => {
                        setUsers(users.filter((user) => user.id !== id));
                        Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    })
                    .catch((error) => {
                        console.error('Error deleting user:', error);
                        Swal.fire('Error!', 'Failed to delete user.', 'error');
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        });
    };

    // Show loading spinner if data is loading
    if (isLoading) {
        return (
            <div className="page-wrapper">
                <Sidebar />
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
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Users Management</h5>

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
                                                    placeholder="Search users..."
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
                                    <Link to="/add-user" className="btn btn-primary btn-sm" style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }}>Add User</Link>
                                </div>

                                {/* Table Section */}
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
                                            {currentUsers.map((user) => (
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
                                                        <i className="fas fa-trash" style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => deleteUser(user.id)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="text-muted fs-13">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
                                    </div>
                                    <nav>
                                        <ul className="pagination pagination-primary mb-0">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button onClick={handleClick} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                                                    Click me
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;