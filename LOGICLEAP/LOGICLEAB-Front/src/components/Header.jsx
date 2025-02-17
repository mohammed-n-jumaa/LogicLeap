import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import profileImage from '../assets/images/profile/Userpfp.jpg';
import axios from 'axios';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); 

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }
    
            await axios.post(
                'http://localhost:8000/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                alert('Your session has expired. Please log in again.');
                navigate('/login');
            } else {
                alert('Logout failed. Please check your server or token validity.');
            }
        }
    };
    

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item d-block d-xl-none">
                        <button className="nav-link sidebartoggler nav-icon-hover" onClick={toggleDropdown}>
                            <i className="ti ti-menu-2"></i>
                        </button>
                    </li>
                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link nav-icon-hover"
                                onClick={toggleDropdown}
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                            >
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    width="35"
                                    height="35"
                                    className="rounded-circle"
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu show">
                                    <div className="message-body">
                                        <Link
                                            to="/profile"
                                            className="d-flex align-items-center gap-2 dropdown-item"
                                        >
                                            <i className="ti ti-user fs-6"></i>
                                            <p className="mb-0 fs-3">My Profile</p>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-outline-primary mx-3 mt-2 d-block"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

            <style jsx>{`
                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    left: auto;
                    background: #ffffff;
                    border: 1px solid #ddd;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    z-index: 1000;
                }

                .dropdown-menu.show {
                    display: block;
                }

                .nav-icon-hover:hover {
                    cursor: pointer;
                }

                .app-header .navbar {
                    padding: 1rem;
                }

                .rounded-circle {
                    transition: transform 0.2s;
                }

                .rounded-circle:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </header>
    );
};

export default Header;
