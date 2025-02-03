import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const Sliders = () => {
  const [sliders, setSliders] = useState([
    { id: 1, title: 'Slider 1', content: 'This is content for slider 1.', image: 'path/to/image1.jpg', link: 'https://example.com', status: 'active' },
    { id: 2, title: 'Slider 2', content: 'This is content for slider 2.', image: 'path/to/image2.jpg', link: 'https://example.com', status: 'inactive' },
  ]);
  
  const [newSlider, setNewSlider] = useState({ title: '', content: '', image: null, link: '', status: 'active' });
  const [editSlider, setEditSlider] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddSlider = () => {
    const newId = sliders.length + 1;
    setSliders([...sliders, { ...newSlider, id: newId }]);
    setNewSlider({ title: '', content: '', image: null, link: '', status: 'active' });
    setIsAddModalOpen(false);
  };

  const handleEditSlider = () => {
    setSliders(sliders.map(slider => (slider.id === editSlider.id ? editSlider : slider)));
    setEditSlider(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (slider) => {
    setEditSlider(slider);
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
                <h5 className="card-title fw-semibold mb-4">Sliders Management</h5>
                <div className="d-flex justify-content-start mb-3">
                  <button 
                    className="btn btn-primary btn-sm" // جعل الزر صغيراً
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
                      {sliders.map(slider => (
                        <tr key={slider.id}>
                          <th scope="row" className="ps-0 fw-medium">{slider.id}</th>
                          <td className="fw-medium">{slider.title}</td>
                          <td className="fw-medium">{slider.content}</td>
                          <td className="fw-medium"><img src={slider.image} alt={slider.title} width="50" /></td>
                          <td className="fw-medium"><a href={slider.link}>Link</a></td>
                          <td className="text-center fw-medium">
                            <button className={`btn ${slider.status === 'active' ? 'btn-success' : 'btn-danger'} btn-sm`}>
                              {slider.status.charAt(0).toUpperCase() + slider.status.slice(1)}
                            </button>
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(slider)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => setSliders(sliders.filter(s => s.id !== slider.id))} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
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
                      <input type="file" className="form-control" onChange={(e) => setNewSlider({ ...newSlider, image: URL.createObjectURL(e.target.files[0]) })} required />
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
                      <input type="file" className="form-control" onChange={(e) => setEditSlider({ ...editSlider, image: URL.createObjectURL(e.target.files[0]) })} />
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