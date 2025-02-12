import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // New states for search and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching categories!', error);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory = { name: newCategoryName };
    axios.post('http://localhost:8000/api/categories', newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategoryName('');
        setIsAddModalOpen(false);
        Swal.fire('Success!', 'Category added successfully.', 'success'); // SweetAlert
      })
      .catch(error => {
        console.error('There was an error adding the category!', error);
        setError('Failed to add category. Please try again later.');
      });
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
  };

  const handleUpdateCategory = () => {
    if (!editCategory.name.trim()) return;
    axios.put(`http://localhost:8000/api/categories/${editCategory.id}`, { name: editCategory.name })
      .then(response => {
        setCategories(categories.map(cat => (cat.id === editCategory.id ? { ...cat, name: editCategory.name } : cat)));
        setEditCategory(null);
        Swal.fire('Success!', 'Category updated successfully.', 'success'); // SweetAlert
      })
      .catch(error => {
        console.error('There was an error updating the category!', error);
        setError('Failed to update category. Please try again later.');
      });
  };

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/categories/${id}`)
          .then(response => {
            setCategories(categories.filter(cat => cat.id !== id));
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
          })
          .catch(error => {
            console.error('There was an error deleting the category!', error);
            setError('Failed to delete category. Please try again later.');
          });
      }
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
                <h5 className="card-title fw-semibold mb-4">Categories</h5>

                {error && <div className="alert alert-danger">{error}</div>}

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
                          placeholder="Search categories..."
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
                    Add Category
                  </button>
                </div>

                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table text-nowrap align-middle mb-0">
                        <thead>
                          <tr className="border-2 border-bottom border-primary border-0">
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col" className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCategories.map(category => (
                            <tr key={category.id}>
                              <th scope="row">{category.id}</th>
                              <td>{category.name}</td>
                              <td className="text-center">
                                <i className="fas fa-eye" onClick={() => setViewCategory(category)} style={{ cursor: 'pointer' }}></i>
                                <i className="fas fa-edit" onClick={() => handleEditCategory(category)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                                <i className="fas fa-trash" onClick={() => handleDeleteCategory(category.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="text-muted fs-13">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} entries
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
                  </>
                )}
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