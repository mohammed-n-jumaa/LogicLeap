import React, { useState, useEffect } from 'react';

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);  // حالة لتخزين الشريحة النشطة
  const slides = [
    { src: "assets/img/code5.jpg", title: "First slide label", description: "Some representative placeholder content for the first slide." },
    { src: "assets/img/code6.jpg", title: "Second slide label", description: "Some representative placeholder content for the second slide." },
    { src: "assets/img/code7.jpg", title: "Third slide label", description: "Some representative placeholder content for the third slide." },
  ];

  // التبديل بين الصور كل 15 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 15000); // التبديل كل 15 ثانية

    return () => clearInterval(interval); // تنظيف المؤقت عند إلغاء التثبيت
  }, []);

  const goToNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
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

      {/* Controls for navigation */}
      <button
        className="carousel-control-prev"
        type="button"
        onClick={goToPrevSlide}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={goToNextSlide}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Hero;
