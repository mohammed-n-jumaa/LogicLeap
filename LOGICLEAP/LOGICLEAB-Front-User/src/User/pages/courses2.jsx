import React from 'react'
import CounterCourses from '../components/counterCourses'
import "../assets/css/main.css";
import Hero from '../components/hero';
import Header from '../components/header';
import Footer from '../components/footer';


function courses() {
  return (
<main className="main">
    <Header/>
  {/* Hero Section */}
  <div id="carouselExampleDark" className="carousel-inner" data-bs-ride="carousel">
    <div className="carousel-item active">
      <img src="assets/img/code5.jpg" className="d-block w-100" alt="Image" />
      <div className="overlay-text">
        <div className="  container">
          <h1>Courses</h1>
          <nav className=" breadcrumbs">
            <ol>
              <li><a href="/home">Home</a></li>
              <li><span>/</span></li>
              <li className="current">Courses</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  {/* /Hero Section */}
  <section id="Courses" className="pricing section light-background">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>courses</h2>
      <p>Explore Our Comprehensive Courses in Information Technology</p>
    </div>
    {/* End Section Title */}
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row g-4 justify-content-center">
        {/* Basic Plan */}
        <div className="col-md-3 mb-4">
          <div className="card course-card">
            <img src="assets/img/Css.jpeg" className="card-img-top" alt="Course Image" />
            <div className="card-body">
              <span className="badge badge-category mb-2">Web Development</span>
              <h5 className="card-title">Css Course</h5>
              <ul className="list-unstyled">
                <li><strong>Mode:</strong>Offline</li>
                <li><strong>Certificate:</strong> Yes</li>
                <li><strong>Level:</strong>Beginner to Advanced</li>
                <li><strong>Price:</strong> Free</li>
              </ul>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">12 Weeks</span>
                <a href="/courseDetails2" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Enroll</a>
                </div>
            </div>
          </div>
        </div>


        {/* Standard Plan */}
        <div className="col-md-3 mb-4">
          <div className="card course-card">
            <img src="./assets/img/js3.jpeg" className="card-img-top" alt="Course Image" />
            <div className="card-body">
              <span className="badge badge-category mb-2">Web Development</span>
              <h5 className="card-title">Java Script Course</h5>
              <ul className="list-unstyled">
                <li><strong>Mode:</strong>Offline</li>
                <li><strong>Certificate:</strong> Yes</li>
                <li><strong>Level:</strong>Beginner to Advanced</li>
                <li><strong>Price:</strong> Free</li>

              </ul>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">12 Weeks</span>
                <a href="/courseDetails2" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Enroll</a>
                </div>
            </div>
          </div>
        </div>

        {/* Premium Plan */}

        <div className="col-md-3 mb-4">
        <div className="card course-card">
          <img src="./assets/img/html5.webp" className="card-img-top" alt="Course Image" />
          <div className="card-body">
            <span className="badge badge-category mb-2">Web Development</span>
            <h5 className="card-title">Html Course beginners</h5>
            <ul className="list-unstyled">
                <li><strong>Mode:</strong>Offline</li>
                <li><strong>Certificate:</strong> Yes</li>
                <li><strong>Level:</strong>Beginner to Advanced</li>
                <li><strong>Price:</strong> Free</li>

              </ul>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">12 Weeks</span>
              <a href="/courseDetails2" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Enroll</a>
            </div>
          </div>
        </div>
        </div>

      {/* Premium Plan */}
      <div className="col-md-3 mb-4">
        <div className="card course-card">
          <img src="assets/img/frontend.jpeg" className="card-img-top" alt="Course Image"  />
          <div className="card-body">
            <span className="badge badge-category mb-2">Web Development</span>
            <h5 className="card-title">Front-End Course</h5>
            <ul className="list-unstyled">
                <li><strong>Mode:</strong>Offline</li>
                <li><strong>Certificate:</strong> Yes</li>
                <li><strong>Level:</strong>Beginner to Advanced</li>
                <li><strong>Price:</strong> Free</li>
              </ul>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">12 Weeks</span>
              <a href="/courseDetails2" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Enroll</a>
              </div>
          </div>
        </div>
      </div>
        
      </div>
    </div>
  </section>
  <Footer/>
</main>

  )
}

export default courses