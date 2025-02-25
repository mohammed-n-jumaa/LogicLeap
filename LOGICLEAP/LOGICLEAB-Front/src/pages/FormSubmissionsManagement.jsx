import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/css/styles.min.css';
import LoadingSpinner from '../components/LoadingSpinner';

const FormSubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState([]);
  const [programs, setPrograms] = useState({});
  const [programsList, setProgramsList] = useState([]);
  const [detailSubmission, setDetailSubmission] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // States for search, pagination, and loading
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch submissions when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch submissions
        const submissionsResponse = await axios.get('http://localhost:8000/api/form-submissions');
        setSubmissions(submissionsResponse.data);
        
        // Fetch programs for name mapping
        const programsResponse = await axios.get('http://localhost:8000/api/programs');
        // Create a map of program_id to program title
        const programsMap = {};
        const programsArray = [];
        programsResponse.data.forEach(program => {
          programsMap[program.id] = program.title;
          programsArray.push({
            id: program.id,
            title: program.title
          });
        });
        setPrograms(programsMap);
        setProgramsList(programsArray);
        
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        setError('Failed to fetch data. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openDetailModal = (submission) => {
    setDetailSubmission(submission);
    setIsDetailModalOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  // Format UUID to be shorter and more readable
  const formatSubmissionId = (uuid) => {
    if (!uuid) return '';
    
    // Take only the first 8 characters of the UUID
    const shortId = uuid.split('-')[0];
    return `#${shortId}`;
  };

  // Filter submissions based on search and selected program
  const filteredSubmissions = submissions.filter(submission => {
    const searchText = searchQuery.toLowerCase();
    const programFilter = selectedProgram === 'all' || submission.program_id?.toString() === selectedProgram;
    
    const searchMatches = (
      submission.id?.toLowerCase().includes(searchText) ||
      submission.form_id?.toString().includes(searchText) ||
      submission.program_id?.toString().includes(searchText) ||
      (programs[submission.program_id] && programs[submission.program_id].toLowerCase().includes(searchText)) ||
      (submission.values && JSON.stringify(submission.values).toLowerCase().includes(searchText))
    );
    
    return searchMatches && programFilter;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  // Get program title from program_id
  const getProgramTitle = (programId) => {
    return programs[programId] || programId;
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedProgram, itemsPerPage]);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header />

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Form Submissions Management</h5>
                
                {loading && <LoadingSpinner />}
                {error && <p className="text-danger">{error}</p>}

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
                          placeholder="Search submissions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Program Filter Dropdown */}
                    <select
                      className="form-select border-primary"
                      style={{ width: '200px' }}
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                    >
                      <option value="all">All Programs</option>
                      {programsList.map(program => (
                        <option key={program.id} value={program.id.toString()}>
                          {program.title}
                        </option>
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

                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">Submission ID</th>
                        <th scope="col" className="ps-0">Form ID</th>
                        <th scope="col" className="ps-0">Program</th>
                        <th scope="col" className="ps-0">Submission Date</th>
                        <th scope="col" className="ps-0">IP Address</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentSubmissions.map(submission => (
                        <tr key={submission.id}>
                          <td className="fw-medium">
                            <span className="badge bg-primary text-white px-3 py-2 fs-6 rounded-pill">
                              {formatSubmissionId(submission.id)}
                            </span>
                          </td>
                          <td className="fw-medium">{submission.form_id}</td>
                          <td className="fw-medium">
                            {getProgramTitle(submission.program_id)}
                          </td>
                          <td className="fw-medium">{formatDate(submission.submitted_at)}</td>
                          <td className="fw-medium">{submission.ip_address}</td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-eye text-primary" onClick={() => openDetailModal(submission)} style={{ cursor: 'pointer', fontSize: '18px' }}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSubmissions.length)} of {filteredSubmissions.length} entries
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
              </div>
            </div>
          </div>
        </div>

        {/* View Submission Detail Modal */}
        {isDetailModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Submission Details</h5>
                  <button type="button" className="btn-close" onClick={() => setIsDetailModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p>
                        <strong>Submission ID:</strong> 
                        <span className="badge bg-primary text-white px-2 mx-2">{formatSubmissionId(detailSubmission.id)}</span>
                        <small className="text-muted">({detailSubmission.id})</small>
                      </p>
                      <p><strong>Form ID:</strong> {detailSubmission.form_id}</p>
                      <p><strong>Program:</strong> {getProgramTitle(detailSubmission.program_id)}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Submitted:</strong> {formatDate(detailSubmission.submitted_at)}</p>
                      <p><strong>IP Address:</strong> {detailSubmission.ip_address}</p>
                    </div>
                  </div>
                  
                  <h6 className="fw-semibold">Form Values:</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailSubmission.values && Object.entries(detailSubmission.values).map(([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>
                              {typeof value === 'object' 
                                ? JSON.stringify(value) 
                                : (Array.isArray(value) 
                                  ? value.join(', ') 
                                  : value.toString())}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsDetailModalOpen(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSubmissionsManagement;