import React from 'react';

function Clients() {
  const clients = [
    'assets/img/clients/client-1.png',
    'assets/img/clients/client-2.png',
    'assets/img/clients/client-3.png',
    'assets/img/clients/client-4.png',
    'assets/img/clients/client-5.png',
    'assets/img/clients/client-6.png',
    'assets/img/clients/client-7.png',
    'assets/img/clients/client-8.png',
  ];

  return (
    <section id="clients" className="clients section">
      <div className="container" style={{ display: 'flex', overflowX: 'auto' }}>
        {clients.map((client, index) => (
          <div key={index} className="swiper-slide" style={{ minWidth: '69px', marginRight: '10px' }}>
            <img src={client} className="img-fluid" alt={`Client ${index + 1}`} style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              opacity: 0.5,
              transition: 'opacity 0.3s',
              filter: 'grayscale(100%)',
            }} />
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
