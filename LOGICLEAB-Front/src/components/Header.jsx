// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import profileImage from '../assets/images/profile/mohammed.jpg';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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
                            <button className="nav-link nav-icon-hover" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={dropdownOpen}>
                                <img src={profileImage} alt="Profile" width="35" height="35" className="rounded-circle" /> {/* استخدام الصورة المستوردة */}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu show">
                                    <div className="message-body">
                                        <Link to="/profile" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="ti ti-user fs-6"></i>
                                            <p className="mb-0 fs-3">My Profile</p>
                                        </Link>
                                        <Link to="./authentication-login.html" className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</Link>
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
                    right: 0;
                    left: auto; 
                    display: none; 
                }

                .dropdown-menu.show {
                    display: block; 
                }
            `}</style>
        </header>
    );
};

export default Header;