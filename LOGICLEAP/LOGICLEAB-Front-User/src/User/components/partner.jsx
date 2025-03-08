import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      
      try {
        const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/partners');
        setClients(response.data);
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch partners.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPartners();
  }, []);

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <section id="clients" className="clients section py-5">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4">Our Partners</h2>
        
        <Slider {...settings}>
          {clients.map((client, index) => (
            <div key={index} className="px-2">
              <a 
                href={client.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="partner-link"
              >
                <div className="partner-item p-3">
                  <img
                    src={`https://logicleap-769836b54d38.herokuapp.com/storage/${client.logo}`}
                    className="img-fluid mx-auto"
                    alt={client.name || `Partner ${index + 1}`}
                    style={{
                      width: 'auto',
                      height: '80px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s',
                    }}
                  />
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
      
      <style>
        {`
          .partner-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 120px;
            transition: all 0.3s ease;
            background: transparent;
          }
          
          .partner-link {
            text-decoration: none;
            display: block;
          }
          
          .partner-link:hover .partner-item img {
            transform: translateY(-5px);
            filter: brightness(1.05);
          }
          
          .slick-dots li button:before {
            color: var(--accent-color);
          }
          
          .slick-prev:before, .slick-next:before {
            color: var(--accent-color);
          }
        `}
      </style>
    </section>
  );
}

export default Clients;