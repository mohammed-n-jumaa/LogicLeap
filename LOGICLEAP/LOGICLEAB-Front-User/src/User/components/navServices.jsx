import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Features() {
  const [activeTab, setActiveTab] = useState(0);  // تعيين الفئة النشطة
  const [services, setServices] = useState([]);  // لتخزين الخدمات التي سيتم جلبها
  const [loading, setLoading] = useState(true);  // حالة التحميل
  const [error, setError] = useState(null);  // حالة الخطأ

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/site-services');  // تأكد من الرابط الخاص بـ API
        setServices(response.data);  // تعيين البيانات في حالة الخدمات
        setError(null);  // إعادة تعيين الخطأ إذا تم جلب البيانات بنجاح
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch services.');  // تعيين الخطأ في حالة حدوث استثناء
      } finally {
        setLoading(false);  // تعيين حالة التحميل إلى false بعد إتمام جلب البيانات
      }
    };

    fetchServices();
  }, []);

  // التعامل مع التبديل بين الـ tabs
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (loading) {
    return <div>Loading...</div>; // عرض نص التحميل أثناء جلب البيانات
  }

  if (error) {
    return <div>{error}</div>; // عرض رسالة الخطأ إذا كان هناك مشكلة
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
                  <h4>{service.title}</h4>  {/* عرض العنوان من الـ API */}
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
                  <h3>{service.title}</h3>  {/* عرض العنوان في الفقرة */}
                  <p className="fst-italic">{service.description}</p>  {/* عرض الوصف في الفقرة */}

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
