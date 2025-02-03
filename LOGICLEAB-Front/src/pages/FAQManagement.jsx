import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'What is your return policy?', answer: 'You can return any item within 30 days.', status: 'active' },
    { id: 2, question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide.', status: 'inactive' },
  ]);

  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', status: 'active' });
  const [editFAQ, setEditFAQ] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddFAQ = () => {
    const newId = faqs.length + 1;
    setFaqs([...faqs, { ...newFAQ, id: newId }]);
    setNewFAQ({ question: '', answer: '', status: 'active' });
    setIsAddModalOpen(false);
  };

  const handleEditFAQ = () => {
    setFaqs(faqs.map(faq => (faq.id === editFAQ.id ? editFAQ : faq)));
    setEditFAQ(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (faq) => {
    setEditFAQ(faq);
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
                <h5 className="card-title fw-semibold mb-4">FAQ Management</h5>
                <div className="d-flex justify-content-start mb-3">
                  <button 
                    className="btn btn-primary btn-sm" 
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
                      {faqs.map(faq => (
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
                            <i className="fas fa-trash" onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
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