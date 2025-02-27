import React from 'react'
import CounterCourses from '../components/counterCourses'
import "../assets/css/main.css";
import Hero from '../components/hero';
import Header from '../components/header';
import Footer from '../components/footer';


function courses() {
  return (
<main className="main">
 <Header/>
   
  <div className="page-title" style={{ backgroundImage: 'url(assets/img/code5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
  <div className="container">
    <h1>Starter Page</h1>
    <nav className=" breadcrumbs">
      <ol>
        <li><a href="index.html">Home</a></li>
        <li className="current">Starter Page</li>
      </ol>
    </nav>
  </div>
</div>

  {/* /Hero Se  ction */}
  <section id="Courses" className="pricing section light-background">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>courses</h2>
      <p>Explore Our Comprehensive Courses in Information Technology</p>
    </div>
    {/* End Section Title */}
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row g-4 justify-content-center">
        {/* Basic Plan */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
          <div className="pricing-card">
            <h3>Front-End</h3>
            <div className="card">
              <img
                src="./assets/img/js3.jpeg"
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">9.9</span>
              {/* <span class="period">/ month</span> */}
            </div>

            <h4>Front-End Included:</h4>
            <ul className="features-list">
              <li>
                <i className="bi bi-check-circle-fill" />
                HTML &amp; CSS Fundamentals.
              </li>
              <li>
                <i className="bi bi-check-circle-fill" />
                Responsive Web Design.
              </li>
              <li>
                <i className="bi bi-check-circle-fill" />
                JavaScript &amp; Frameworks.
              </li>
            </ul>
            <a href="/courseDetails" className="btn btn-primary">
              Buy Now
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
        {/* Standard Plan */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Standard Plan</h3>
            <div className="card">
              <img
                src="./assets/img/js3.jpeg"
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">19.9</span>
              {/* <span class="period">/ month</span> */}
            </div>
            {/* <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p> */}
            <h4>Full-Stack Included:</h4>
            <ul className="features-list">
              <li>
                <i className="bi bi-check-circle-fill" />
                Learn Frontend Development.
              </li>
              <li>
                <i className="bi bi-check-circle-fill" />
                Master Backend Programming.
              </li>
              <li>
                <i className="bi bi-check-circle-fill" />
                Understand Databases.
              </li>
            </ul>
            <a href="/courseDetails" className="btn btn-light">
              Buy Now
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
        {/* Premium Plan */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={300}>
          <div className="pricing-card">
            <h3>Back-End</h3>
            <div className="card">
              <img
                src="./assets/img/js3.jpeg"
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">39.9</span>
              {/* <span class="period">/ month</span> */}
            </div>
            {/* <p class="description">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.</p> */}
            <h4>Back-End Included:</h4>
            <ul className="features-list">
              <li>
                <i className="bi bi-check-circle-fill" />
                Server-Side Programming.
              </li>
              <li>
                <i className="bi bi-check-circle-fill" />
                APIs &amp; Web Services.
              </li>
              <li>
                <i className="bi bi-check-circle-fill" />
                Database Management.
              </li>
            </ul>
            <a href="/courseDetails" className="btn btn-primary">
              Buy Now
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</main>

  )
}

export default courses