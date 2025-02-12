import React, { useState } from 'react';
import Hero from '../components/hero';
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
  <div id="carouselExampleDark" className="carousel-inner" data-bs-ride="carousel">
    <div className="carousel-item active">
      <img src="assets/img/code5.jpg" className="d-block w-100" alt="Image" />
      <div className="overlay-text">
        <div className="  container">
          <h1>Starter Page</h1>
          <nav className=" breadcrumbs">
            <ol>
              <li><a href="index.html">Home</a></li>
              <li><span>/</span></li>
              <li className="current">Starter Page</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>

    <div className="container">
      <div className="course-header">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="mb-3">Web Development Bootcamp</h1>
            <p className="lead">Comprehensive Full-Stack Web Development Training</p>
            <hr />
          </div>
          <div className="col-md-4 text-end">
            {/* <button className="btn btn-primary">Enroll Now</button> */}
            <a href="/registrationCourses" className="btn btn-primary">
              Buy Now
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      <div className="course-content mt-5">
        <div className="row">
          <div className="col-md-7">
            <div className="course-image">
              <img src={selectedImage} className="img-fluid" alt="Course Image" />
            </div>
          </div>
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Image Gallery</h3>
                <div className="row row-cols-3 gallery">
                  <div className="col">
                    <img
                      src="./assets/img/js3.jpeg"
                      className="img-fluid mb-3"
                      alt="Gallery Image 1"
                      onClick={() => handleImageClick('./assets/img/js3.jpeg')}
                    />
                  </div>
                  <div className="col">
                    <img
                      src="./assets/img/js3.jpeg"
                      className="img-fluid mb-3"
                      alt="Gallery Image 1"
                      onClick={() => handleImageClick('./assets/img/js3.jpeg')}
                    />
                  </div>
                  <div className="col">
                    <img
                      src="./assets/img/js3.jpeg"
                      className="img-fluid mb-3"
                      alt="Gallery Image 1"
                      onClick={() => handleImageClick('./assets/img/js3.jpeg')}
                    />
                  </div>
                  <div className="col">
                    <img
                      src="./assets/img/js3.jpeg"
                      className="img-fluid mb-3"
                      alt="Gallery Image 1"
                      onClick={() => handleImageClick('./assets/img/js3.jpeg')}
                    />
                  </div>
                  <div className="col">
                    <img
                      src="./assets/img/html5.webp"
                      className="img-fluid mb-3"
                      alt="Gallery Image 2"
                      onClick={() => handleImageClick('./assets/img/html5.webp')}
                    />
                  </div>
                  <div className="col">
                    <img
                      src="./assets/img/features-illustration-2.webp"
                      className="img-fluid mb-3"
                      alt="Gallery Image 3"
                      onClick={() => handleImageClick('./assets/img/features-illustration-2.webp')}
                    />
                  </div>
                  {/* Add more images as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="course-section">
              <h2 className="mb-4">Course Overview</h2>
              <p>Master web development from scratch with our intensive full-stack bootcamp. Learn modern technologies and build real-world projects.</p>
            </div>

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

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Course Details</h3>
                <ul className="list-unstyled">
                  <li><strong>Duration:</strong> 12 Weeks</li>
                  <li><strong>Level:</strong> Beginner to Advanced</li>
                  <li><strong>Certificates:</strong> Included</li>
                </ul>
              </div>
            </div>
            <div className="course-section">
              <h2 className="mb-4">Course Curriculum</h2>
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
          <a href="/registrationCourses" className="btn btn-primary">
              Buy Now
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
