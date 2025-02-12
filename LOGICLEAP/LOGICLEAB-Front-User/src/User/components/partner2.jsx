// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import GLightbox from 'glightbox';
// import Swiper from 'swiper';
// import { PureCounter } from '@srexi/purecounterjs';

// const Main = () => {
//   useEffect(() => {
//     // تهيئة AOS
//     AOS.init({
//       duration: 600,
//       easing: 'ease-in-out',
//       once: true,
//       mirror: false,
//     });

//     // تهيئة GLightbox
//     const glightbox = GLightbox({
//       selector: '.glightbox'
//     });

//     // تعريف `initSwiperWithCustomPagination` إذا كانت غير معرّفة
//     const initSwiperWithCustomPagination = (swiperElement, config) => {
//       const swiperInstance = new Swiper(swiperElement, config);
//       // إضافة التخصيصات الخاصة بـ pagination هنا إذا كانت هناك حاجة
//     };

//     // تهيئة Swiper
//     document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
//       let config = JSON.parse(
//         swiperElement.querySelector(".swiper-config").innerHTML.trim()
//       );

//       if (swiperElement.classList.contains("swiper-tab")) {
//         initSwiperWithCustomPagination(swiperElement, config);  // استخدام الوظيفة هنا
//       } else {
//         new Swiper(swiperElement, config);
//       }
//     });

//     // تهيئة PureCounter
//     new PureCounter();

//     // يمكن إضافة أحداث أخرى هنا مثل الـ scroll أو التعامل مع الأزرار.

//   }, []);  // سيتم تنفيذ هذا الكود عند تحميل المكون فقط (مثل componentDidMount في React)

//   return (
//     <div>
//       {/* مكونات React هنا */}
//       <section id="clients" className="clients section">
//         <div className="container" data-aos="fade-up" data-aos-delay="100">
//           <div className="swiper init-swiper">
//             <script type="application/json" className="swiper-config">
//               {`
//                 {
//                   "loop": true,
//                   "speed": 600,
//                   "autoplay": {
//                     "delay": 5000
//                   },
//                   "slidesPerView": "auto",
//                   "pagination": {
//                     "el": ".swiper-pagination",
//                     "type": "bullets",
//                     "clickable": true
//                   },
//                   "breakpoints": {
//                     "320": {
//                       "slidesPerView": 2,
//                       "spaceBetween": 40
//                     },
//                     "480": {
//                       "slidesPerView": 3,
//                       "spaceBetween": 60
//                     },
//                     "640": {
//                       "slidesPerView": 4,
//                       "spaceBetween": 80
//                     },
//                     "992": {
//                       "slidesPerView": 6,
//                       "spaceBetween": 120
//                     }
//                   }
//                 }
//               `}
//             </script>
//             <div className="swiper-wrapper align-items-center">
//               <div className="swiper-slide"><img src="assets/img/clients/client-1.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-2.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-3.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-4.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-5.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-6.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-7.png" className="img-fluid" alt="" /></div>
//               <div className="swiper-slide"><img src="assets/img/clients/client-8.png" className="img-fluid" alt="" /></div>
//             </div>
//             <div className="swiper-pagination"></div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Main;
