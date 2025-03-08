import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner'; 

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ name: '', title: '', content: '', image: null, status: 'active' });
  const [editStory, setEditStory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New states for search, pagination, and loading
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/success-stories');
      setStories(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to fetch stories.');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleAddStory = async () => {
    const formData = new FormData();
    formData.append('name', newStory.name);
    formData.append('title', newStory.title);
    formData.append('content', newStory.content);
    if (newStory.image) {
      formData.append('image', newStory.image);
    }
    formData.append('status', newStory.status);

    try {
      await axios.post('https://logicleap-769836b54d38.herokuapp.com/api/success-stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setNewStory({ name: '', title: '', content: '', image: null, status: 'active' });
      setIsAddModalOpen(false);
      fetchStories();
      Swal.fire('Success!', 'Story added successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error adding story:', error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to add story', 'error'); // SweetAlert
    }
  };

  const handleEditStory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editStory.name);
      formData.append('title', editStory.title);
      formData.append('content', editStory.content);
      formData.append('status', editStory.status);
      formData.append('_method', 'PUT');

      if (editStory.image && editStory.image instanceof File) {
        formData.append('image', editStory.image);
      }

      await axios.post(`https://logicleap-769836b54d38.herokuapp.com/api/success-stories/${editStory.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditStory(null);
      setIsEditModalOpen(false);
      fetchStories();
      Swal.fire('Success!', 'Story updated successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Edit error:', error);
      Swal.fire('Error!', 'Failed to update story', 'error'); // SweetAlert
    }
  };

  const handleDeleteStory = async (id) => {
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
      await axios.delete(`https://logicleap-769836b54d38.herokuapp.com/api/success-stories/${id}`);
      fetchStories();
      Swal.fire('Deleted!', 'Your story has been deleted.', 'success'); // SweetAlert
    }
  };

  const openEditModal = (story) => {
    setEditStory(story);
    setIsEditModalOpen(true);
  };

  // Filter stories based on search
  const filteredStories = stories.filter(story =>
    story.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories = filteredStories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header /> 

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Success Stories Management</h5>
                
                {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
                {error && <p className="text-danger">{error}</p>}

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
                          placeholder="Search stories..."
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
                    Add Story
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Name</th>
                        <th scope="col" className="ps-0">Title</th>
                        <th scope="col" className="ps-0">Content</th>
                        <th scope="col" className="ps-0">Image</th>
                        <th scope="col" className="ps-0">Status</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentStories.map(story => (
                        <tr key={story.id}>
                          <th scope="row" className="ps-0 fw-medium">{story.id}</th>
                          <td className="fw-medium">{story.name}</td>
                          <td className="fw-medium">{story.title}</td>
                          <td className="fw-medium">{story.content}</td>
                          <td className="fw-medium">
                            {/* Corregido el atributo alt para eliminar "Image of" */}
                            <img src={`https://logicleap-769836b54d38.herokuapp.com/storage/${story.image}`} alt={story.title} width="50" />
                          </td>
                          <td className="fw-medium">
                            {story.status === 'active' ? (
                              <span className="badge bg-success text-white">Active</span>
                            ) : (
                              <span className="badge bg-danger text-white">Inactive</span>
                            )}
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(story)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => handleDeleteStory(story.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStories.length)} of {filteredStories.length} entries
                  </div>
                  <nav>
                    <ul className="pagination pagination-primary mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                          <i className="fas fa-chevron-left"></i>
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button className="page-link" 
                                  onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
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

        {/* Add Story Modal */}
        {isAddModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Story</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="storyName" className="form-label">Name</label>
                      <input type="text" className="form-control" value={newStory.name} onChange={(e) => setNewStory({ ...newStory, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="storyTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" value={newStory.title} onChange={(e) => setNewStory({ ...newStory, title: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="storyContent" className="form-label">Content</label>
                      <textarea className="form-control" value={newStory.content} onChange={(e) => setNewStory({ ...newStory, content: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="storyImage" className="form-label">Image</label>
                      <input type="file" className="form-control" onChange={(e) => setNewStory({ ...newStory, image: e.target.files[0] })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="storyStatus" className="form-label">Status</label>
                      <select className="form-select" value={newStory.status} onChange={(e) => setNewStory({ ...newStory, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddStory}>Save Story</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Story Modal */}
        {isEditModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Story</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={editStory?.id} />
                    <div className="mb-3">
                      <label htmlFor="editStoryName" className="form-label">Name</label>
                      <input type="text" className="form-control" value={editStory?.name} onChange={(e) => setEditStory({ ...editStory, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editStoryTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" value={editStory?.title} onChange={(e) => setEditStory({ ...editStory, title: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editStoryContent" className="form-label">Content</label>
                      <textarea className="form-control" value={editStory?.content} onChange={(e) => setEditStory({ ...editStory, content: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editStoryImage" className="form-label">Image</label>
                      <input type="file" className="form-control" onChange={(e) => setEditStory({ ...editStory, image: e.target.files[0] })} />
                      <small className="text-muted">Leave empty to keep the current image</small>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editStoryStatus" className="form-label">Status</label>
                      <select className="form-select" value={editStory?.status} onChange={(e) => setEditStory({ ...editStory, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditStory}>Update Story</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;