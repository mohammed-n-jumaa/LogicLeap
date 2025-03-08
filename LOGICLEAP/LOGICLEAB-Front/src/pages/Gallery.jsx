import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

// Create base axios instance with proper configuration
const api = axios.create({
  baseURL: 'https://logicleap-769836b54d38.herokuapp.com/api/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false
});

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newGallery, setNewGallery] = useState({ 
    program_id: '', 
    images: [], 
    status: 'active' 
  });
  const [editGallery, setEditGallery] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImagesToDelete, setSelectedImagesToDelete] = useState([]);

  useEffect(() => {
    fetchGalleries();
    fetchPrograms();
  }, []);

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const response = await api.get('/galleries');
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setGalleries(response.data);
        } else if (response.data && typeof response.data === 'object') {
          const dataArray = response.data.data || [];
          setGalleries(dataArray);
        } else {
          console.error('Unexpected data format:', response.data);
          setGalleries([]);
        }
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      setError('Failed to fetch galleries: ' + (error.response?.data?.error || error.message));
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs');
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setPrograms(response.data);
        } else if (response.data && typeof response.data === 'object') {
          const dataArray = response.data.data || [];
          setPrograms(dataArray);
        }
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      Swal.fire('Error!', 'Failed to fetch programs', 'error');
      setPrograms([]);
    }
  };

  const handleAddGallery = async () => {
    if (!newGallery.program_id || newGallery.images.length === 0) {
      Swal.fire('Warning!', 'Please select a program and at least one image', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('program_id', newGallery.program_id);
    formData.append('status', newGallery.status);
    
    // Append multiple images
    newGallery.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    setLoading(true);
    try {
      await api.post('/galleries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setNewGallery({ program_id: '', images: [], status: 'active' });
      setIsAddModalOpen(false);
      await fetchGalleries();
      Swal.fire('Success!', 'Gallery added successfully.', 'success');
    } catch (error) {
      console.error('Error adding gallery:', error);
      Swal.fire('Error!', error.response?.data?.error || 'Failed to add gallery', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditGallery = async () => {
    if (!editGallery.program_id) {
      Swal.fire('Warning!', 'Program is required', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('program_id', editGallery.program_id);
    formData.append('status', editGallery.status);
    formData.append('_method', 'PUT');

    // Append new images if any
    if (editGallery.newImages) {
      editGallery.newImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // Append image IDs to delete if any
    if (selectedImagesToDelete.length > 0) {
      selectedImagesToDelete.forEach((id, index) => {
        formData.append(`delete_image_ids[${index}]`, id);
      });
    }

    setLoading(true);
    try {
      await api.post(`/galleries/${editGallery.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setEditGallery(null);
      setSelectedImagesToDelete([]);
      setIsEditModalOpen(false);
      await fetchGalleries();
      Swal.fire('Success!', 'Gallery updated successfully.', 'success');
    } catch (error) {
      console.error('Edit error:', error);
      Swal.fire('Error!', error.response?.data?.error || 'Failed to update gallery', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGallery = async (id) => {
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
      setLoading(true);
      try {
        await api.delete(`/galleries/${id}`);
        await fetchGalleries();
        Swal.fire('Deleted!', 'Gallery has been deleted.', 'success');
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire('Error!', error.response?.data?.error || 'Failed to delete gallery', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageSelection = (e) => {
    if (e.target.files) {
      setNewGallery({
        ...newGallery,
        images: [...Array.from(e.target.files)]
      });
    }
  };

  const handleEditImageSelection = (e) => {
    if (e.target.files) {
      setEditGallery({
        ...editGallery,
        newImages: [...Array.from(e.target.files)]
      });
    }
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImagesToDelete(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      }
      return [...prev, imageId];
    });
  };

  // Filtering and pagination logic
  const filteredGalleries = galleries.filter(gallery => {
    if (!searchQuery.trim()) return true;
    return gallery.program_name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGalleries = filteredGalleries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);

  const formatImageUrl = (path) => {
    if (!path) return '/placeholder-image.jpg';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const cleanedPath = path.replace(/^\/+/, '');
    return `https://logicleap-769836b54d38.herokuapp.com/storage/${cleanedPath}`;
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />
      <div className="body-wrapper">
        <Header />
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Gallery Management</h5>
              
              {loading && <LoadingSpinner />}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-3 align-items-center">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search galleries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-select"
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
                <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                  Add Gallery
                </button>
              </div>

              {/* Gallery List */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Program</th>
                      <th>Images</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGalleries.map(gallery => (
                      <tr key={gallery.id}>
                        <td>{gallery.id}</td>
                        <td>{gallery.program_name}</td>
                        <td>
                          <div className="d-flex gap-2">
                            {gallery.images.map((image, index) => (
                              <img
                                key={image.id}
                                src={formatImageUrl(image.image_path)}
                                alt={`Gallery ${gallery.id} #${index + 1}`}
                                width="50"
                                height="50"
                                className="object-fit-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder-image.jpg';
                                }}
                              />
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${gallery.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                            {gallery.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info me-2" onClick={() => {
                            setEditGallery({
                              ...gallery,
                              newImages: []
                            });
                            setIsEditModalOpen(true);
                          }}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteGallery(gallery.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredGalleries.length)} of {filteredGalleries.length} entries
                  </div>
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                          Previous
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
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Gallery Modal */}
        {isAddModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Gallery</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Program</label>
                      <select 
                        className="form-select"
                        value={newGallery.program_id}
                        onChange={(e) => setNewGallery({ ...newGallery, program_id: e.target.value })}
                      >
                        <option value="">Select Program</option>
                        {programs.map(program => (
                          <option key={program.id} value={program.id}>{program.title || program.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Images</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelection}
                      />
                      <small className="text-muted">You can select multiple images</small>
                      {newGallery.images.length > 0 && (
                        <div className="mt-2">
                          <p>Selected {newGallery.images.length} image(s)</p>
                          <div className="d-flex gap-2 flex-wrap">
                            {Array.from(newGallery.images).map((image, index) => (
                              <div key={index} className="position-relative">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview #${index + 1}`}
                                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={newGallery.status}
                        onChange={(e) => setNewGallery({ ...newGallery, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddGallery}>Save Gallery</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Gallery Modal */}
        {isEditModalOpen && editGallery && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Gallery</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Program</label>
                      <select
                        className="form-select"
                        value={editGallery.program_id}
                        onChange={(e) => setEditGallery({ ...editGallery, program_id: e.target.value })}
                      >
                        <option value="">Select Program</option>
                        {programs.map(program => (
                          <option key={program.id} value={program.id}>{program.title || program.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Current Images</label>
                      <div className="d-flex gap-2 flex-wrap">
                        {editGallery.images.map((image) => (
                          <div key={image.id} className="position-relative">
                            <img
                              src={formatImageUrl(image.image_path)}
                              alt="Gallery content"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                              className={selectedImagesToDelete.includes(image.id) ? 'opacity-50' : ''}
                            />
                            <div className="form-check position-absolute top-0 end-0">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedImagesToDelete.includes(image.id)}
                                onChange={() => toggleImageSelection(image.id)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedImagesToDelete.length > 0 && (
                        <small className="text-danger d-block mt-1">
                          {selectedImagesToDelete.length} image(s) marked for deletion
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Add New Images</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleEditImageSelection}
                      />
                      {editGallery.newImages && editGallery.newImages.length > 0 && (
                        <div className="mt-2">
                          <p>New images selected: {editGallery.newImages.length}</p>
                          <div className="d-flex gap-2 flex-wrap">
                            {Array.from(editGallery.newImages).map((image, index) => (
                              <div key={index}>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`New upload #${index + 1}`}
                                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={editGallery.status}
                        onChange={(e) => setEditGallery({ ...editGallery, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedImagesToDelete([]);
                  }}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditGallery}>Update Gallery</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;