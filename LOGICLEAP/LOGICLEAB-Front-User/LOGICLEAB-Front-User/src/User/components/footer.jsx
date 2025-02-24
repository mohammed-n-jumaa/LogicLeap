import React from 'react';
import { Link } from 'react-router-dom';  // استخدم Link للتنقل بين الصفحات
import "../assets/css/main.css";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* معلومات footer الأخرى */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="index.html" className="logo d-flex align-items-center">
              <span className="sitename">LogicLeap</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Mecca Street</p>
              <p>Amman, Jordan</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>++962 75636826</span>
              </p>
              <p>
                <strong>Email:</strong> <span>info@LogicLeap.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="">
                <i className="bi bi-facebook" />
              </a>
              <a href="">
                <i className="bi bi-instagram" />
              </a>
              <a href="">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>

          
          {/* روابط أخرى */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="/services">Web Design</a>
              </li>
              <li>
                <a href="/services">Web Development</a>
              </li>
              <li>
                <a href="/services">Product Management</a>
              </li>
              <li>
                <a href="/services">Marketing</a>
              </li>
              <li>
                <a href="/services">Graphic Design</a>
              </li>
            </ul>
          </div>

          {/* إضافة قسم Gallery */}
          <div className="col-lg-4 col-md-3 footer-gallery">
            <h4>Gallery</h4>
            <div className="gallery-images">
              <Link to="/gallery/1">
                <img src="\assets\img\testimonials\testimonials-1.jpg" alt="Gallery 1" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/2">
                <img src="\assets\img\testimonials\testimonials-2.jpg" alt="Gallery 2" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/3">
                <img src="\assets\img\testimonials\testimonials-3.jpg" alt="Gallery 3" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/4">
                <img src="\assets\img\testimonials\testimonials-4.jpg" alt="Gallery 4" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/3">
                <img src="\assets\img\testimonials\testimonials-3.jpg" alt="Gallery 3" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/4">
                <img src="\assets\img\testimonials\testimonials-4.jpg" alt="Gallery 4" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/3">
                <img src="\assets\img\testimonials\testimonials-3.jpg" alt="Gallery 3" className="gallery-thumb" />
              </Link>
              <Link to="/gallery/4">
                <img src="\assets\img\testimonials\testimonials-4.jpg" alt="Gallery 4" className="gallery-thumb" />
              </Link>
              
              
            </div>
          </div>
          
        </div>
      </div>

      {/* حقوق الطبع والنشر */}
      <div className="container copyright text-center mt-4">
        <div className="credits">
          {/* حقوق النشر أو الروابط */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
