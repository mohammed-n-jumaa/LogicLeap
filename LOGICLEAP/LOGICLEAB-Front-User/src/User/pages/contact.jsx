import React from 'react'
import "../assets/css/main.css";
import Hero from '../components/hero';  
import Header from '../components/header';
import Footer from '../components/footer';

function Contact() {
  return (
    <>
      <Header/>
      <Hero /> 
      <main className="main">
        {/* Contact Section */}
        <section id="contact" className="contact section light-background">
          <div className="container section-title" data-aos="fade-up" style={{ marginTop: 35 }}>
            <h2>Contact</h2>
            <p>Reach Out to Us for Prompt Assistance and Support</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row g-4 g-lg-5">
              <div className="col-lg-5">
                <div className="info-box" data-aos="fade-up" data-aos-delay={200}>
                  <h3>Contact Info</h3>
                  <p>Feel free to get in touch with us through email, phone, or by visiting our main office. We look forward to hearing from you.</p>
                  <div className="info-item" data-aos="fade-up" data-aos-delay={300}>
                    <div className="icon-box">
                      <i className="bi bi-geo-alt" />
                    </div>
                    <div className="content">
                      <h4>Our Location</h4>
                      <p>A108 Mecca Street</p>
                      <p>Amman, Jordan</p>
                    </div>
                  </div>
                  <div className="info-item" data-aos="fade-up" data-aos-delay={400}>
                    <div className="icon-box">
                      <i className="bi bi-telephone" />
                    </div>
                    <div className="content">
                      <h4>Phone Number</h4>
                      <p>+962 75636826</p>
                      <p>+962 85684748</p>
                    </div>
                  </div>
                  <div className="info-item" data-aos="fade-up" data-aos-delay={500}>
                    <div className="icon-box">
                      <i className="bi bi-envelope" />
                    </div>
                    <div className="content">
                      <h4>Email Address</h4>
                      <p>info@LogicLeap.com</p>
                      <p>contact@LogicLeap.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-form" data-aos="fade-up" data-aos-delay={300}>
                  <h3>Get In Touch</h3>
                  <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required="" />
                      </div>
                      <div className="col-md-6">
                        <input type="email" className="form-control" name="email" placeholder="Your Email" required="" />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control" name="phone" placeholder="Phone Number" required="" />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" required="" />
                      </div>
                      <div className="col-12">
                        <textarea className="form-control" name="message" rows={6} placeholder="Message" required="" />
                      </div>
                      <div className="col-12 text-center">
                        <div className="loading">Loading</div>
                        <div className="error-message" />
                        <div className="sent-message">
                          Your message has been sent. Thank you!
                        </div>
                        <button type="submit" className="btn">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Contact Section */}
      </main>
      <Footer/>
    </>
  )
}

export default Contact;
