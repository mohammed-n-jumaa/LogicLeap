import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const Partners = () => {
  const [partners, setPartners] = useState([
    { id: 1, name: 'Partner 1', logo: 'path/to/logo1.jpg', website: 'https://partner1.com' },
    { id: 2, name: 'Partner 2', logo: 'path/to/logo2.jpg', website: 'https://partner2.com' },
  ]);

  const [newPartner, setNewPartner] = useState({ name: '', logo: null, website: '' });
  const [editPartner, setEditPartner] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddPartner = () => {
    const newId = partners.length + 1;
    setPartners([...partners, { ...newPartner, id: newId }]);
    setNewPartner({ name: '', logo: null, website: '' });
    setIsAddModalOpen(false);
  };

  const handleEditPartner = () => {
    setPartners(partners.map(partner => (partner.id === editPartner.id ? editPartner : partner)));
    setEditPartner(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (partner) => {
    setEditPartner(partner);
    setIsEditModalOpen(true);
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
                <h5 className="card-title fw-semibold mb-4">Partners Management</h5>
                <div className="d-flex justify-content-start mb-3">
                  <button 
                    className="btn btn-primary btn-sm" 
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
                      {partners.map(partner => (
                        <tr key={partner.id}>
                          <th scope="row" className="ps-0 fw-medium">{partner.id}</th>
                          <td className="fw-medium">{partner.name}</td>
                          <td className="fw-medium"><img src={partner.logo} alt={`Logo of ${partner.name}`} width="50" /></td>
                          <td className="fw-medium"><a href={partner.website}>{partner.website}</a></td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(partner)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => setPartners(partners.filter(p => p.id !== partner.id))} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
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
                      <input type="text" className="form-control" value={newPartner.name} onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="partnerLogo" className="form-label">Logo</label>
                      <input type="file" className="form-control" onChange={(e) => setNewPartner({ ...newPartner, logo: URL.createObjectURL(e.target.files[0]) })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="partnerWebsite" className="form-label">Website</label>
                      <input type="text" className="form-control" value={newPartner.website} onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })} required />
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
                      <input type="text" className="form-control" value={editPartner?.name} onChange={(e) => setEditPartner({ ...editPartner, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editPartnerLogo" className="form-label">Logo</label>
                      <input type="file" className="form-control" onChange={(e) => setEditPartner({ ...editPartner, logo: URL.createObjectURL(e.target.files[0]) })} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editPartnerWebsite" className="form-label">Website</label>
                      <input type="text" className="form-control" value={editPartner?.website} onChange={(e) => setEditPartner({ ...editPartner, website: e.target.value })} required />
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