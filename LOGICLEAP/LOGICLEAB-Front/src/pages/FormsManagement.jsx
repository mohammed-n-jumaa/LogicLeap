import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const FormManagement = () => {
    const [forms, setForms] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [newForm, setNewForm] = useState({
        title: '',
        description: '', // Added description field
        program_id: '',
        fields: [],
        status: 'active'
    });
    const [editForm, setEditForm] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Forms and Programs when component loads
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [formsResponse, programsResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/forms'),
                    axios.get('http://localhost:8000/api/programs')
                ]);
                setForms(formsResponse.data);
                setPrograms(programsResponse.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddField = () => {
        const newField = {
            name: '',
            label: '',
            type: 'text',
            required: false,
            question: ''
        };
        setNewForm({
            ...newForm,
            fields: [...newForm.fields, newField]
        });
    };

    const handleFieldChange = (index, field) => {
        const updatedFields = [...newForm.fields];
        updatedFields[index] = field;
        setNewForm({
            ...newForm,
            fields: updatedFields
        });
    };

    const handleRemoveField = (index) => {
        const updatedFields = newForm.fields.filter((_, i) => i !== index);
        setNewForm({
            ...newForm,
            fields: updatedFields
        });
    };

    const handleAddForm = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/forms', newForm);
            const newFormWithProgram = {
                ...response.data,
                program: programs.find(p => p.id === response.data.program_id)
            };
            setForms([...forms, newFormWithProgram]);
            setNewForm({ title: '', description: '', program_id: '', fields: [], status: 'active' });
            setIsAddModalOpen(false);
            Swal.fire('Success!', 'Form added successfully.', 'success');
        } catch (error) {
            console.error('Error adding form:', error);
            Swal.fire('Error!', 'Failed to add form.', 'error');
        }
    };

    const handleEditForm = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/forms/${editForm.id}`, editForm);
            setForms(forms.map(form => (form.id === editForm.id ? response.data : form)));
            setEditForm(null);
            setIsEditModalOpen(false);
            Swal.fire('Success!', 'Form updated successfully.', 'success');
        } catch (error) {
            console.error('Error updating form:', error);
            Swal.fire('Error!', 'Failed to update form.', 'error');
        }
    };

    const handleDeleteForm = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will soft delete the form.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/forms/${id}`);
                setForms(forms.filter(form => form.id !== id));
                Swal.fire('Deleted!', 'Form has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting form:', error);
                Swal.fire('Error!', 'Failed to delete form.', 'error');
            }
        }
    };

    // Filter and Pagination logic
    const filteredForms = forms.filter(form =>
        form.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentForms = filteredForms.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />

            <div className="body-wrapper">
                <Header />

                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-4">Form Management</h5>

                            {loading && <LoadingSpinner />}
                            {error && <p className="text-danger">{error}</p>}

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="search-box">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search forms..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <select
                                        className="form-select"
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsAddModalOpen(true)}
                                >
                                    Add Form
                                </button>
                            </div>

                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th> {/* Added description column */}
                                            <th>Program</th>
                                            <th>Fields Count</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentForms.map(form => (
                                            <tr key={form.id}>
                                                <td>{form.id}</td>
                                                <td>{form.title}</td>
                                                <td>{form.description}</td> {/* Added description field */}
                                                <td>{form.program?.title}</td>
                                                <td>{form.fields.length}</td>
                                                <td>
                                                    <span className={`badge ${form.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                        {form.status}
                                                    </span>
                                                </td>
                                                <td className="text-center fw-medium">
                                                    <i
                                                        className="fas fa-edit"
                                                        onClick={() => {
                                                            setEditForm(form);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                        style={{ cursor: 'pointer', color: '#5a5a5a', marginRight: '10px' }}>
                                                    </i>
                                                    <i
                                                        className="fas fa-trash"
                                                        onClick={() => handleDeleteForm(form.id)}
                                                        style={{ cursor: 'pointer', color: '#5a5a5a' }}>
                                                    </i>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredForms.length)} of {filteredForms.length} entries
                                </div>
                                <nav>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>
                                                Previous
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Form Modal */}
                {isAddModalOpen && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Form</h5>
                                    <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newForm.title}
                                                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                value={newForm.description}
                                                onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Program</label>
                                            <select
                                                className="form-select"
                                                value={newForm.program_id}
                                                onChange={(e) => setNewForm({ ...newForm, program_id: e.target.value })}
                                            >
                                                <option value="">Select Program</option>
                                                {programs.map(program => (
                                                    <option key={program.id} value={program.id}>
                                                        {program.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                value={newForm.status}
                                                onChange={(e) => setNewForm({ ...newForm, status: e.target.value })}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Fields</label>
                                            <button type="button" className="btn btn-sm btn-secondary ms-2" onClick={handleAddField}>
                                                Add Field
                                            </button>

                                            {newForm.fields.map((field, index) => (
                                                <div key={index} className="card mt-2">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Question</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter question"
                                                                        value={field.question || ''}
                                                                        onChange={(e) => handleFieldChange(index, { ...field, question: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Field Name"
                                                                    value={field.name}
                                                                    onChange={(e) => handleFieldChange(index, { ...field, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Label"
                                                                    value={field.label}
                                                                    onChange={(e) => handleFieldChange(index, { ...field, label: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <select
                                                                    className="form-select"
                                                                    value={field.type}
                                                                    onChange={(e) => handleFieldChange(index, { ...field, type: e.target.value })}
                                                                >
                                                                    <option value="text">Text</option>
                                                                    <option value="number">Number</option>
                                                                    <option value="email">Email</option>
                                                                    <option value="textarea">Textarea</option>
                                                                    <option value="select">Select</option>
                                                                    <option value="checkbox">Checkbox</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={field.required}
                                                                        onChange={(e) => handleFieldChange(index, { ...field, required: e.target.checked })}
                                                                    />
                                                                    <label className="form-check-label">Required</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => handleRemoveField(index)}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleAddForm}>
                                        Save Form
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Form Modal */}
                {isEditModalOpen && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Form</h5>
                                    <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editForm.title}
                                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                value={editForm.description}
                                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Program</label>
                                            <select
                                                className="form-select"
                                                value={editForm.program_id}
                                                onChange={(e) => setEditForm({ ...editForm, program_id: e.target.value })}
                                            >
                                                <option value="">Select Program</option>
                                                {programs.map(program => (
                                                    <option key={program.id} value={program.id}>
                                                        {program.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                value={editForm.status}
                                                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Fields</label>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-secondary ms-2"
                                                onClick={() => setEditForm({
                                                    ...editForm,
                                                    fields: [...editForm.fields, { name: '', label: '', type: 'text', required: false }]
                                                })}
                                            >
                                                Add Field
                                            </button>

                                            {editForm.fields.map((field, index) => (
                                                <div key={index} className="card mt-2">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Question</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter question"
                                                                        value={field.question || ''}
                                                                        onChange={(e) => {
                                                                            const updatedFields = [...editForm.fields];
                                                                            updatedFields[index] = { ...field, question: e.target.value };
                                                                            setEditForm({ ...editForm, fields: updatedFields });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Field Name"
                                                                    value={field.name}
                                                                    onChange={(e) => {
                                                                        const updatedFields = [...editForm.fields];
                                                                        updatedFields[index] = { ...field, name: e.target.value };
                                                                        setEditForm({ ...editForm, fields: updatedFields });
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Label"
                                                                    value={field.label}
                                                                    onChange={(e) => {
                                                                        const updatedFields = [...editForm.fields];
                                                                        updatedFields[index] = { ...field, label: e.target.value };
                                                                        setEditForm({ ...editForm, fields: updatedFields });
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <select
                                                                    className="form-select"
                                                                    value={field.type}
                                                                    onChange={(e) => {
                                                                        const updatedFields = [...editForm.fields];
                                                                        updatedFields[index] = { ...field, type: e.target.value };
                                                                        setEditForm({ ...editForm, fields: updatedFields });
                                                                    }}
                                                                >
                                                                    <option value="text">Text</option>
                                                                    <option value="number">Number</option>
                                                                    <option value="email">Email</option>
                                                                    <option value="textarea">Textarea</option>
                                                                    <option value="select">Select</option>
                                                                    <option value="checkbox">Checkbox</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={field.required}
                                                                        onChange={(e) => {
                                                                            const updatedFields = [...editForm.fields];
                                                                            updatedFields[index] = { ...field, required: e.target.checked };
                                                                            setEditForm({ ...editForm, fields: updatedFields });
                                                                        }}
                                                                    />
                                                                    <label className="form-check-label">Required</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => {
                                                                        const updatedFields = editForm.fields.filter((_, i) => i !== index);
                                                                        setEditForm({ ...editForm, fields: updatedFields });
                                                                    }}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleEditForm}>
                                        Update Form
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormManagement;