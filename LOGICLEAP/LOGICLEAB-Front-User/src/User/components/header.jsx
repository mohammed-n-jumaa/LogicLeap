import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/main.css';

function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const location = useLocation();

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link to="/home" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">LogicLeap</h1>
        </Link>

        <nav id="navmenu" className={`navmenu ${mobileNavActive ? 'mobile-nav-active' : ''}`}>
          <ul>
            <li><Link to="/home" className={isActive('/home')}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')}>About</Link></li>
            <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
            <li><Link to="/courses2" className={isActive('/courses2')}>Courses</Link></li>
            <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${mobileNavActive ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileNav}
          />
        </nav>

        <a className="btn-getstarted" href="/login">
          <i className="bi bi-person-plus"></i>
        </a>
      </div>
    </header>
  );
}

export default Header;