import React from 'react';
import '../../assets/css/styles.css';

// src/components/program/EditProgramModal.jsx
const EditProgramModal = ({ program, onClose, onSave }) => {
    const [formData, setFormData] = React.useState(program || {});
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({
        ...formData,
        [id.replace('edit', '').toLowerCase()]: value
      });
    };
  
    return (
      <div className="modal fade show" id="editModal" tabIndex="-1" style={{display: 'block'}}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Program</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form id="editForm" onSubmit={handleSubmit}>
                <div className="edit-input">
                  <label htmlFor="editTitle">Title:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="editTitle" 
                    value={formData.title || ''} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="edit-input">
                  <label htmlFor="editDescription">Description:</label>
                  <textarea 
                    className="form-control" 
                    id="editDescription" 
                    value={formData.description || ''} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div className="edit-input">
                  <label htmlFor="editDuration">Duration (hours):</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="editDuration" 
                    value={formData.duration || ''} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="edit-input">
                  <label htmlFor="editCost">Cost:</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="editCost" 
                    value={formData.cost || ''} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="edit-input">
                  <label htmlFor="editPrice">Price Type:</label>
                  <select 
                    className="form-select" 
                    id="editPrice" 
                    value={formData.price || ''} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="edit-input">
                  <label htmlFor="editStatus">Status:</label>
                  <select 
                    className="form-select" 
                    id="editStatus" 
                    value={formData.status || ''} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="edit-input">
                  <label htmlFor="editStartDate">Start Date:</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="editStartDate" 
                    value={formData.startDate || ''} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="edit-input">
                  <label htmlFor="editMode">Mode:</label>
                  <select 
                    className="form-select" 
                    id="editMode" 
                    value={formData.mode || ''} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="online">Online</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="edit-input">
                  <label htmlFor="editZoomLink">Zoom Link:</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    id="editZoomLink" 
                    value={formData.zoomLink || ''} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" form="editForm" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditProgramModal ;