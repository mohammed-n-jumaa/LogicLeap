import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; 

const ProgramRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Search and pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [programFilter, setProgramFilter] = useState(''); 

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/registrations');
      setRegistrations(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setError('Failed to fetch registrations.');
    } finally {
      setLoading(false); 
    }
  };

  // Filter registrations based on search and program filter
  const filteredRegistrations = registrations.filter(registration =>
    (registration.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    registration.program?.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (programFilter ? registration.program?.title === programFilter : true)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRegistrations = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  const handleChangeStatus = (registration) => {
    setSelectedRegistration(registration);
    setNewStatus(registration.status);
  };

  const handleSaveChanges = () => {
    axios.put(`https://logicleap-769836b54d38.herokuapp.com/api/registrations/${selectedRegistration.id}`, { status: newStatus })
      .then(response => {
        setRegistrations(prev =>
          prev.map(reg => 
            reg.id === response.data.id ? { ...reg, status: newStatus } : reg
          )
        );
        setSelectedRegistration(null);
      })
      .catch(error => {
        console.error('Error updating registration:', error);
      });
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
                
                {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
                {error && <p className="text-danger">{error}</p>}

                {/* Search and Controls Section */}
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
                          placeholder="Search registrations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <select
                      className="form-select border-primary"
                      style={{ width: '150px' }}
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                    >
                      <option value="">All Programs</option>
                      {registrations
                        .map(registration => registration.program?.title)
                        .filter((title, index, self) => title && self.indexOf(title) === index)
                        .map((title, index) => (
                          <option key={index} value={title}>{title}</option>
                        ))}
                    </select>
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
                </div>
                
                {/* Table Section */}
                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Form ID</th> 
                        <th>Program Name</th>
                        <th>Registration Date</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRegistrations.map((registration) => (
                        <tr key={registration.id}>
                          <th className="ps-0 fw-medium">{registration.id}</th>
                          <td className="fw-medium">{registration.user ? registration.user.name : 'N/A'}</td>
                          <td className="fw-medium">{registration.form_id ? registration.form_id : 'N/A'}</td> 
                          <td className="fw-medium">{registration.program ? registration.program.title : 'N/A'}</td>
                          <td className="fw-medium">
                            {new Date(registration.registration_date).toLocaleDateString()}
                          </td>
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

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRegistrations.length)} of {filteredRegistrations.length} entries
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
            </div>
          </div>
        </div>
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