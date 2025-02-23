import React, { useEffect } from 'react';
import { Calendar, Clock, MapPin, Video, DollarSign, Tag, Layers, Image } from 'lucide-react';
import Swal from 'sweetalert2';

// DynamicList component from AddProgram
const DynamicList = ({ label, name, value, onChange }) => {
  const [items, setItems] = React.useState(['']);

  useEffect(() => {
    if (value) {
      // Split the string by newlines and filter out empty strings
      const initialItems = value.split('\n').filter(item => item.trim() !== '');
      setItems(initialItems.length > 0 ? initialItems : ['']);
    }
  }, [value]);

  const handleItemChange = (index, newValue) => {
    const newItems = [...items];
    newItems[index] = newValue;
    setItems(newItems);
    // Call the parent's onChange with the updated string
    onChange(name, newItems.filter(item => item.trim() !== '').join('\n'));
  };

  const handleAddItem = () => {
    setItems([...items, '']);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      // Call the parent's onChange with the updated string
      onChange(name, newItems.filter(item => item.trim() !== '').join('\n'));
    }
  };

  return (
    <div className="mb-3">
      <small className="text-muted d-block mb-2">{label}</small>
      {items.map((item, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
          <button
            type="button"
            onClick={() => handleRemoveItem(index)}
            className="btn"
            style={{
              background: 'linear-gradient(to right, #ff4c4c, #ff6666)',
              color: '#fff',
              width: '40px',
              height: '38px',
              padding: '0',
              borderRadius: '8px'
            }}
          >
            -
          </button>
          {index === items.length - 1 && (
            <button
              type="button"
              onClick={handleAddItem}
              className="btn"
              style={{
                background: 'linear-gradient(to right, #28a745, #34ce57)',
                color: '#fff',
                width: '40px',
                height: '38px',
                padding: '0',
                borderRadius: '8px'
              }}
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const EditProgramModal = ({ program, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({});
  const [imageFile, setImageFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  useEffect(() => {
    if (program) {
      setFormData(prevData => ({
        ...prevData,
        id: program.id,
        title: program.title,
        description: program.description,
        start_date: program.start_date,
        end_date: program.end_date,
        duration: program.duration,
        cost: program.cost,
        price: program.price,
        status: program.status,
        mode: program.mode,
        zoom_link: program.zoom_link || '',
        location: program.location,
        modules: program.modules || '',
        what_youll_learn: program.what_youll_learn || '',
        program_terms: program.program_terms || '',
        whatsapp_link: program.whatsapp_link || ''
      }));
      setPreviewImage(program.image || null);
    }
  }, [program]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        dataToSend.append(key, formData[key]);
      }
    });

    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      await onSave(dataToSend);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Program updated successfully!',
      });
      onClose();
    } catch (error) {
      console.error('Error saving program:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDynamicListChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold fs-4 w-100 text-center">
              Edit Program: {formData.title}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Title Input */}
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  className="form-control form-control-lg text-center"
                  value={formData.title || ''}
                  onChange={handleChange}
                  placeholder="Program Title"
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div className="position-relative mb-4 d-flex flex-column justify-content-center align-items-center">
                {previewImage || program.image ? (
                  <img
                    src={previewImage || program.image}
                    alt="Program"
                    className="w-auto"
                    style={{
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center"
                    style={{
                      height: '150px',
                      width: '150px',
                      borderRadius: '10px',
                      backgroundColor: '#f8f9fa',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                    <Image size={40} className="text-muted" />
                  </div>
                )}
                <div className="mt-3">
                  <input
                    type="file"
                    id="editImage"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ maxWidth: '300px' }}
                  />
                </div>
              </div>

              <div className="row g-4">
                {/* Program Info Card */}
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)' }}>
                    <div className="card-body">
                      <h3 className="fs-5 fw-bold mb-4 text-primary">Program Information</h3>
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-center gap-2">
                          <Calendar className="text-primary" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">Start Date</small>
                            <input
                              type="date"
                              name="start_date"
                              className="form-control"
                              value={formData.start_date || ''}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Calendar className="text-primary" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">End Date</small>
                            <input
                              type="date"
                              name="end_date"
                              className="form-control"
                              value={formData.end_date || ''}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Clock className="text-primary" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">Duration (hours)</small>
                            <input
                              type="number"
                              name="duration"
                              className="form-control"
                              value={formData.duration || ''}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance Details Card */}
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #ffffff 100%)' }}>
                    <div className="card-body">
                      <h3 className="fs-5 fw-bold mb-4 text-purple">Attendance Details</h3>
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-center gap-2">
                          <MapPin className="text-purple" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">Location</small>
                            <input
                              type="text"
                              name="location"
                              className="form-control"
                              value={formData.location || ''}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Video className="text-purple" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">Zoom Link</small>
                            <input
                              type="url"
                              name="zoom_link"
                              className="form-control"
                              value={formData.zoom_link || ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Tag className="text-purple" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">Attendance Mode</small>
                            <select
                              name="mode"
                              className="form-select"
                              value={formData.mode || ''}
                              onChange={handleChange}
                              required
                            >
                              <option value="online">Online</option>
                              <option value="onsite">Onsite</option>
                              <option value="hybrid">Hybrid</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Tag className="text-purple" size={20} />
                          <div className="flex-grow-1">
                            <small className="text-muted d-block">WhatsApp Link</small>
                            <input
                              type="url"
                              name="whatsapp_link"
                              className="form-control"
                              value={formData.whatsapp_link || ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modules and What You'll Learn Card */}
              <div className="card border-0 shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #f9f9ff 0%, #ffffff 100%)' }}>
                <div className="card-body">
                  <h3 className="fs-5 fw-bold mb-4 text-info">Program Modules & Learnings</h3>
                  <div className="d-flex flex-column gap-3">
                    <DynamicList
                      label="Modules"
                      name="modules"
                      value={formData.modules}
                      onChange={handleDynamicListChange}
                    />
                    <DynamicList
                      label="What You'll Learn"
                      name="what_youll_learn"
                      value={formData.what_youll_learn}
                      onChange={handleDynamicListChange}
                    />
                  </div>
                </div>
              </div>

              {/* Program Terms Card */}
              <div className="card border-0 shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)' }}>
                <div className="card-body">
                  <h3 className="fs-5 fw-bold mb-4 text-info">Program Terms</h3>
                  <DynamicList
                    label="Program Terms"
                    name="program_terms"
                    value={formData.program_terms}
                    onChange={handleDynamicListChange}
                  />
                </div>
              </div>

            {/* Cost and Description Card */}
            <div className="card border-0 shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #f0fff4 0%, #ffffff 100%)' }}>
                <div className="card-body">
                  <h3 className="fs-5 fw-bold mb-4 text-success">Cost and Description</h3>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <DollarSign className="text-success" size={20} />
                      <div className="flex-grow-1">
                        <small className="text-muted d-block">Price Type</small>
                        <select
                          name="price"
                          className="form-select"
                          value={formData.price || ''}
                          onChange={handleChange}
                          required
                        >
                          <option value="free">Free</option>
                          <option value="paid">Paid</option>
                        </select>
                      </div>
                    </div>
                    {formData.price === 'paid' && (
                      <div className="d-flex align-items-center gap-2">
                        <DollarSign className="text-success" size={20} />
                        <div className="flex-grow-1">
                          <small className="text-muted d-block">Cost Amount</small>
                          <input
                            type="number"
                            step="0.01"
                            name="cost"
                            className="form-control"
                            value={formData.cost || ''}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                    <div className="mt-2">
                      <small className="text-muted d-block mb-2">Description</small>
                      <textarea
                        name="description"
                        className="form-control"
                        value={formData.description || ''}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Enter program description..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <select
                  name="status"
                  className="form-select w-auto mx-auto"
                  value={formData.status || ''}
                  onChange={handleChange}
                  required
                  style={{
                    color: 'white',
                    borderRadius: '20px',
                    padding: '5px 20px',
                    backgroundColor: formData.status === 'active' ? '#28a745' : '#dc3545'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProgramModal;