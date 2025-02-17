import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/main.css';

function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
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
          <div className="dropdown">
            <button 
              className="btn-icon"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i className="bi bi-person-circle fs-4"></i>
            </button>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <li>
                <Link to="/profile" className="dropdown-item">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="dropdown-item text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-auth login me-2">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
            <Link to="/register" className="btn-auth register">
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </Link>
          </div>
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

          .dropdown {
            position: relative;
          }

          .btn-icon {
            background: none;
            border: none;
            padding: 8px;
            border-radius: 50%;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-icon:hover {
            background: #f5f5f5;
          }

          .dropdown-menu {
            position: absolute;
            right: 0;
            top: 100%;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 0.5rem 0;
            display: none;
            min-width: 180px;
          }

          .dropdown-menu.show {
            display: block;
          }

          .dropdown-item {
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #333;
            transition: background 0.3s ease;
            border: none;
            width: 100%;
            text-align: left;
            background: none;
          }

          .dropdown-item:hover {
            background: #f5f5f5;
          }

          .dropdown-item.text-danger {
            color: #dc3545;
          }

          .auth-buttons {
            display: flex;
            gap: 0.5rem;
          }

          .btn-auth {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 8px 20px;
            border-radius: 50px;
            color: #fff;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .btn-auth.login {
            background: #a7d477;
          }

          .btn-auth.register {
            background: #4a6741;
          }

          .btn-auth:hover {
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