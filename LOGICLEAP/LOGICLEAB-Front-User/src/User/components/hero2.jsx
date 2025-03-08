import React, { useState, useEffect } from 'react';

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0); 
  const slides = [
    { src: "/assets/img/code5.jpg", title: "First slide label", description: "Some representative placeholder content for the first slide." },
    { src: "/assets/img/code6.jpg", title: "Second slide label", description: "Some representative placeholder content for the second slide." },
    { src: "/assets/img/code7.jpg", title: "Third slide label", description: "Some representative placeholder content for the third slide." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 15000); 

    return () => clearInterval(interval); 
  }, []);

  const goToNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section id="hero" className="hero section">
      <div id="carouselExampleDark" className="carousel carousel-fade slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item ${activeSlide === index ? 'active' : ''}`}>
              <img src={slide.src} className="d-block w-100" alt={`Slide ${index + 1}`} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slide.title}</h5>
                <p>{slide.description}</p>
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
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>
              <div className="company-badge mb-4">
                <i className="bi bi-gear-fill me-2" />
                Empower Young Minds with 21st-Century Skills
              </div>
              <h1 className="mb-4">
                Unlock your potentials <br />
                <span className="accent-text"> with LogicLeap.</span>
              </h1>
              <p className="mb-4 mb-md-5">
                At LogicLeap, we're on a mission to prepare the next generation for a future driven by innovation.
              </p>
              <div className="hero-buttons">
                <a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">
                  Explore Programs
                </a>
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="btn btn-link mt-2 mt-sm-0 glightbox">
                  <i className="bi bi-play-circle me-1" />
                  Request a Custom Service
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
              <img src="/assets/img/illustration-1.webp" alt="Hero Image" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;