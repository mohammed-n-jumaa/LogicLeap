import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const ProgramRegistrations = () => {
  const [registrations, setRegistrations] = useState([
    { id: 1, userId: 101, programId: 201, date: '2023-01-01', status: 'pending' },
    { id: 2, userId: 102, programId: 202, date: '2023-02-01', status: 'confirmed' },
    { id: 3, userId: 103, programId: 203, date: '2023-03-01', status: 'cancelled' },
  ]);

  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleChangeStatus = (registration) => {
    setSelectedRegistration(registration);
    setNewStatus(registration.status);
  };

  const handleSaveChanges = () => {
    setRegistrations((prev) =>
      prev.map((reg) => 
        reg.id === selectedRegistration.id ? { ...reg, status: newStatus } : reg
      )
    );
    setSelectedRegistration(null);
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
                <h5 className="card-title fw-semibold mb-4">Program Registrations</h5>
                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th>Registration ID</th>
                        <th>User ID</th>
                        <th>Program ID</th>
                        <th>Registration Date</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration) => (
                        <tr key={registration.id}>
                          <th className="ps-0 fw-medium">{registration.id}</th>
                          <td className="fw-medium">{registration.userId}</td>
                          <td className="fw-medium">{registration.programId}</td>
                          <td className="fw-medium">{registration.date}</td>
                          <td className="text-center fw-medium">
                            <span className={`status-badge status-${registration.status}`}>
                              {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                            </span>
                          </td>
                          <td className="text-center fw-medium">
                            <button className="btn btn-warning change-status" onClick={() => handleChangeStatus(registration)}>Change Status</button>
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

        {/* Change Status Modal */}
        {selectedRegistration && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Registration Status</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedRegistration(null)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={selectedRegistration.id} />
                    <div className="mb-3">
                      <label htmlFor="newStatus" className="form-label">New Status</label>
                      <select value={newStatus} className="form-select" onChange={(e) => setNewStatus(e.target.value)} required>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRegistration(null)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .status-badge {
          padding: 8px 12px;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          text-align: center;
          display: inline-block;
        }
        .status-pending {
          background-color: #f0ad4e; 
        }
        .status-confirmed {
          background-color: #5cb85c; 
        }
        .status-cancelled {
          background-color: #d9534f; 
        }
      `}</style>
    </div>
  );
};

export default ProgramRegistrations;