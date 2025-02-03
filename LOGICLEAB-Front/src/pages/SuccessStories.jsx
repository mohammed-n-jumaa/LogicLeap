import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const SuccessStories = () => {
  const [stories, setStories] = useState([
    { id: 1, name: 'Story 1', title: 'Title 1', content: 'Content for story 1', image: 'path/to/image1.jpg', status: 'active' },
    { id: 2, name: 'Story 2', title: 'Title 2', content: 'Content for story 2', image: 'path/to/image2.jpg', status: 'inactive' },
  ]);

  const [newStory, setNewStory] = useState({ name: '', title: '', content: '', image: null, status: 'active' });
  const [editStory, setEditStory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddStory = () => {
    const newId = stories.length + 1;
    setStories([...stories, { ...newStory, id: newId }]);
    setNewStory({ name: '', title: '', content: '', image: null, status: 'active' });
    setIsAddModalOpen(false);
  };

  const handleEditStory = () => {
    setStories(stories.map(story => (story.id === editStory.id ? editStory : story)));
    setEditStory(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (story) => {
    setEditStory(story);
    setIsEditModalOpen(true);
  };

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
                <div className="d-flex justify-content-start mb-3">
                  <button 
                    className="btn btn-primary btn-sm" 
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
                      {stories.map(story => (
                        <tr key={story.id}>
                          <th scope="row" className="ps-0 fw-medium">{story.id}</th>
                          <td className="fw-medium">{story.name}</td>
                          <td className="fw-medium">{story.title}</td>
                          <td className="fw-medium">{story.content}</td>
                          <td className="fw-medium"><img src={story.image} alt={`Image of ${story.title}`} width="50" /></td>
                          <td className="fw-medium">
                            {story.status === 'active' ? (
                              <span className="badge bg-success text-white">Active</span>
                            ) : (
                              <span className="badge bg-danger text-white">Inactive</span>
                            )}
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(story)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => setStories(stories.filter(s => s.id !== story.id))} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      <input type="file" className="form-control" onChange={(e) => setNewStory({ ...newStory, image: URL.createObjectURL(e.target.files[0]) })} required />
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
                      <input type="file" className="form-control" onChange={(e) => setEditStory({ ...editStory, image: URL.createObjectURL(e.target.files[0]) })} />
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