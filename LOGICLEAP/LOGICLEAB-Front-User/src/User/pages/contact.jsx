import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/main.css";
import Hero from '../components/hero';  
import Header from '../components/header';
import Footer from '../components/footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://logicleap-769836b54d38.herokuapp.com/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while sending the message.');
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <main className="main">
        <section id="contact" className="contact section light-background">
          <div className="container section-title" data-aos="fade-up" style={{ marginTop: 35 }}>
            <h2>Contact</h2>
            <p>Reach Out to Us for Prompt Assistance and Support</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row g-4 g-lg-5">
              <div className="col-lg-5">
                <div className="info-box" data-aos="fade-up" data-aos-delay={200} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ color: '#000', padding: '15px', marginBottom: '20px', borderBottom: '2px solid rgb(0, 0, 0)' }}>Contact Info</h3>
                <p style={{ color: '#333' }}>Feel free to get in touch with us through email, phone, or by visiting our main office. We look forward to hearing from you.</p>
                  
                  <div className="info-item" data-aos="fade-up" data-aos-delay={300}>
                    <div className="icon-box">
                      <i className="bi bi-geo-alt" style={{ color: '#eb4747', fontSize: '24px' }} />
                    </div>
                    <div className="content">
                      <h4 style={{ color: '#eb4747' }}>Our Location</h4>
                      <p style={{ color: '#333' }}>Ar-Razi St.141</p>
                      <p style={{ color: '#333' }}>Amman, Jordan</p>
                    </div>
                  </div>

                  <div className="info-item" data-aos="fade-up" data-aos-delay={400}>
                    <div className="icon-box">
                      <i className="bi bi-telephone" style={{ color: '#eb4747', fontSize: '24px' }} />
                    </div>
                    <div className="content">
                      <h4 style={{ color: '#eb4747' }}>Phone Number</h4>
                      <p style={{ color: '#333' }}>+962 75636826</p>
                      <p style={{ color: '#333' }}>+962 85684748</p>
                    </div>
                  </div>

                  <div className="info-item" data-aos="fade-up" data-aos-delay={500}>
                    <div className="icon-box">
                      <i className="bi bi-envelope" style={{ color: '#eb4747', fontSize: '24px' }} />
                    </div>
                    <div className="content">
                      <h4 style={{ color: '#eb4747' }}>Email Address</h4>
                      <p style={{ color: '#333' }}>info@LogicLeap.com</p>
                      <p style={{ color: '#333' }}>contact@LogicLeap.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-form" data-aos="fade-up" data-aos-delay={300}>
                  <h3>Get In Touch</h3>
                  <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <input 
                          type="text" 
                          name="name" 
                          className="form-control" 
                          placeholder="Your Name" 
                          required 
                          value={formData.name} 
                          onChange={handleChange} 
                          style={{ 
                            padding: '12px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd', 
                            fontSize: '16px', 
                            marginBottom: '15px', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                      </div>
                      <div className="col-md-6">
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email" 
                          placeholder="Your Email" 
                          required 
                          value={formData.email} 
                          onChange={handleChange} 
                          style={{ 
                            padding: '12px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd', 
                            fontSize: '16px', 
                            marginBottom: '15px', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                      </div>
                      <div className="col-12">
                        <input 
                          type="text" 
                          className="form-control" 
                          name="phone" 
                          placeholder="Phone Number" 
                          required 
                          value={formData.phone} 
                          onChange={handleChange} 
                          style={{ 
                            padding: '12px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd', 
                            fontSize: '16px', 
                            marginBottom: '15px', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                      </div>
                      <div className="col-12">
                        <textarea 
                          className="form-control" 
                          name="message" 
                          rows={6} 
                          placeholder="Message" 
                          required 
                          value={formData.message} 
                          onChange={handleChange} 
                          style={{ 
                            padding: '12px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd', 
                            fontSize: '16px', 
                            marginBottom: '15px', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                      </div>
                      <div className="col-12 text-center">
                        <div className="loading">Loading</div>
                        <div className="error-message" />
                        <div className="sent-message">
                          Your message has been sent. Thank you!
                        </div>
                        <button 
                          type="submit" 
                          className="btn" 
                          style={{ 
                            backgroundColor: '#eb4747', 
                            color: 'white', 
                            padding: '12px 30px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            fontSize: '16px', 
                            cursor: 'pointer', 
                            transition: 'background-color 0.3s ease', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#d43f3f'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#eb4747'}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-5" data-aos="fade-up">
            <div className="map-container" style={{ width: '100%', height: '400px', border: 0 }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3384.6285009163453!2d35.909527!3d31.9709737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca1dd7bca79dd%3A0x9b0416f056ff0786!2sOrange%20Digital%20Village!5e0!3m2!1sen!2sjo!4v1739829587678!5m2!1sen!2sjo"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer /> 
    </>
  );
}

export default Contact;