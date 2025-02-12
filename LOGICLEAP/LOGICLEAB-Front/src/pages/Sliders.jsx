import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner

const Sliders = () => {
  const [sliders, setSliders] = useState([]);
  const [newSlider, setNewSlider] = useState({ title: '', content: '', image: null, link: '', status: 'active' });
  const [editSlider, setEditSlider] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch('http://localhost:8000/api/sliders');
      if (!response.ok) {
        throw new Error('Failed to fetch sliders');
      }
      const data = await response.json();
      setSliders(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching sliders:', error);
      setError('An error occurred while fetching sliders.');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleAddSlider = async () => {
    const formData = new FormData();
    formData.append('title', newSlider.title);
    formData.append('content', newSlider.content);
    formData.append('image', newSlider.image);
    formData.append('link', newSlider.link);
    formData.append('status', newSlider.status);

    try {
      await fetch('http://localhost:8000/api/sliders', {
        method: 'POST',
        body: formData,
      });

      fetchSliders();
      setNewSlider({ title: '', content: '', image: null, link: '', status: 'active' });
      setIsAddModalOpen(false);
      Swal.fire('Success!', 'Slider added successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error adding slider:', error);
      Swal.fire('Error!', 'An error occurred while adding the slider.', 'error'); // SweetAlert
    }
  };

  const handleEditSlider = async () => {
    if (!editSlider || !editSlider.id) {
      console.error('No slider selected for editing');
      return;
    }

    try {
      const formData = new FormData();
      if (editSlider.title) formData.append('title', editSlider.title);
      if (editSlider.content) formData.append('content', editSlider.content);
      if (editSlider.link) formData.append('link', editSlider.link);
      if (editSlider.status) formData.append('status', editSlider.status);
      if (editSlider.image instanceof File) {
        formData.append('image', editSlider.image);
      }

      const response = await fetch(`http://localhost:8000/api/sliders/${editSlider.id}`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-HTTP-Method-Override': 'PUT',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update slider');
      }

      await fetchSliders();
      setEditSlider(null);
      setIsEditModalOpen(false);
      Swal.fire('Success!', 'Slider updated successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error updating slider:', error);
      Swal.fire('Error!', error.message || 'An error occurred while updating the slider.', 'error'); // SweetAlert
    }
  };

  const openEditModal = (slider) => {
    setEditSlider(slider);
    setIsEditModalOpen(true);
  };

  const deleteSlider = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:8000/api/sliders/${id}/soft-delete`, {
        method: 'DELETE',
      });
      fetchSliders();
      Swal.fire('Deleted!', 'Slider has been deleted.', 'success');
    }
  };

  // Filter sliders based on search query
  const filteredSliders = sliders.filter(slider =>
    slider.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSliders = filteredSliders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSliders.length / itemsPerPage);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header />

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Sliders Management</h5>

                {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
                {error && <p className="text-danger">{error}</p>}

                {/* Search and Controls Section */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="search-box">
                      <div className="input-group" style={{ width: '250px' }}>
                        <span className="input-group-text border-primary bg-primary">
                          <i className="fas fa-search text-white"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-primary"
                          placeholder="Search sliders..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <select
                      className="form-select border-primary"
                      style={{ width: '100px' }}
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }}
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    Add Slider
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Title</th>
                        <th scope="col" className="ps-0">Content</th>
                        <th scope="col" className="ps-0">Image</th>
                        <th scope="col" className="ps-0">Link</th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentSliders.map(slider => (
                        <tr key={slider.id}>
                          <th scope="row" className="ps-0 fw-medium">{slider.id}</th>
                          <td className="fw-medium">{slider.title}</td>
                          <td className="fw-medium">{slider.content}</td>
                          <td className="fw-medium">
                            <img src={`http://localhost:8000/storage/${slider.image}`} alt={slider.title} width="50" />
                          </td>
                          <td className="fw-medium"><a href={slider.link}>Link</a></td>
                          <td className="text-center fw-medium">
                            <button className={`btn ${slider.status === 'active' ? 'btn-success' : 'btn-danger'} btn-sm`}>
                              {slider.status.charAt(0).toUpperCase() + slider.status.slice(1)}
                            </button>
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(slider)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => deleteSlider(slider.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSliders.length)} of {filteredSliders.length} entries
                  </div>
                  <nav>
                    <ul className="pagination pagination-primary mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                          <i className="fas fa-chevron-left"></i>
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Slider Modal */}
        {isAddModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Slider</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="sliderTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" value={newSlider.title} onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sliderContent" className="form-label">Content</label>
                      <textarea className="form-control" value={newSlider.content} onChange={(e) => setNewSlider({ ...newSlider, content: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sliderImage" className="form-label">Image</label>
                      <input type="file" className="form-control" onChange={(e) => setNewSlider({ ...newSlider, image: e.target.files[0] })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sliderLink" className="form-label">Link</label>
                      <input type="text" className="form-control" value={newSlider.link} onChange={(e) => setNewSlider({ ...newSlider, link: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sliderStatus" className="form-label">Status</label>
                      <select className="form-select" value={newSlider.status} onChange={(e) => setNewSlider({ ...newSlider, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddSlider}>Save Slider</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Slider Modal */}
        {isEditModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Slider</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={editSlider?.id} />
                    <div className="mb-3">
                      <label htmlFor="editSliderTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" value={editSlider?.title} onChange={(e) => setEditSlider({ ...editSlider, title: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editSliderContent" className="form-label">Content</label>
                      <textarea className="form-control" value={editSlider?.content} onChange={(e) => setEditSlider({ ...editSlider, content: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editSliderImage" className="form-label">Image</label>
                      <input type="file" className="form-control" onChange={(e) => setEditSlider({ ...editSlider, image: e.target.files[0] })} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editSliderLink" className="form-label">Link</label>
                      <input type="text" className="form-control" value={editSlider?.link} onChange={(e) => setEditSlider({ ...editSlider, link: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editSliderStatus" className="form-label">Status</label>
                      <select className="form-select" value={editSlider?.status} onChange={(e) => setEditSlider({ ...editSlider, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditSlider}>Update Slider</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sliders;