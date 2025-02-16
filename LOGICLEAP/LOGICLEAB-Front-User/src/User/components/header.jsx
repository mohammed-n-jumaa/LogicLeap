import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/main.css';

function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts and when localStorage changes
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!token && !!user);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        onLogout?.();
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link to="/home" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">LogicLeap</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/home" className={isActive('/home')}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')}>About</Link></li>
            <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
            <li><Link to="/courses2" className={isActive('/courses2')}>Courses</Link></li>
            <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          </ul>
        </nav>

        {isLoggedIn ? (
          <button 
            className="btn-getstarted" 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#dc3545',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '50px',
              color: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        ) : (
          <Link 
            className="btn-getstarted" 
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#a7d477',
              padding: '8px 20px',
              borderRadius: '50px',
              color: '#fff',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="bi bi-person-plus"></i>
            Login
          </Link>
        )}
      </div>

      <style>
        {`
          .header {
            background: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .navmenu ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
          }

          .navmenu ul li a {
            color: #333;
            text-decoration: none;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .navmenu ul li a:hover,
          .navmenu ul li a.active {
            color: #a7d477;
            text-decoration: none;
            font-weight: 600;
          }

          .btn-getstarted:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          .sitename {
            font-size: 1.5rem;
            color: #333;
            margin: 0;
          }
        `}
      </style>
    </header>
  );
}

export default Header;