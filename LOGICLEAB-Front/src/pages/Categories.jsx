import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1' },

  ]);
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCategory = () => {
    const newCategory = { id: categories.length + 1, name: newCategoryName };
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setIsAddModalOpen(false); 
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(cat => (cat.id === editCategory.id ? { ...cat, name: editCategory.name } : cat)));
    setEditCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
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
                <h5 className="card-title fw-semibold mb-4">Categories</h5>
                <div className="d-flex justify-content-start mb-3">
                  <button 
                    className="btn btn-primary" 
                    style={{ borderRadius: '15px', padding: '8px 16px', fontSize: '14px' }} 
                    onClick={() => setIsAddModalOpen(true)} 
                  >
                    Add Category
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">Category ID</th>
                        <th scope="col" className="ps-0">Name</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <th scope="row" className="ps-0 fw-medium">{category.id}</th>
                          <td className="fw-medium">{category.name}</td>
                          <td className="text-center fw-medium">
                            <i className="fas fa-eye" onClick={() => setViewCategory(category)} style={{ cursor: 'pointer' }}></i>
                            <i className="fas fa-edit" onClick={() => handleEditCategory(category)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                            <i className="fas fa-trash" onClick={() => handleDeleteCategory(category.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
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

        {/* Add Modal */}
        {isAddModalOpen && ( 
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Category</h5>
                  <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">Category Name</label>
                      <input type="text" className="form-control" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddCategory}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editCategory && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Category</h5>
                  <button type="button" className="btn-close" onClick={() => setEditCategory(null)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <input type="hidden" value={editCategory.id} />
                    <div className="mb-3">
                      <label htmlFor="editCategoryName" className="form-label">Category Name</label>
                      <input type="text" className="form-control" value={editCategory.name} onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} required />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditCategory(null)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdateCategory}>Update</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewCategory && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Category Details</h5>
                  <button type="button" className="btn-close" onClick={() => setViewCategory(null)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Category ID:</strong> <span>{viewCategory.id}</span></p>
                  <p><strong>Name:</strong> <span>{viewCategory.name}</span></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setViewCategory(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;