import React from 'react';
import { Calendar, Clock, MapPin, Video, DollarSign, Tag, Layers } from 'lucide-react';

// Helper function to convert string to bullet points
const convertToBulletPoints = (text) => {
  if (!text) return [];
  return text.split('\n').filter(item => item.trim() !== '');
};

const ProgramDetailsModal = ({ program, onClose, categories }) => {
  if (!program) return null;

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US');

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'bg-success' : 'bg-danger';
  };

  const getCategoryName = () => {
    if (program.category && typeof program.category === 'object') {
      return program.category.name || 'Unknown Category';
    }
    return 'Category not specified';
  };

  // Convert strings to arrays
  const programTerms = convertToBulletPoints(program.program_terms);
  const modules = convertToBulletPoints(program.modules);
  const learningPoints = convertToBulletPoints(program.what_youll_learn);

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold fs-4 w-100 text-center">{program.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Previous code remains the same until Program Terms Card */}
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
                  e.target.src = '/placeholder-image.jpg';
                  e.target.onerror = null;
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
                      <div className="d-flex align-items-center gap-2">
                        <Layers className="text-primary" size={20} />
                        <div>
                          <small className="text-muted d-block">Category</small>
                          <span className="fw-medium">{getCategoryName(program.category_id)}</span>
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
                            <a href={program.zoom_link} target="_blank" rel="noopener noreferrer" className="text-purple text-decoration-none">
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
                          <span className="badge bg-light mt-1 fw-bold text-purple">
                            {program.mode}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Tag className="text-purple" size={20} />
                        <div>
                          <small className="text-muted d-block">WhatsApp Link</small>
                          {program.whatsapp_link ? (
                            <a href={program.whatsapp_link} target="_blank" rel="noopener noreferrer" className="text-purple text-decoration-none">
                              Contact on WhatsApp
                            </a>
                          ) : (
                            <span className="fw-medium">Not available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Terms Card - Updated */}
            <div className="card border-0 shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)' }}>
              <div className="card-body">
                <h3 className="fs-5 fw-bold mb-4 text-info">Program Terms</h3>
                <div className="mt-2">
                  {programTerms.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {programTerms.map((term, index) => (
                        <li key={index} className="mb-2 d-flex align-items-start">
                          <span className="me-2 text-info">•</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0">No program terms specified</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modules and What You'll Learn Card - Updated */}
            <div className="card border-0 shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #f9f9ff 0%, #ffffff 100%)' }}>
              <div className="card-body">
                <h3 className="fs-5 fw-bold mb-4 text-info">Program Modules & Learnings</h3>
                <div className="d-flex flex-column gap-4">
                  <div>
                    <small className="text-muted d-block mb-3">Modules</small>
                    {modules.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {modules.map((module, index) => (
                          <li key={index} className="mb-2 d-flex align-items-start">
                            <span className="me-2 text-info">•</span>
                            <span>{module}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">No modules specified</p>
                    )}
                  </div>
                  <div>
                    <small className="text-muted d-block mb-3">What You'll Learn</small>
                    {learningPoints.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {learningPoints.map((point, index) => (
                          <li key={index} className="mb-2 d-flex align-items-start">
                            <span className="me-2 text-info">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">No learning points specified</p>
                    )}
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
                      <small className="text-muted d-block">Cost</small>
                      <span className="fw-medium">${program.cost}</span>
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
                style={{ backgroundColor: program.status === 'active' ? null : '#ff4c4c' }}
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