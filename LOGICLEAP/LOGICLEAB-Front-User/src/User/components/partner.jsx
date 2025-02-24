
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Clients() {
  const [clients, setClients] = useState([]); // State to hold the clients data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from API
 useEffect(() => {
    const fetchpartners = async () => {
      setLoading(true); // تعيين حالة التحميل إلى true قبل جلب البيانات
      try {
        const response = await axios.get('http://localhost:8000/api/partners');
        const partnersWithImagePath = response.data.map((partner) => ({
          ...partner,
          image: partner.image
            ? `http://localhost:8000/storage/${partner.logo}`
            : null,
        }));
        setClients(partnersWithImagePath);
        setError(null);  // إعادة تعيين الخطأ إذا تم جلب البيانات بنجاح
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch partners.');  // تعيين الخطأ في حالة حدوث استثناء
      } finally {
        setLoading(false);  // تعيين حالة التحميل إلى false بعد إتمام جلب البيانات
      }
    };

    fetchpartners();
  }, []);

  // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text or spinner while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there is an issue
  }

  return (
    <section id="clients" className="clients section">
      <div className="container" style={{ display: 'flex', overflowX: 'auto' }}>
        {clients.map((client, index) => (
          <div key={index} className="swiper-slide" style={{ minWidth: '69px', marginRight: '10px' }}>
            <img 
              src={`http://localhost:8000/storage/${client.logo}`} // Assuming `image` is the field name in the API response
              className="img-fluid" 
              alt={`Client ${index + 1}`} 
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
                opacity: 0.5,
                transition: 'opacity 0.3s',
                filter: 'grayscale(100%)',
              }} 
            />
          </div>
        ))}
      </div>

      <style>
        {`
          .clients .swiper-slide img:hover {
            filter: none;
            opacity: 1;
          }

          .clients .swiper-pagination {
            margin-top: 20px;
            position: relative;
          }

          .clients .swiper-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            opacity: 1;
            background-color: color-mix(in srgb, var(--default-color), transparent 80%);
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .clients .swiper-pagination .swiper-pagination-bullet-active {
            background-color: var(--accent-color);
          }
        `}
      </style>
    </section>
  );
}

export default Clients;
