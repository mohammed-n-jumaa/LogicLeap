import React, { useEffect } from 'react';
import { Calendar, Clock, MapPin, Video, DollarSign, Tag, Layers, Image } from 'lucide-react';
import Swal from 'sweetalert2';

const EditProgramModal = ({ program, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({});
  const [imageFile, setImageFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  useEffect(() => {
    if (program) {
      console.log('Program Data:', program);
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
        what_youll_learn: program.what_youll_learn || ''
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
  
    console.log([...dataToSend.entries()]); // هذا السطر للتأكد من أن البيانات يتم إرسالها بشكل صحيح
  
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
                            </select>
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
                    <div className="mt-2">
                      <small className="text-muted d-block mb-2">Modules</small>
                      <textarea
                        name="modules"
                        className="form-control"
                        value={formData.modules || ''}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter program modules..."
                      ></textarea>
                    </div>
                    <div className="mt-2">
                      <small className="text-muted d-block mb-2">What You'll Learn</small>
                      <textarea
                        name="what_youll_learn"
                        className="form-control"
                        value={formData.what_youll_learn || ''}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter learning objectives..."
                      ></textarea>
                    </div>
                  </div>
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