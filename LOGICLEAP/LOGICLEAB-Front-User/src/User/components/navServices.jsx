import React, { useState } from 'react';

function Features() {
  const [activeTab, setActiveTab] = useState('web');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section id="features" className="features section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>We offer innovative and advanced web development services.</p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="d-flex justify-content-center">
          <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'web' ? 'active show' : ''}`}
                onClick={() => handleTabClick('web')}
              >
                <h4>Web</h4>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'erp' ? 'active show' : ''}`}
                onClick={() => handleTabClick('erp')}
              >
                <h4>ERP</h4>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'marketing' ? 'active show' : ''}`}
                onClick={() => handleTabClick('marketing')}
              >
                <h4>Marketing</h4>
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
          <div className={`tab-pane fade ${activeTab === 'web' ? 'show active' : ''}`} id="features-tab-1">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>Website creation and development</h3>
                <p className="fst-italic">
                  We specialize in creating responsive and user-friendly websites that provide seamless experiences across all devices. Our team focuses on delivering high-performance solutions tailored to meet your business needs.
                </p>
                <ul>
                  <li><i className="bi bi-check2-all"></i> <span>Custom website design and development.</span></li>
                  <li><i className="bi bi-check2-all"></i> <span>Mobile-responsive and cross-platform compatibility.</span></li>
                  <li><i className="bi bi-check2-all"></i> <span>SEO optimization and performance tuning.</span></li>
                </ul>
                <div className="hero-buttons">
                  <a href="/registrationServices" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Contact us</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img src="assets/img/features-illustration-1.webp" alt="" className="img-fluid" />
              </div>
            </div>
          </div>

          <div className={`tab-pane fade ${activeTab === 'erp' ? 'show active' : ''}`} id="features-tab-2">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>Neque exercitationem debitis</h3>
                <p className="fst-italic">
                  Our ERP solutions help businesses streamline their operations by integrating all departments and processes into one unified system. We develop scalable and flexible ERP solutions that adapt to your business needs.
                </p>
                <ul>
                  <li><i className="bi bi-check2-all"></i> <span>Custom ERP solutions tailored to your business.</span></li>
                  <li><i className="bi bi-check2-all"></i> <span>Real-time data management and reporting.</span></li>
                  <li><i className="bi bi-check2-all"></i> <span>Seamless integration with existing software.</span></li>
                </ul>
                <div className="hero-buttons">
                  <a href="/registrationServices" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Contact us</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img src="assets/img/features-illustration-2.webp" alt="" className="img-fluid" />
              </div>
            </div>
          </div>

          <div className={`tab-pane fade ${activeTab === 'marketing' ? 'show active' : ''}`} id="features-tab-3">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>ERP Development</h3>
                <ul>
                  <li><i className="bi bi-check2-all"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                  <li><i className="bi bi-check2-all"></i> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                  <li><i className="bi bi-check2-all"></i> <span>Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.</span></li>
                </ul>
                <div className="hero-buttons">
                  <a href="/registrationServices" className="btn btn-primary me-0 me-sm-2 mx-1">Contact us</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img src="assets/img/features-illustration-3.webp" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
