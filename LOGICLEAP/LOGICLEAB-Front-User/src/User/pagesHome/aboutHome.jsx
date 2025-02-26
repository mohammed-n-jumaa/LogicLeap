import React from 'react';
import "../assets/css/main.css";
import { Routes, Route } from 'react-router-dom'; 

function About() {
  return (
    <>
    <main className="main">
      {/* About Section */}
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4 align-items-center justify-content-between">
            <div className="col-xl-5" data-aos="fade-up" data-aos-delay={200}>
              <span className="about-meta">MORE ABOUT US</span>
              <h2 className="about-title">
                Start your journey in learning Information Technology with us.
              </h2>
              <p className="about-description">
                Embark on a transformative journey into Information Technology with
                our comprehensive learning programs tailored to empower your digital
                skills and career aspirations.
              </p>
              <div className="row feature-list-wrapper">
                <div className="col-md-6">
                  <ul className="feature-list">
                    <li>
                      <i className="bi bi-check-circle-fill" />
                      Full Stack
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />
                      Back End
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />
                      Front End
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="feature-list">
                    <li>
                      <i className="bi bi-check-circle-fill" />
                      UI/UX
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />
                      SQL
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />
                      Agile
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-wrapper">
                <div className="row gy-4">
                  <div className="col-lg-5">
                    <div className="profile d-flex align-items-center gap-3">
                      <img
                        src="assets/img/avatar-1.webp"
                        alt="CEO Profile"
                        className="profile-image"
                      />
                      <div>
                        <h4 className="profile-name">Mohmmad Smith</h4>
                        <p className="profile-position">trainer &amp; Founder</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="contact-info d-flex align-items-center gap-2">
                      <i className="bi bi-telephone-fill" />
                      <div>
                        <p className="contact-label">Call us anytime</p>
                        <p className="contact-number">+962 787665773</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6" data-aos="fade-up" data-aos-delay={300}>
              <div className="image-wrapper">
                <div
                  className="images position-relative"
                  data-aos="zoom-out"
                  data-aos-delay={400}
                >
                  <img
                    src="assets/img/about-5.webp"
                    alt="Business Meeting"
                    className="img-fluid main-image rounded-4"
                  />
                  <img
                    src="assets/img/about-2.webp"
                    alt="Team Discussion"
                    className="img-fluid small-image rounded-4"
                  />
                </div>
                <div className="experience-badge floating">
                  <h3>
                    15+ <span>Years</span>
                  </h3>
                  <p>Of experience in business Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /About Section */}
    </main>
    </>
  );
}

export default About;
