// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/main.css';

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        }
      });

      if (response.ok) {
        onLogout();
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link to="/home" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">LogicLeap</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/courses2">Courses</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {isLoggedIn ? (
          <button className="btn-getstarted" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> تسجيل خروج
          </button>
        ) : (
          <Link className="btn-getstarted" to="/login">
            <i className="bi bi-person-plus"></i> تسجيل دخول
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;