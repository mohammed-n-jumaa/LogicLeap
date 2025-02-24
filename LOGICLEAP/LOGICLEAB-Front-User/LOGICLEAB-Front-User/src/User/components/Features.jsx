import React from 'react';

const Features = () => {
  return (
    <section id="features-cards" className="features-cards section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-box orange">
              <i className="bi bi-award"></i>
              <h4>High Work Efficiency</h4>
              <p>We are committed to delivering the highest levels of quality and efficiency in everything we do. We focus on improving performance and providing effective solutions tailored to meet our clients' needs.</p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-box blue">
              <i className="bi bi-patch-check"></i>
              <h4>Credibility in Operations</h4>
              <p>We believe in building trust-based relationships with our clients. We operate with complete transparency and ensure that every project is executed with precision, meeting the agreed-upon standards.</p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="300">
            <div className="feature-box green">
              <i className="bi bi-sunrise"></i>
              <h4>Commitment to Deadlines</h4>
              <p>We value our clients' time and are committed to delivering projects on schedule. Our team works efficiently to complete projects without compromising on quality.</p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="400">
            <div className="feature-box red">
              <i className="bi bi-shield-check"></i>
              <h4>Continuous Technical Support</h4>
              <p>We offer continuous technical support to ensure smooth operations and handle any challenges that may arise. Our team is here to assist you and respond to inquiries at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
