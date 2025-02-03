// src/pages/AddProgram.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../assets/css/styles.min.css';

const AddProgram = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Program submitted");
    navigate('/programs'); 
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar /> {/* استدعاء مكون Sidebar هنا */}

      <div className="body-wrapper">
        <header className="app-header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item d-block d-xl-none">
                <a className="nav-link sidebartoggler nav-icon-hover" href="javascript:void(0)">
                  <i className="ti ti-menu-2"></i>
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Add New Program</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="category_id" className="form-label">Category ID</label>
                      <input type="number" className="form-control" id="category_id" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="start_date" className="form-label">Start Date</label>
                      <input type="date" className="form-control" id="start_date" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="duration" className="form-label">Duration (hours)</label>
                      <input type="number" className="form-control" id="duration" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="cost" className="form-label">Cost</label>
                      <input type="number" step="0.01" className="form-control" id="cost" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <select className="form-select" id="price" required>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select className="form-select" id="status" required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="mode" className="form-label">Mode</label>
                      <select className="form-select" id="mode" required>
                        <option value="online">Online</option>
                        <option value="onsite">Onsite</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="zoom_link" className="form-label">Zoom Link</label>
                      <input type="url" className="form-control" id="zoom_link" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Upload Image</label>
                      <input type="file" className="form-control" id="image" accept="image/*" required />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control" id="description" rows="3" required></textarea>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="py-6 px-6 text-center">
          <p className="mb-0 fs-4">Design and Developed by <a href="https://adminmart.com/" target="_blank" className="pe-1 text-primary text-decoration-underline">AdminMart.com</a> Distributed by <a href="https://themewagon.com/" target="_blank" className="pe-1 text-primary text-decoration-underline">ThemeWagon</a></p>
        </div>
      </div>
    </div>
  );
};

export default AddProgram;