import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SuccessStory() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true); // تعيين حالة التحميل إلى true قبل جلب البيانات
      try {
        const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/success-stories');
        const storiesWithImagePath = response.data.map((story) => ({
          ...story,
          image: story.image ? `https://logicleap-769836b54d38.herokuapp.com/storage/${story.image}` : null, // معالجة الصورة إذا كانت موجودة
        }));
        setStories(storiesWithImagePath); // تحديث قائمة القصص
        setError(null); // إعادة تعيين الخطأ إذا تم جلب البيانات بنجاح
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch success stories.'); // تعيين الخطأ في حالة حدوث استثناء
      } finally {
        setLoading(false); // تعيين حالة التحميل إلى false بعد إتمام جلب البيانات
      }
    };

    fetchStories(); // استدعاء دالة جلب البيانات
  }, []); // هذه الدالة ستنفذ مرة واحدة عند تحميل الصفحة

  // عرض حالة التحميل أو الخطأ إذا كانت موجودة
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="main">
      {/* success story Section */}
      <section id="testimonials" className="testimonials section light-background">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Success Stories of Our Programming Course Graduates</h2>
          <p>
            Inspiring experiences of individuals who built successful projects after training
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row g-5">
            {stories.map((story, index) => (
              <div className="col-lg-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="testimonial-item">
                  <img
                    src={story.image || 'default-image.jpg'} // استخدام الصورة من الـ API أو صورة افتراضية إذا كانت غير موجودة
                    className="testimonial-img"
                    alt={story.name}
                  />
                  <h3>{story.name}</h3>
                  <h4>{story.title}</h4>
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>{story.content}</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* /success story Section */}
    </main>
  );
}

export default SuccessStory;
