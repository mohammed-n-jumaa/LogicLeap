import React from 'react'
import "../assets/css/main.css";


function footer() {
  return (
<footer id="footer" className="footer">
  <div className="container footer-top">
    <div className="row gy-4">
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
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Our Cources</h4>
        <ul>
          <li>
            <a href="#">Front-End</a>
          </li>
          <li>
            <a href="#">Back-End</a>
          </li>
          <li>
            <a href="#">Full-Stack</a>
          </li>
          <li>
            <a href="#">Databases</a>
          </li>
          <li>
            <a href="#">UI/UX Design</a>
          </li>
        </ul>
      </div>
      {/* <div class="col-lg-2 col-md-3 footer-links">
    <h4>Nobis illum</h4>
    <ul>
      <li><a href="#">Ipsam</a></li>
      <li><a href="#">Laudantium dolorum</a></li>
      <li><a href="#">Dinera</a></li>
      <li><a href="#">Trodelas</a></li>
      <li><a href="#">Flexo</a></li>
    </ul>
  </div> */}
    </div>
  </div>
  <div className="container copyright text-center mt-4">
    {/* <p>© <span>Copyright</span> <strong class="px-1 sitename">iLanding</strong> <span>All Rights Reserved</span></p> */}
    <div className="credits">
      {/* All the links in the footer should remain intact. */}
      {/* You can delete the links only if you've purchased the pro version. */}
      {/* Licensing information: https://bootstrapmade.com/license/ */}
      {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
      {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Distributed By <a href="https://themewagon.com">ThemeWagon</a> */}
    </div>
  </div>
</footer>

  )
}

export default footer