import React, { useState } from 'react';
import Hero from '../components/hero';
import Coding1 from '../assets/img/Coding1.png';
import Coding2 from '../assets/img/Coding2.png';
import Coding3 from '../assets/img/Coding3.png';
import Coding4 from '../assets/img/Coding4.png';
import Coding5 from '../assets/img/Coding5.png';
import Coding6 from '../assets/img/Coding6.png';
import Coding7 from '../assets/img/Coding7.png';
import Header from '../components/header';
import Footer from '../components/footer';

const CourseDetails = () => {
  const [selectedImage, setSelectedImage] = useState('./assets/img/frontend.jpeg');

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
    <Header/>
      {/* Carousel Section */}
      {/* <div id="carouselExampleDark" className="carousel-inner " data-bs-ride="carousel">
        <img src="assets/img/code5.jpg" className="d-block w-100" />
      </div> */}

      <div className="row">
        <div className="col-md-12">
          <div className="course-image">
            <img src={selectedImage} className="img-fluid w-100" alt="Course Image" />
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="gallery">
                {/* Image Gallery */}
                {[Coding1, Coding2, Coding3, Coding4, Coding5, Coding6, Coding7].map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img
                      src={image}
                      className="img-fluid"
                      alt={`Gallery Image ${index + 1}`}
                      onClick={() => handleImageClick(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Header */}
      <div className="text-center page-title light-background">
        <h1>Web Development Bootcamp</h1>
        <p className="lead">Comprehensive Full-Stack Web Development Training</p>
      </div>

      <div className="container">
        <div className="course-header">
          <div className="row align-items-center">
            <div className="col-md-12"></div>
            {/* <div className="col-md-4 text-end">
              <button className="btn btn-primary">Enroll Now</button> 
              <a href="/registrationCourses" className="btn btn-primary">Buy Now<i className="bi bi-arrow-right" /></a>
            </div> */}
          </div>
        </div>

        {/* Course Content */}
        <div className="course-content mt-2">
          <div className="row mt-4">
            <div className="col-md-8">
              {/* Course Overview */}
              <div className="course-section">
                <h2 className="mb-4">Course Overview</h2>
                <p>Master web development from scratch with our intensive full-stack bootcamp. Learn modern technologies and build real-world projects.</p>
              </div>

              {/* What You'll Learn */}
              <div className="course-section">
                <h2 className="mb-4">What You'll Learn</h2>
                <ul className="list-unstyled">
                  <li className="course-feature">✓ HTML5 & CSS3 Fundamentals</li>
                  <li className="course-feature">✓ JavaScript & ES6+</li>
                  <li className="course-feature">✓ React.js Framework</li>
                  <li className="course-feature">✓ Node.js & Express.js Backend</li>
                  <li className="course-feature">✓ MongoDB Database Management</li>
                </ul>
              </div>
            </div>

            {/* Course Details */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Course Details</h3>
                  <ul className="list-unstyled">
                    <li><strong>Duration:</strong> 12 Weeks</li>
                    <li><strong>Level:</strong> Beginner to Advanced</li>
                    <li><strong>Certificates:</strong> Included</li>
                    <li><strong>Price:</strong> Free</li>
                  </ul>
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="course-section mt-4">
                <div className="accordion" id="curriculumAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#moduleOne">
                        Module 1: Frontend Fundamentals
                      </button>
                    </h2>
                    <div id="moduleOne" className="accordion-collapse collapse show">
                      <div className="accordion-body">
                        <ul>
                          <li>HTML Structure</li>
                          <li>CSS Styling</li>
                          <li>Responsive Design</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <a href="/registrationCourses" className="btn btn-primary">
              Register
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
        <hr />
      </div>
      <Footer/>
    </>
  );
};

export default CourseDetails;
