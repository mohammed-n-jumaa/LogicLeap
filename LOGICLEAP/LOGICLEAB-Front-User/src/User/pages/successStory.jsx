import React from 'react'

function successStory() {
  return (
<main className="main">
  {/* success story Section */}
  <section id="testimonials" className="testimonials section light-background">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Success Stories of Our Programming Course Graduates</h2>
      <p>
        Inspiring experiences of individuals who built successful projects after
        training
      </p>
    </div>
    {/* End Section Title */}
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
          <div className="testimonial-item">
            <img
              src="assets/img/testimonials/testimonials-1.jpg"
              className="testimonial-img"
              alt=""
            />
            <h3>Ali Goodman</h3>
            <h4> From Graduate to Freelance Web Developer</h4>
            {/* <div class="stars">
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
      </div> */}
            <p>
              <i className="bi bi-quote quote-icon-left" />
              <span>
                After taking our programming course, Ali started working as a
                freelance web developer. Thanks to the skills he gained, he was
                able to build projects for both local and international clients,
                helping him significantly grow his career.
              </span>
              <i className="bi bi-quote quote-icon-right" />
            </p>
          </div>
        </div>
        {/* End testimonial item */}
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
          <div className="testimonial-item">
            <img
              src="assets/img/testimonials/testimonials-2.jpg"
              className="testimonial-img"
              alt=""
            />
            <h3>Sara Wilsson</h3>
            <h4>Head of Software Development Team</h4>
            {/* <div class="stars">
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
      </div> */}
            <p>
              <i className="bi bi-quote quote-icon-left" />
              <span>
                Sara had a dream to excel in the field of programming. After
                successfully completing the course, she is now leading a
                software development team at a startup working on innovative AI
                projects.
              </span>
              <i className="bi bi-quote quote-icon-right" />
            </p>
          </div>
        </div>
        {/* End testimonial item */}
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={300}>
          <div className="testimonial-item">
            <img
              src="assets/img/testimonials/testimonials-4.jpg"
              className="testimonial-img"
              alt=""
            />
            <h3>Fahad Karlis</h3>
            <h4>From Beginner to Backend Developer</h4>
            {/* <div class="stars">
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
      </div> */}
            <p>
              <i className="bi bi-quote quote-icon-left" />
              <span>
                Fahad started learning programming with our courses and aspired
                to work as a backend developer. Now, he works at a large tech
                company, contributing to the development of complex applications
                and systems using cutting-edge technologies.
              </span>
              <i className="bi bi-quote quote-icon-right" />
            </p>
          </div>
        </div>
        {/* End testimonial item */}
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
          <div className="testimonial-item">
            <img
              src="assets/img/testimonials/testimonials-3.jpg"
              className="testimonial-img"
              alt=""
            />
            <h3>Mona Brandon</h3>
            <h4>Freelancer</h4>
            {/* <div class="stars">
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
      </div> */}
            <p>
              <i className="bi bi-quote quote-icon-left" />
              <span>
                Mona decided to develop her own mobile app after completing the
                programming course. Today, her app has over 10,000 downloads and
                generates steady income through ads and in-app purchases.
              </span>
              <i className="bi bi-quote quote-icon-right" />
            </p>
          </div>
        </div>
        {/* End testimonial item */}
      </div>
    </div>
  </section>
  {/* /success story Section */}
</main>

  )
}

export default successStory