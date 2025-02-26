import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/main.css';

function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false); // إغلاق الـ dropdown عند فتح البرجر منيو
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="site-header">
      <div className="header-wrapper">
        <Link to="/home" className="brand-logo">
          <h1 className="brand-name">LogicLeap</h1>
        </Link>

        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          <span className={`burger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        <nav className={`main-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><Link to="/home" className={`nav-link ${isActive('/home')}`}>Home</Link></li>
            <li className="nav-item"><Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link></li>
            <li className="nav-item"><Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link></li>
            <li className="nav-item"><Link to="/courses2" className={`nav-link ${isActive('/courses2')}`}>Programs</Link></li>
            <li className="nav-item"><Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link></li>
          </ul>

          {isMobileMenuOpen && (
            <div className="auth-section open">
              {isLoggedIn ? (
                <div className="user-dropdown">
                  <button 
                    className="user-icon"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <i className="bi bi-person-circle fs-4"></i>
                  </button>
                  <ul className={`dropdown-options ${isDropdownOpen ? 'visible' : ''}`}>
                    <li className="dropdown-item">
                      <Link to="/profile" className="dropdown-link">
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <button onClick={handleLogout} className="dropdown-link logout">
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="auth-btn login">
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>Login</span>
                  </Link>
                  <Link to="/register" className="auth-btn register">
                    <i className="bi bi-person-plus"></i>
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className={`auth-section ${isMobileMenuOpen ? 'hidden' : ''}`}>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <button 
                className="user-icon"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <i className="bi bi-person-circle fs-4"></i>
              </button>
              <ul className={`dropdown-options ${isDropdownOpen ? 'visible' : ''}`}>
                <li className="dropdown-item">
                  <Link to="/profile" className="dropdown-link">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </Link>
                </li>
                <li className="dropdown-item">
                  <button onClick={handleLogout} className="dropdown-link logout">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </Link>
              <Link to="/register" className="auth-btn register">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to right, #ffffff, #f5f5f5);
            border-radius: 50px;
            z-index: 1000;
            padding: 10px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            height: 80px; 
            max-width: 1200px;
            margin: 0 auto; 
            margin-top: 20px; 
          }

          .header-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            height: 100%;
          }

          .brand-logo {
            text-decoration: none;
          }

          .brand-name {
            font-size: 1.8rem; 
            color: #333;
            margin: 0;
            
          }

          .mobile-toggle {
            display: none;
            cursor: pointer;
          }

          .burger-icon {
            width: 25px;
            height: 15px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .burger-icon span {
            display: block;
            height: 3px;
            width: 100%;
            background-color: #333;
            border-radius: 3px;
            transition: all 0.3s ease;
          }

          .burger-icon.open span:nth-child(1) {
            transform: translateY(6px) rotate(45deg);
          }

          .burger-icon.open span:nth-child(2) {
            opacity: 0;
          }

          .burger-icon.open span:nth-child(3) {
            transform: translateY(-6px) rotate(-45deg);
          }

          .main-nav {
            flex: 1;
            display: flex;
            justify-content: center;
          }

          .nav-list {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem; 
          }

          .nav-link {
            color: #333;
            text-decoration: none;
            font-size: 1rem; 
            padding: 8px 15px;
            border-radius: 20px;
            transition: all 0.3s ease;
          }

          .nav-link:hover,
          .nav-link.active {
            background-color: #a7d477;
            color: white;
            font-weight: 600;
          }

          .user-dropdown {
            position: relative;
          }

          .user-icon {
            background: none;
            border: none;
            padding: 6px;
            border-radius: 50%;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .user-icon:hover {
            background: #f5f5f5;
          }

          .dropdown-options {
            position: absolute;
            right: 0;
            top: 100%;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 0.5rem 0;
            display: none;
            min-width: 180px;
            list-style: none;
            z-index: 1001;
          }

          .dropdown-options.visible {
            display: block;
          }

          .dropdown-item {
            margin: 0;
            padding: 0;
          }

          .dropdown-link {
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
            font-family: inherit;
            font-size: inherit;
            cursor: pointer;
          }

          .dropdown-link:hover {
            background: #f5f5f5;
          }

          .dropdown-link.logout {
            color: #dc3545;
          }

          .auth-buttons {
            display: flex;
            gap: 1rem; 
          }

          .auth-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 8px 20px; 
            border-radius: 50px;
            color: #fff;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .auth-btn.login {
            background: #a7d477;
          }

          .auth-btn.register {
            background: #4a6741;
          }

          .auth-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          /* Responsive styles */
          @media (max-width: 992px) {
            .site-header {
              max-width: 100%; 
              height: 70px; 
              background: #ffffff; 
            }

            .mobile-toggle {
              display: block;
              order: 3;
            }

            .header-wrapper {
              flex-wrap: wrap;
            }

            .brand-logo {
              order: 1;
            }

            .auth-section {
              order: 2;
              display: none;
            }

            .auth-section.open {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1rem;
              padding: 1rem 0;
            }

            .main-nav {
              order: 4;
              flex: 0 0 100%;
              max-height: 0;
              overflow: hidden;
              transition: max-height 0.3s ease;
              padding: 0;
              background: #ffffff; 
            }

            .main-nav.open {
              max-height: 500px;
              padding: 1rem;
            }

            .nav-list {
              flex-direction: column;
              gap: 0.5rem;
              padding: 1rem 0;
            }

            .nav-item {
              width: 100%;
              text-align: center;
            }

            .nav-link {
              display: block;
              padding: 0.5rem 0;
            }

            .user-dropdown {
              position: static;
            }

            .dropdown-options {
              position: static;
              box-shadow: none;
              background: transparent;
            }

            .dropdown-options.visible {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }

            .dropdown-link {
              padding: 0.5rem 1rem;
              text-align: center;
            }
          }

          @media (max-width: 576px) {
            .header-wrapper {
              padding: 1rem;
            }

            .auth-buttons {
              gap: 0.25rem;
            }

            .auth-btn {
              padding: 6px 12px;
              font-size: 0.9rem;
            }

            .auth-btn span {
              display: none;
            }

            .auth-btn i {
              margin: 0;
            }
          }
        `}
      </style>
    </header>
  );
}

export default Header;