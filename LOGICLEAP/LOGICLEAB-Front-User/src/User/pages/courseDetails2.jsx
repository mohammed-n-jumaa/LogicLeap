import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CourseDetails = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  // إضافة حالة للصورة المكبرة
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    // Fetch program data from Laravel backend
    const fetchProgram = async () => {
      try {
        const response = await axios.get(`https://logicleap-769836b54d38.herokuapp.com/api/programs/${id}`);
        setProgram(response.data);
        setLoading(false);
        
        // تحقق من حالة البرنامج، إذا كان غير نشط قم بتوجيه المستخدم للصفحة الرئيسية
        if (response.data && response.data.status !== 'active') {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching program:', error);
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id, navigate]);

  
  const openLightbox = (imagePath) => {
    setCurrentImage(imagePath);
    setLightboxOpen(true);
 
    document.body.style.overflow = 'hidden';
  };

 
  const closeLightbox = () => {
    setLightboxOpen(false);
    
    document.body.style.overflow = 'auto';
  };

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
    return `https://logicleap-769836b54d38.herokuapp.com/storage/${cleanedPath}`;
  };

  // Check if gallery has any images
  const hasGalleryImages = () => {
    if (!program?.galleries || program.galleries.length === 0) return false;
    
    // Check if any gallery has images
    return program.galleries.some(gallery => 
      gallery.images && gallery.images.length > 0
    );
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

  // Add custom CSS to ensure arrow positioning and lightbox styling
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

    .empty-gallery {
      width: 100%;
      height: 200px;
      background-color: #f8f9fa;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      border-bottom: 1px solid #e7e7e7;
    }
    
    .lightbox-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .lightbox-container {
      position: relative;
      max-width: 100%;
      max-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .lightbox-image {
      max-width: 100%;
      max-height: 95vh;
      object-fit: contain;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      width: auto;
      height: auto;
      min-height: 70vh;
    }
    
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s;
    }
    
    .lightbox-close:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    
    .gallery-image {
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .gallery-image:hover {
      transform: scale(1.05);
    }

    /* تحسين الأزرار في الصورة المكبرة للتنقل بين الصور */
    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s;
      z-index: 1010;
    }
    
    .lightbox-nav:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    
    .lightbox-prev {
      left: 20px;
    }
    
    .lightbox-next {
      right: 20px;
    }

    /* إضافة تأثير تحميل للصورة */
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    
    .image-loading {
      animation: pulse 1.5s infinite;
    }
    
    /* تنسيق زر التسجيل الرئيسي */
    .register-button-container {
      display: flex;
      justify-content: center;
      margin: 2rem 0;
    }
    
   .main-register-button {
  padding: 12px 30px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(255, 0, 0, 0.2);
  transition: all 0.3s ease;
  background-color: #ff4c4c; /* لون الزر الأساسي */
  border: none;
}

.main-register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
  background-color: #008000; /* لون الزر عند التحويم */
}

    
    .main-register-button i {
      transition: transform 0.3s ease;
    }
    
    .main-register-button:hover i {
      transform: translateX(5px);
    }
  `;

  // Slider settings with custom arrows
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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

      {/* Custom styles for slider arrows and empty gallery */}
      <style>{sliderStyles}</style>

      {/* نافذة الصورة المكبرة */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="bi bi-x"></i>
            </button>
            <img 
              src={currentImage} 
              alt="Enlarged gallery image" 
              className="lightbox-image" 
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          </div>
        </div>
      )}

      {/* Gallery Section - Check if has images */}
      {hasGalleryImages() ? (
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
                        className="gallery-image"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "4px",
                        }}
                        onClick={() => openLightbox(formatImageUrl(image.image_path))}
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
      ) : (
        <div className="empty-gallery">
          <i className="bi bi-images" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "8px" }}></i>
          <h4 className="text-muted">Programw Overview</h4>
          <p className="text-center text-muted px-4">Explore our comprehensive curriculum and program details below</p>
        </div>
      )}

      {/* Course Header */}
      <div className="text-center page-title light-background">
        <h1>{program.title}</h1>
        <p className="lead">{program.category ? program.category.name : ''}</p>
      </div>

      {/* New Registration Button - Prominently Displayed */}
      {program.status === 'active' && (
        <div className="register-button-container">
          <a href={`/registrationCourses?program=${program.id}`} className="btn btn-primary main-register-button">
            Register Now <i className="bi bi-arrow-right ms-2"></i>
          </a>
        </div>
      )}

      <div className="container">
        <div className="course-content mt-2">
          <div className="row mt-4">
            <div className="col-md-8">
              {/* Course Overview */}
              <div className="course-section">
                <h2 className="mb-4">Programe Overview</h2>
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
                  <a href={`/registrationCourses?program=${program.id}`} className="btn btn-primary w-100 mt-3">
                      Register <i className="bi bi-arrow-right ms-2"></i>
                    </a>
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Programe Details</h3>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Duration:</strong> {program.duration} {program.duration > 1 ? 'Hours' : 'Hour'}
                    </li>
                    <li><strong>Dates:</strong> {new Date(program.start_date).toLocaleDateString()} - {new Date(program.end_date).toLocaleDateString()}</li>
                    <li><strong>Mode:</strong> {program.mode.charAt(0).toUpperCase() + program.mode.slice(1)}</li>
                    <li><strong>Location:</strong> {program.location}</li>
                    <li><strong>Price:</strong> {priceDisplay}</li>
                  </ul>
                  
                  {/* The Register button has been removed from here */}
                </div>
              </div>

              {/* Course Curriculum */}
              {modules.length > 0 && (
                <div className="course-section mt-4">
                  <div className="accordion" id="curriculumAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#moduleContent">
                          Programe Modules
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
          </div>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;