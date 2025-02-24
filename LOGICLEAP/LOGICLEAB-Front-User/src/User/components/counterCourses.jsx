import React from 'react'

function counterCourses() {
  return (
  <section id="hero" className="hero">
    <div className="container " >
      <div className="row stats-row gy-4 " data-aos="fade-up" data-aos-delay={500}>
        <div className="col-lg-3 col-md-6">
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-people-fill" />
            </div>
            <div className="stat-content">
              <h4>10K+</h4>
              <p className="mb-0">Users</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-briefcase" />
            </div>
            <div className="stat-content">
              <h4>30+ </h4>
              <p className="mb-0">Employees</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-mortarboard-fill" />
            </div>
            <div className="stat-content">
              <h4>80+</h4>
              <p className="mb-0">Courses</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-item">
            <div className="stat-icon">
              <i className="bi bi-backpack-fill" />
            </div>
            <div className="stat-content">
              <h4>6K+</h4>
              <p className="mb-0">Students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default counterCourses