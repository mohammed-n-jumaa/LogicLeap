import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddProgram = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ!',
          text: 'حدث خطأ أثناء تحميل التصنيفات.',
          confirmButtonText: 'حسناً'
        });
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await axios.post('http://localhost:8000/api/programs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      Swal.fire({
        icon: 'success',
        title: 'تمت الإضافة بنجاح!',
        text: 'تمت إضافة البرنامج بنجاح.',
        confirmButtonText: 'حسناً'
      }).then(() => {
        navigate('/programs');
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message || 'حدث خطأ أثناء إضافة البرنامج.',
        confirmButtonText: 'حسناً'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />
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
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="card border-0 shadow-lg" style={{ marginTop: "40px", background: 'linear-gradient(to right bottom, #ffffff, #fff5f5)' }}>
                <div className="card-body p-5">
                  <h3 className="fw-bold text-center" style={{ color: '#ff4c4c' }}>Add New Program</h3>
                  <p className="text-muted text-center">Fill out the form below to add a new program</p>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">Title</label>
                          <input
                            type="text"
                            className="form-control border-0 shadow-sm"
                            id="title"
                            name="title"
                            placeholder="Enter program title"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="category_id" className="form-label">Category</label>
                          <select
                            className="form-select border-0 shadow-sm"
                            id="category_id"
                            name="category_id"
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="start_date" className="form-label">Start Date</label>
                          <input
                            type="date"
                            className="form-control border-0 shadow-sm"
                            id="start_date"
                            name="start_date"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="end_date" className="form-label">End Date</label>
                          <input
                            type="date"
                            className="form-control border-0 shadow-sm"
                            id="end_date"
                            name="end_date"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="duration" className="form-label">Duration (hours)</label>
                          <input
                            type="number"
                            className="form-control border-0 shadow-sm"
                            id="duration"
                            name="duration"
                            placeholder="Enter duration in hours"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="cost" className="form-label">Cost</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control border-0 shadow-sm"
                            id="cost"
                            name="cost"
                            placeholder="Enter cost (optional)"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="price" className="form-label">Price Type</label>
                          <select
                            className="form-select border-0 shadow-sm"
                            id="price"
                            name="price"
                            required
                          >
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">Status</label>
                          <select
                            className="form-select border-0 shadow-sm"
                            id="status"
                            name="status"
                            required
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="mode" className="form-label">Mode</label>
                          <select
                            className="form-select border-0 shadow-sm"
                            id="mode"
                            name="mode"
                            required
                          >
                            <option value="online">Online</option>
                            <option value="onsite">Onsite</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="zoom_link" className="form-label">Zoom Link</label>
                          <input
                            type="url"
                            className="form-control border-0 shadow-sm"
                            id="zoom_link"
                            name="zoom_link"
                            placeholder="Enter Zoom link (optional)"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">Location</label>
                          <input
                            type="text"
                            className="form-control border-0 shadow-sm"
                            id="location"
                            name="location"
                            placeholder="Enter location"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="image" className="form-label">Program Image</label>
                          <input
                            type="file"
                            className="form-control border-0 shadow-sm"
                            id="image"
                            name="image"
                            accept="image/*"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea
                            className="form-control border-0 shadow-sm"
                            id="description"
                            name="description"
                            rows="3"
                            placeholder="Enter program description"
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="modules" className="form-label">Modules</label>
                          <textarea
                            className="form-control border-0 shadow-sm"
                            id="modules"
                            name="modules"
                            rows="3"
                            placeholder="Enter program modules (optional)"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="what_youll_learn" className="form-label">What You'll Learn</label>
                          <textarea
                            className="form-control border-0 shadow-sm"
                            id="what_youll_learn"
                            name="what_youll_learn"
                            rows="3"
                            placeholder="Enter what you'll learn (optional)"
                          ></textarea>
                        </div>
                      </div>

                      {/* Program Terms Field */}
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="program_terms" className="form-label">Program Terms</label>
                          <textarea
                            className="form-control border-0 shadow-sm"
                            id="program_terms"
                            name="program_terms"
                            rows="3"
                            placeholder="Enter program terms (optional)"
                          ></textarea>
                        </div>
                      </div>

                      {/* WhatsApp Link Field */}
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="whatsapp_link" className="form-label">WhatsApp Link</label>
                          <input
                            type="url"
                            className="form-control border-0 shadow-sm"
                            id="whatsapp_link"
                            name="whatsapp_link"
                            placeholder="Enter WhatsApp link (optional)"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-lg px-5 py-3 rounded-pill shadow-sm" 
                          style={{ 
                              background: 'linear-gradient(to right, #ff4c4c, #ff6666)',
                              color: '#fff',
                              border: 'none',
                              transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        <i className="fas fa-plus-circle me-2"></i>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProgram;