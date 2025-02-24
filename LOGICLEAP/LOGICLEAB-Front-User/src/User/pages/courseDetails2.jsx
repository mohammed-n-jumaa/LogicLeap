import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CourseDetails = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    // Fetch program data from Laravel backend
    const fetchProgram = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/programs/${id}`);
        setProgram(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching program:', error);
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  // Process text fields to convert each line to a bullet point
  const parseListItems = (text) => {
    if (!text) return [];
    return text.split('\n').filter(item => item.trim() !== '');
  };

  // Format image URL (similar to Gallery component)
  const formatImageUrl = (path) => {
    if (!path) return '/placeholder-image.jpg';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const cleanedPath = path.replace(/^\/+/, '');
    return `http://localhost:8000/storage/${cleanedPath}`;
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (!program) {
    return <div className="alert alert-danger m-5">Program not found</div>;
  }

  // Parse modules, what_youll_learn, and program_terms into arrays
  const modules = parseListItems(program.modules);
  const whatYoullLearn = parseListItems(program.what_youll_learn);
  const programTerms = parseListItems(program.program_terms);

  // Format price display
  const priceDisplay = program.price === 'free' ? 'Free' : `$${program.cost}`;

  // Custom arrow components for slider with improved styling
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "block", 
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          zIndex: 1,
          right: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}
        onClick={onClick}
      >
        <i className="bi bi-chevron-right" style={{ color: "white", fontSize: "20px" }}></i>
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "block", 
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          zIndex: 1,
          left: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}
        onClick={onClick}
      >
        <i className="bi bi-chevron-left" style={{ color: "white", fontSize: "20px" }}></i>
      </div>
    );
  };

  // Add custom CSS to ensure arrow positioning
  const sliderStyles = `
    .gallery-slider .slick-prev,
    .gallery-slider .slick-next {
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 40px;
      height: 40px;
    }
    
    .gallery-slider .slick-prev {
      left: 20px;
    }
    
    .gallery-slider .slick-next {
      right: 20px;
    }
    
    .gallery-slider .slick-prev:before,
    .gallery-slider .slick-next:before {
      display: none;
    }
    
    .gallery-slider {
      position: relative;
      padding: 0 50px;
    }
  `;

  // Slider settings with custom arrows
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ]
  };

  return (
    <>
      <Header />
      
      {/* Custom styles for slider arrows */}
      <style>{sliderStyles}</style>

      {program.galleries && program.galleries.length > 0 && (
        <div
          className="gallery-slider"
          style={{
            width: "100%",
            backgroundColor: "#f8f9fa",
            marginBottom: "0",
            borderBottom: "1px solid #e7e7e7",
            marginTop: "100px",
            position: "relative"
          }}
        >
          <div className="container-fluid px-4">
            <Slider {...sliderSettings}>
              {program.galleries.map((gallery) =>
                gallery.images &&
                gallery.images.map((image, imgIndex) => (
                  <div
                    key={`gallery-${gallery.id}-img-${imgIndex}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px 10px",
                    }}
                  >
                    <div
                      style={{
                        width: "300px",
                        height: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={formatImageUrl(image.image_path)}
                        alt={`Gallery Image ${imgIndex + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "4px",
                        }}
                        onError={(e) => {
                          console.error("Image failed to load:", e.target.src);
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </div>
        </div>
      )}

      {/* Course Header */}
      <div className="text-center page-title light-background">
        <h1>{program.title}</h1>
        <p className="lead">{program.category ? program.category.name : ''}</p>
      </div>

      <div className="container">
        <div className="course-content mt-2">
          <div className="row mt-4">
            <div className="col-md-8">
              {/* Course Overview */}
              <div className="course-section">
                <h2 className="mb-4">Course Overview</h2>
                <p>{program.description}</p>
              </div>

              {/* What You'll Learn */}
              {whatYoullLearn.length > 0 && (
                <div className="course-section">
                  <h2 className="mb-4">What You'll Learn</h2>
                  <ul className="list-unstyled">
                    {whatYoullLearn.map((item, index) => (
                      <li key={index} className="course-feature">✓ {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Course Details</h3>
                  <ul className="list-unstyled">
                    <li><strong>Duration:</strong> {program.duration} {program.duration > 1 ? 'Weeks' : 'Week'}</li>
                    <li><strong>Dates:</strong> {new Date(program.start_date).toLocaleDateString()} - {new Date(program.end_date).toLocaleDateString()}</li>
                    <li><strong>Mode:</strong> {program.mode.charAt(0).toUpperCase() + program.mode.slice(1)}</li>
                    <li><strong>Location:</strong> {program.location}</li>
                    <li><strong>Price:</strong> {priceDisplay}</li>
                  </ul>
                </div>
              </div>

              {/* Course Curriculum */}
              {modules.length > 0 && (
                <div className="course-section mt-4">
                  <div className="accordion" id="curriculumAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#moduleContent">
                          Course Modules
                        </button>
                      </h2>
                      <div id="moduleContent" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <ul>
                            {modules.map((module, index) => (
                              <li key={index}>{module}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Program Terms */}
              {programTerms.length > 0 && (
                <div className="course-section mt-4">
                  <div className="accordion" id="termsAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#termsContent">
                          Terms and Conditions
                        </button>
                      </h2>
                      <div id="termsContent" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <ul>
                            {programTerms.map((term, index) => (
                              <li key={index}>{term}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Register Button */}
            {program.status === 'active' && (
              <div className="mt-4">
                <a href={`/registrationCourses?program=${program.id}`} className="btn btn-primary">
                  Register
                  <i className="bi bi-arrow-right ms-2" />
                </a>
              </div>
            )}
          </div>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;