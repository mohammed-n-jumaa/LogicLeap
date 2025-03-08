import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Features() {
  const [activeTab, setActiveTab] = useState(0);  
  const [services, setServices] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/site-services');  // تأكد من الرابط الخاص بـ API
        setServices(response.data);  
        setError(null); 
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch services.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchServices();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

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
            {services.map((service, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${activeTab === index ? 'active show' : ''}`}
                  onClick={() => handleTabClick(index)}
                >
                  <h4>{service.title}</h4>  
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
          {services.map((service, index) => (
            <div
              key={index}
              className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
            >
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>{service.title}</h3>  
                  <p className="fst-italic">{service.description}</p> 

                  <div className="hero-buttons">
                    <a href="/registrationServices" className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Contact us</a>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src={`assets/img/features-illustration-${(index % 3) + 1}.webp`}  
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
