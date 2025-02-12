import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header';
import '../assets/css/styles.min.css';

const FormsManagement = () => {
  const [forms, setForms] = useState([
    { id: 1, title: 'Form 1', categoryId: 101, description: 'Description for Form 1', questions: '{"question1": "What is your name?"}', responses: '{"response1": "John Doe"}', status: 'Active' },
    { id: 2, title: 'Form 2', categoryId: 102, description: 'Description for Form 2', questions: '{"question2": "How old are you?"}', responses: '{"response2": "25"}', status: 'Inactive' },
  ]);

  const [newForm, setNewForm] = useState({ title: '', categoryId: '', description: '', questions: '', responses: '', status: 'active' });
  const [editForm, setEditForm] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddForm = () => {
    const newId = forms.length + 1;
    setForms([...forms, { ...newForm, id: newId }]);
    setNewForm({ title: '', categoryId: '', description: '', questions: '', responses: '', status: 'active' });
    setIsAddModalOpen(false);
  };

  const handleEditForm = () => {
    setForms(forms.map(form => (form.id === editForm.id ? editForm : form)));
    setEditForm(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (form) => {
    setEditForm(form);
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
                <h5 className="card-title fw-semibold mb-4">Forms Management</h5>
                <div className="d-flex justify-content-start mb-3">
                  <button 
                    className="btn btn-primary btn-sm" 
                    style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }} 
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    Add Form
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Title</th>
                        <th scope="col" className="ps-0">Category ID</th>
                        <th scope="col" className="ps-0">Description</th>
                        <th scope="col" className="ps-0">Questions</th>
                        <th scope="col" className="ps-0">Responses</th>
                        <th scope="col" className="ps-0">Status</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {forms.map(form => (
                        <tr key={form.id}>
                          <th scope="row" className="ps-0 fw-medium">{form.id}</th>
                          <td className="fw-medium">{form.title}</td>
                          <td className="fw-medium">{form.categoryId}</td>
                          <td className="fw-medium">{form.description}</td>
                          <td className="fw-medium">{form.questions}</td>
                          <td className="fw-medium">{form.responses}</td>
                          <td className="fw-medium">
                            {form.status === 'Active' ? (
                              <span className="badge bg-success text-white">Active</span>
                            ) : (
                              <span className="badge bg-danger text-white">Inactive</span>
                            )}
                          </td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-edit" onClick={() => openEditModal(form)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => setForms(forms.filter(f => f.id !== form.id))} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
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

        {/* Add Form Modal */}
        {isAddModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Form</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="formTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" value={newForm.title} onChange={(e) => setNewForm({ ...newForm, title: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formCategoryId" className="form-label">Category ID</label>
                      <input type="number" className="form-control" value={newForm.categoryId} onChange={(e) => setNewForm({ ...newForm, categoryId: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formDescription" className="form-label">Description</label>
                      <textarea className="form-control" value={newForm.description} onChange={(e) => setNewForm({ ...newForm, description: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formQuestions" className="form-label">Questions (JSON)</label>
                      <textarea className="form-control" value={newForm.questions} onChange={(e) => setNewForm({ ...newForm, questions: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formResponses" className="form-label">Responses (JSON)</label>
                      <textarea className="form-control" value={newForm.responses} onChange={(e) => setNewForm({ ...newForm, responses: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formStatus" className="form-label">Status</label>
                      <select className="form-select" value={newForm.status} onChange={(e) => setNewForm({ ...newForm, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddForm}>Save Form</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form Modal */}
        {isEditModalOpen && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Form</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={editForm?.id} />
                    <div className="mb-3">
                      <label htmlFor="editFormTitle" className="form-label">Title</label>
                      <input type="text" className="form-control" value={editForm?.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFormCategoryId" className="form-label">Category ID</label>
                      <input type="number" className="form-control" value={editForm?.categoryId} onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFormDescription" className="form-label">Description</label>
                      <textarea className="form-control" value={editForm?.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFormQuestions" className="form-label">Questions (JSON)</label>
                      <textarea className="form-control" value={editForm?.questions} onChange={(e) => setEditForm({ ...editForm, questions: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFormResponses" className="form-label">Responses (JSON)</label>
                      <textarea className="form-control" value={editForm?.responses} onChange={(e) => setEditForm({ ...editForm, responses: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFormStatus" className="form-label">Status</label>
                      <select className="form-select" value={editForm?.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleEditForm}>Update Form</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsManagement;