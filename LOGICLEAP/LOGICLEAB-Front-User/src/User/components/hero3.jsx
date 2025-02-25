import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Hero3() {
  const [activeSlide, setActiveSlide] = useState(0);  
  const [slides, setSlides] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  // Add state for statistics
  const [statistics, setStatistics] = useState([]);

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sliders'); 
        setSlides(response.data); 
        setError(null); 
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch slides.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchSlides();
  }, []);

  // useEffect to fetch statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/statistics', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          // Filter only active statistics
          const activeStats = Array.isArray(response.data) 
            ? response.data.filter(stat => stat.status === 'active')
            : [];
          setStatistics(activeStats);
        }
      } catch (err) {
        console.error('Error fetching statistics:', err.message);
      }
    };

    fetchStatistics();
  }, []);

  // Get text color class based on background color
  const getTextColorClass = (bgColorClass) => {
    const colorMapping = {
      'bg-light-danger': 'text-danger',
      'bg-light-success': 'text-success',
      'bg-light-warning': 'text-warning',
      'bg-light-info': 'text-info',
      'bg-light-primary': 'text-primary'
    };
    
    return colorMapping[bgColorClass] || 'text-danger';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, [slides]);

  const goToNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  // Convert Font Awesome classes to Bootstrap Icons
  const convertIconClass = (faIcon) => {
    const iconMapping = {
      'fas fa-users': 'bi bi-people-fill',
      'fas fa-briefcase': 'bi bi-briefcase',
      'fas fa-graduation-cap': 'bi bi-mortarboard-fill',
      'fas fa-user-graduate': 'bi bi-backpack-fill',
      'fas fa-book': 'bi bi-book-fill',
      'fas fa-chalkboard-teacher': 'bi bi-person-workspace'
    };
    
    return iconMapping[faIcon] || 'bi bi-people-fill';
  };

  return (
    <>
      <div id="carouselExampleDark" className="carousel carousel-fade slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item ${activeSlide === index ? 'active' : ''}`}>
              <img src={`http://localhost:8000/storage/${slide.image}`} className="d-block w-100" alt={`Slide ${index + 1}`} />
              <div className="carousel-caption d-none d-md-block">
               
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={goToPrevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={goToNextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <section id="hero" className="hero section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                <div className="company-badge mb-4">
                  <i className="bi bi-gear-fill me-2"></i>
                  Empower Young Minds with 21st-Century Skills
                </div>

                <h1 className="mb-4">
                  Unlock your potentials <br />
                  <span className="accent-text"> with LogicLeap.</span>
                </h1>

                <p className="mb-4 mb-md-5">
                  At LogicLeap, we're on a mission to prepare the next generation for a future driven by innovation. Through our dynamic programs in programming, entrepreneurship, and creativity, we equip children and youth with the skills they need to thrive in a rapidly changing world.
                </p>

                <div className="hero-buttons">
                  <a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">Explore Programs</a>
                  <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="btn btn-link mt-2 mt-sm-0 glightbox">
                    <i className="bi bi-play-circle me-1"></i>
                    Request a Custom Service
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image" data-aos="zoom-out" data-aos-delay="300">
                <img src="assets/img/illustration-1.webp" alt="Hero Image" className="img-fluid" />
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="500">
            {statistics.slice(0, 4).map((stat, index) => {
              const textColorClass = getTextColorClass(stat.color);
              const bootstrapIcon = convertIconClass(stat.icon);
              
              return (
                <div key={stat.id || index} className="col-lg-3 col-md-6">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <i className={`${bootstrapIcon} ${textColorClass}`}></i>
                    </div>
                    <div className="stat-content">
                      <h4>{stat.value}</h4>
                      <p className="mb-0">{stat.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero3;