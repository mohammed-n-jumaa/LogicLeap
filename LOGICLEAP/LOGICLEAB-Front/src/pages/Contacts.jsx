import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch('http://localhost:8000/api/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('An error occurred while fetching contacts.');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header /> 

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Contacts Management</h5>
                
                {loading && <LoadingSpinner />} {/* Show loading spinner when loading */}
                {error && <p className="text-danger">{error}</p>}

                {/* Search Section */}
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
                          placeholder="Search contacts..."
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
                </div>

                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Name</th>
                        <th scope="col" className="ps-0">Email</th>
                        <th scope="col" className="ps-0">Phone</th>
                        <th scope="col" className="ps-0">Message</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentContacts.map(contact => (
                        <tr key={contact.id}>
                          <th scope="row" className="ps-0 fw-medium">{contact.id}</th>
                          <td className="fw-medium">{contact.name}</td>
                          <td className="fw-medium">{contact.email}</td>
                          <td className="fw-medium">{contact.phone}</td>
                          <td className="fw-medium">{contact.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} entries
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
      </div>
    </div>
  );
};

export default Contacts;