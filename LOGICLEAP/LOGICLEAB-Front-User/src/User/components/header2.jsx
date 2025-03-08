import React, { useState, useEffect } from 'react';
import "../assets/css/main.css";  
function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

 
  useEffect(() => {
    const navLinks = document.querySelectorAll('#navmenu a');
    navLinks.forEach(navLink => {
      navLink.addEventListener('click', () => {
        if (mobileNavActive) {
          setMobileNavActive(false);
        }
      });
    });

    return () => {
      navLinks.forEach(navLink => {
        navLink.removeEventListener('click', () => {});
      });
    };
  }, [mobileNavActive]);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="/home" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">LogicLeap</h1>
        </a>

        {/* قائمة التنقل (Navbar) */}
        <nav id="navmenu" className={`navmenu ${mobileNavActive ? 'mobile-nav-active' : ''}`}>
          <ul>
            <li><a href="/home" className="active">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

          {/* أيقونة التبديل في الموبايل */}
          <i
            className={`mobile-nav-toggle d-xl-none bi ${mobileNavActive ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileNav}
          />
        </nav>

        {/* زر تسجيل الدخول */}
        <a className="btn-getstarted" href="/login">
          <i className="bi bi-person-plus"></i>
        </a>
      </div>
    </header>
  );
}

export default Header;
