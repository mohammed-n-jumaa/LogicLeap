import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Icon } from '@iconify/react';

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <span className="hide-menu logo">
                        <span className="l-logic">L</span>
                        <span className="ogic">ogic</span>
                        <span className="l-leap">L</span>
                        <span className="eap">eap</span>
                    </span>
                    <a href="/" className="text-nowrap logo-img"></a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-6"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/">
                                <span>
                                    <Icon icon="material-symbols:dashboard-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-6"></i>
                            <span className="hide-menu">Pages Management</span>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/user-management' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/user-management">
                                <span>
                                    <Icon icon="mdi:account-circle-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">User Management</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/service-management' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/service-management">
                                <span>
                                    <Icon icon="mdi:briefcase-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Service</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/service-requests' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/service-requests">
                                <span>
                                    <Icon icon="mdi:file-document-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Service Requests</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/programs' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/programs">
                                <span>
                                    <Icon icon="mdi:school-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Programs</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/program-registrations' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/program-registrations">
                                <span>
                                    <Icon icon="mdi:clipboard-check-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Program Registrations</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/categories' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/categories">
                                <span>
                                    <Icon icon="mdi:layers-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Categories</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/sliders' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/sliders">
                                <span>
                                    <Icon icon="mdi:view-carousel-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Sliders Management</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/contacts' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/contacts">
                                <span>
                                    <Icon icon="mdi:phone-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Contacts</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/partners' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/partners">
                                <span>
                                    <Icon icon="mdi:handshake-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Partners</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/forms' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/forms">
                                <span>
                                    <Icon icon="mdi:file-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Forms</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/success-stories' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/success-stories">
                                <span>
                                    <Icon icon="mdi:star-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Success Stories</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/faq-management' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/faq-management">
                                <span>
                                    <Icon icon="mdi:help-circle-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">FAQ Management</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${location.pathname === '/gallery' ? 'active' : ''}`}>
                            <Link className="sidebar-link" to="/gallery">
                                <span>
                                    <Icon icon="mdi:image-outline" className="fs-6" />
                                </span>
                                <span className="hide-menu">Gallery Management</span>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>

            <style jsx>{`
                .logo {
                    font-size: 28px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .l-logic {
                    color: #ff0000;
                }

                .l-leap {
                    color: #00ff00;
                }

                .ogic, .eap {
                    color: #000000;
                }

                .logo:hover {
                    transform: scale(1.05);
                }

                /* Custom Scrollbar Styles */
                .scroll-sidebar {
                    scrollbar-width: thin;
                    scrollbar-color: #ff4c4c #fff;
                }

                .scroll-sidebar::-webkit-scrollbar {
                    width: 6px;
                }

                .scroll-sidebar::-webkit-scrollbar-track {
                    background: #1a1a1a;
                    border-radius: 3px;
                }

                .scroll-sidebar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #ff4c4c, #cc0000);
                    border-radius: 3px;
                    border: 1px solid #1a1a1a;
                }

                .scroll-sidebar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #ff6666, #ff0000);
                }

                /* Keep your existing sidebar-item and sidebar-link styles */
                .sidebar-item.active .sidebar-link {
                    background-color: #ff4c4c;
                    color: white;
                }

                .sidebar-link {
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .sidebar-link:hover {
                    background-color: #ff4c4c;
                    color: white;
                }

                .sidebar-item.active .sidebar-link span {
                    color: white;
                }
            `}</style>
        </aside>
    );
};

export default Sidebar;