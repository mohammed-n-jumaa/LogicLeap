import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({ name: '', logo: null, website: '' });
  const [editPartner, setEditPartner] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const res = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/partners');
      setPartners(res.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setError('Failed to fetch partners.');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleAddPartner = async () => {
    if (!newPartner.name || !newPartner.logo || !newPartner.website) {
      Swal.fire('Error!', 'All fields are required.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', newPartner.name);
    formData.append('logo', newPartner.logo);
    formData.append('website', newPartner.website);

    try {
      await axios.post('https://logicleap-769836b54d38.herokuapp.com/api/partners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setNewPartner({ name: '', logo: null, website: '' });
      setIsAddModalOpen(false);
      fetchPartners();
      Swal.fire('Success!', 'Partner added successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error adding partner:', error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to add partner', 'error'); // SweetAlert
    }
  };

  const handleEditPartner = async () => {
    if (!editPartner?.name || !editPartner?.website) {
      Swal.fire('Error!', 'Name and Website are required fields.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', editPartner.name);
    formData.append('website', editPartner.website);
    
    if (editPartner.logo instanceof File) {
      formData.append('logo', editPartner.logo);
    }

    try {
      await axios.post(`https://logicleap-769836b54d38.herokuapp.com/api/partners/${editPartner.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditPartner(null);
      setIsEditModalOpen(false);
      fetchPartners();
      Swal.fire('Success!', 'Partner updated successfully.', 'success'); // SweetAlert
    } catch (error) {
      console.error('Error updating partner:', error);
      Swal.fire('Error!', 'Failed to update partner', 'error'); // SweetAlert
    }
  };

  const handleSoftDelete = async (id) => {
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
        await axios.delete(`https://logicleap-769836b54d38.herokuapp.com/api/partners/${id}`);
        fetchPartners();
        Swal.fire('Deleted!', 'Your partner has been deleted.', 'success'); // SweetAlert
      } catch (error) {
        console.error('Error deleting partner:', error);
        Swal.fire('Error!', 'Failed to delete partner', 'error'); // SweetAlert
      }
    }
  };

  const openEditModal = (partner) => {
    setEditPartner({
      id: partner.id,
      name: partner.name,
      logo: null,
      website: partner.website,
    });
    setIsEditModalOpen(true);
  };

  // Filter partners based on search
  const filteredPartners = partners.filter(partner =>
    partner.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.website?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header />

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Partners Management</h5>
                
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
                          placeholder="Search partners..."
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
                    Add Partner
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Name</th>
                        <th scope="col" className="ps-0">Logo</th>
                        <th scope="col" className="ps-0">Website</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentPartners.map(partner => (
                        <tr key={partner.id}>
                          <th scope="row" className="ps-0 fw-medium">{partner.id}</th>
                          <td className="fw-medium">{partner.name}</td>
                          <td className="fw-medium">
                            <img src={`https://logicleap-769836b54d38.herokuapp.com/storage/${partner.logo}`} alt={`Logo of ${partner.name}`} width="50" />
                          </td>
                          <td className="fw-medium">
                            <a href={partner.website} target="_blank" rel="noopener noreferrer">
                              {partner.website}
                            </a>
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit text-primary" onClick={() => openEditModal(partner)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash text-danger" onClick={() => handleSoftDelete(partner.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted fs-13">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPartners.length)} of {filteredPartners.length} entries
                  </div>
                  <nav>
                    <ul className="pagination pagination-primary mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                          <i className="fas fa-chevron-left"></i>
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
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

        {/* Add Partner Modal */}
        {isAddModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Partner</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="partnerName" className="form-label">Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="partnerName"
                        value={newPartner.name} 
                        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="partnerLogo" className="form-label">Logo</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        id="partnerLogo"
                        onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.files[0] })} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="partnerWebsite" className="form-label">Website</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        id="partnerWebsite"
                        value={newPartner.website} 
                        onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })} 
                        required 
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddPartner}>Save Partner</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Partner Modal */}
        {isEditModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Partner</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={editPartner?.id} />
                    <div className="mb-3">
                      <label htmlFor="editPartnerName" className="form-label">Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="editPartnerName"
                        value={editPartner?.name} 
                        onChange={(e) => setEditPartner({ ...editPartner, name: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editPartnerLogo" className="form-label">Logo</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        id="editPartnerLogo"
                        onChange={(e) => setEditPartner({ ...editPartner, logo: e.target.files[0] })} 
                      />
                      <small className="text-muted">Leave empty to keep the current logo</small>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editPartnerWebsite" className="form-label">Website</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        id="editPartnerWebsite"
                        value={editPartner?.website} 
                        onChange={(e) => setEditPartner({ ...editPartner, website: e.target.value })} 
                        required 
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditPartner}>Update Partner</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Partners;