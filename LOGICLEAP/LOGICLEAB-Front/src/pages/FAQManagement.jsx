import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', status: 'active' });
  const [editFAQ, setEditFAQ] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New states for search, pagination, and loading
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch FAQs when the component loads
  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get('http://localhost:8000/api/faqs');
        setFaqs(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching FAQs:', error.response ? error.response.data : error.message);
        setError('Failed to fetch FAQs. Please check the console for more details.');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchFAQs();
  }, []);

  const handleAddFAQ = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/faqs', newFAQ);
      setFaqs([...faqs, response.data]);
      setNewFAQ({ question: '', answer: '', status: 'active' });
      setIsAddModalOpen(false);
      Swal.fire('Success!', 'FAQ added successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error adding FAQ:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to add FAQ. Please check the console for more details.', 'error'); // SweetAlert
    }
  };

  const handleEditFAQ = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/faqs/${editFAQ.id}`, editFAQ);
      setFaqs(faqs.map(faq => (faq.id === editFAQ.id ? response.data : faq)));
      setEditFAQ(null);
      setIsEditModalOpen(false);
      Swal.fire('Success!', 'FAQ updated successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error updating FAQ:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to update FAQ. Please check the console for more details.', 'error'); // SweetAlert
    }
  };

  const handleDeleteFAQ = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/faqs/${id}`);
        setFaqs(faqs.filter(faq => faq.id !== id));
        Swal.fire('Deleted!', 'Your FAQ has been deleted.', 'success'); // SweetAlert
      } catch (error) {
        console.error('Error deleting FAQ:', error.response ? error.response.data : error.message);
        Swal.fire('Error!', 'Failed to delete FAQ. Please check the console for more details.', 'error'); // SweetAlert
      }
    }
  };

  const openEditModal = (faq) => {
    setEditFAQ(faq);
    setIsEditModalOpen(true);
  };

  // Filter FAQs based on search
  const filteredFAQs = faqs.filter(faq =>
    faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFAQs = filteredFAQs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header />

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">FAQ Management</h5>
                
                {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
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
                          placeholder="Search FAQs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
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
                  <button 
                    className="btn btn-primary" 
                    style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }} 
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    Add FAQ
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Question</th>
                        <th scope="col" className="ps-0">Answer</th>
                        <th scope="col" className="ps-0">Status</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentFAQs.map(faq => (
                        <tr key={faq.id}>
                          <th scope="row" className="ps-0 fw-medium">{faq.id}</th>
                          <td className="fw-medium">{faq.question}</td>
                          <td className="fw-medium">{faq.answer}</td>
                          <td className="fw-medium">
                            {faq.status === 'active' ? (
                              <span className="badge bg-success text-white">Active</span>
                            ) : (
                              <span className="badge bg-danger text-white">Inactive</span>
                            )}
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(faq)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => handleDeleteFAQ(faq.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFAQs.length)} of {filteredFAQs.length} entries
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

        {/* Add FAQ Modal */}
        {isAddModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add FAQ</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="faqQuestion" className="form-label">Question</label>
                      <input type="text" className="form-control" value={newFAQ.question} onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="faqAnswer" className="form-label">Answer</label>
                      <textarea className="form-control" value={newFAQ.answer} onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="faqStatus" className="form-label">Status</label>
                      <select className="form-select" value={newFAQ.status} onChange={(e) => setNewFAQ({ ...newFAQ, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddFAQ}>Save FAQ</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit FAQ Modal */}
        {isEditModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit FAQ</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={editFAQ?.id} />
                    <div className="mb-3">
                      <label htmlFor="editFAQQuestion" className="form-label">Question</label>
                      <input type="text" className="form-control" value={editFAQ?.question} onChange={(e) => setEditFAQ({ ...editFAQ, question: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFAQAnswer" className="form-label">Answer</label>
                      <textarea className="form-control" value={editFAQ?.answer} onChange={(e) => setEditFAQ({ ...editFAQ, answer: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFAQStatus" className="form-label">Status</label>
                      <select className="form-select" value={editFAQ?.status} onChange={(e) => setEditFAQ({ ...editFAQ, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditFAQ}>Update FAQ</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQManagement;