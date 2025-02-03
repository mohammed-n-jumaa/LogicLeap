import React from 'react';
import '../../assets/css/styles.css';

const ProgramDetailsModal = ({ program, onClose }) => {
    if (!program) return null;
  
    return (
      <div className="modal fade show" id="programModal" tabIndex="-1" style={{display: 'block'}}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Program Details</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="image-container">
                <img 
                  src={program.image} 
                  alt="Program Image" 
                  className="img-fluid" 
                  style={{ maxWidth: '50%', height: 'auto', display: 'block', margin: '0 auto' }} 
                />
              </div>
              <p><strong>Title:</strong> <span>{program.title}</span></p>
              <p><strong>Description:</strong> <span>{program.description}</span></p>
              <p><strong>Duration:</strong> <span>{program.duration}</span> hours</p>
              <p><strong>Cost:</strong> ${program.cost}</p>
              <p><strong>Price:</strong> <span>{program.price}</span></p>
              <p><strong>Status:</strong> <span>{program.status}</span></p>
              <p><strong>Category ID:</strong> <span>{program.categoryId}</span></p>
              <p><strong>Start Date:</strong> <span>{program.startDate}</span></p>
              <p><strong>Mode:</strong> <span>{program.mode}</span></p>
              <p><strong>Zoom Link:</strong> <a href={program.zoomLink} target="_blank" rel="noopener noreferrer">Join Zoom</a></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProgramDetailsModal;
