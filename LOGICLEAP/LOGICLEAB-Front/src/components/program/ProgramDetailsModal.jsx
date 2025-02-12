import React from 'react';
import { Calendar, Clock, MapPin, Video, DollarSign, Tag } from 'lucide-react';
import cssLogo from '../../assets/images/backgrounds/CSS-Logo.png'; // المسار النسبي

const ProgramDetailsModal = ({ program, onClose }) => {
  if (!program) return null;

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US');

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'bg-success' : 'bg-danger';
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold fs-4 w-100 text-center">{program.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
          <div className="position-relative mb-4 d-flex justify-content-center align-items-center">
              <img
                src={program.image}
                alt={program.title}
                className="w-auto"
                style={{
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Add a fallback image
                  e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                }}
              />
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
                        <div>
                          <small className="text-muted d-block">Start Date</small>
                          <span className="fw-medium">{formatDate(program.start_date)}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Calendar className="text-primary" size={20} />
                        <div>
                          <small className="text-muted d-block">End Date</small>
                          <span className="fw-medium">{formatDate(program.end_date)}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Clock className="text-primary" size={20} />
                        <div>
                          <small className="text-muted d-block">Duration</small>
                          <span className="fw-medium">{program.duration} hours</span>
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
                        <div>
                          <small className="text-muted d-block">Location</small>
                          <span className="fw-medium">{program.location || 'Not specified'}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Video className="text-purple" size={20} />
                        <div>
                          <small className="text-muted d-block">Zoom Link</small>
                          {program.zoom_link ? (
                            <a
                              href={program.zoom_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple text-decoration-none"
                            >
                              Join the Meeting
                            </a>
                          ) : (
                            <span className="fw-medium">Not available</span>
                          )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Tag className="text-purple" size={20} />
                        <div>
                          <small className="text-muted d-block">Attendance Mode</small>
                          <span
                            className="badge bg-light text-purple mt-1"
                            style={{ color: '#afbac8', fontWeight: 'bold' }}
                          >
                            {program.mode}
                          </span>
                        </div>
                      </div>
                    </div>
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
                    <div>
                      <small className="text-muted d-block">Price</small>
                      <span className="fw-medium">${program.price}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <small className="text-muted d-block mb-2">Description</small>
                    <p className="text-gray-700 lh-base">{program.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <span 
                className={`badge ${getStatusBadgeClass(program.status)}`}
                style={{ 
                  backgroundColor: program.status === 'active' ? null : '#ff4c4c'
                }}
              >
                {program.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsModal;