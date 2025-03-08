import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/css/styles.min.css';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const StatisticsManagement = () => {
    const [statistics, setStatistics] = useState([]);
    const [newStatistic, setNewStatistic] = useState({ title: '', value: '', icon: 'fas fa-users', color: 'bg-light-danger', status: 'active' });
    const [editStatistic, setEditStatistic] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // States for search, pagination, and loading
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Available icon options
    const iconOptions = [
        { value: 'fas fa-users', label: 'Users' },
        { value: 'fas fa-briefcase', label: 'Employees' },
        { value: 'fas fa-graduation-cap', label: 'Courses' },
        { value: 'fas fa-user-graduate', label: 'Students' },
        { value: 'fas fa-book', label: 'Books' },
        { value: 'fas fa-chalkboard-teacher', label: 'Teachers' },
    ];

    // Available color options with text color mapping
    const colorOptions = [
        { value: 'bg-light-danger', label: 'Red', textColor: 'text-danger' },
        { value: 'bg-light-success', label: 'Green', textColor: 'text-success' },
        { value: 'bg-light-warning', label: 'Yellow', textColor: 'text-warning' },
        { value: 'bg-light-info', label: 'Blue', textColor: 'text-info' },
        { value: 'bg-light-primary', label: 'Purple', textColor: 'text-primary' },
    ];

    // Helper function to get text color based on background color
    const getTextColorClass = (bgColorClass) => {
        const colorOption = colorOptions.find(option => option.value === bgColorClass);
        return colorOption ? colorOption.textColor : 'text-danger';
    };

    // Fetch statistics when the component loads
    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/statistics', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data) {
                    setStatistics(Array.isArray(response.data) ? response.data : []);
                }
            } catch (error) {
                console.error('Fetch error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                setError('Failed to load statistics. Please try again later.');
                setStatistics([]);
            } finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, []);

    const handleAddStatistic = async () => {
        try {
            const response = await axios.post('https://logicleap-769836b54d38.herokuapp.com/api/statistics', newStatistic);
            setStatistics([...statistics, response.data]);
            setNewStatistic({ title: '', value: '', icon: 'fas fa-users', color: 'bg-light-danger', status: 'active' });
            setIsAddModalOpen(false);
            Swal.fire('Success!', 'Statistic added successfully.', 'success');
        } catch (error) {
            console.error('Error adding statistic:', error.response ? error.response.data : error.message);
            Swal.fire('Error!', 'Failed to add statistic. Please check the console for more details.', 'error');
        }
    };

    const handleEditStatistic = async () => {
        try {
            const response = await axios.put(`https://logicleap-769836b54d38.herokuapp.com/api/statistics/${editStatistic.id}`, editStatistic);
            setStatistics(statistics.map(stat => (stat.id === editStatistic.id ? response.data : stat)));
            setEditStatistic(null);
            setIsEditModalOpen(false);
            Swal.fire('Success!', 'Statistic updated successfully.', 'success');
        } catch (error) {
            console.error('Error updating statistic:', error.response ? error.response.data : error.message);
            Swal.fire('Error!', 'Failed to update statistic. Please check the console for more details.', 'error');
        }
    };

    const handleDeleteStatistic = async (id) => {
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
                await axios.delete(`https://logicleap-769836b54d38.herokuapp.com/api/statistics/${id}`);
                setStatistics(statistics.filter(stat => stat.id !== id));
                Swal.fire('Deleted!', 'Your statistic has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting statistic:', error.response ? error.response.data : error.message);
                Swal.fire('Error!', 'Failed to delete statistic. Please check the console for more details.', 'error');
            }
        }
    };

    const openEditModal = (statistic) => {
        setEditStatistic(statistic);
        setIsEditModalOpen(true);
    };

    // Filter statistics based on search
    const filteredStatistics = statistics.filter(stat =>
        stat.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stat.value?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStatistics = filteredStatistics.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStatistics.length / itemsPerPage);

    // Preview feature for add/edit modal
    const StatisticPreview = ({ data }) => {
        const textColorClass = getTextColorClass(data.color);
        
        return (
            <div className={`card ${data.color} text-center p-2`} style={{ width: '150px', borderRadius: '10px' }}>
                <div className="d-flex justify-content-center">
                    <div className="bg-white rounded-circle p-3 mb-2" style={{ width: '60px', height: '60px' }}>
                        <i className={`${data.icon} ${textColorClass}`}></i>
                    </div>
                </div>
                <h3 className="fs-4 fw-semibold">{data.value || '0K+'}</h3>
                <p className="mb-0">{data.title || 'Title'}</p>
            </div>
        );
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
                                <h5 className="card-title fw-semibold mb-4">Statistics Management</h5>

                                {loading && <LoadingSpinner />}
                                {error && <p className="text-danger">{error}</p>}

                                {/* Display Statistics Cards Preview */}
                                <div className="row mb-4">
                                    {statistics.filter(stat => stat.status === 'active').slice(0, 4).map(stat => {
                                        const textColorClass = getTextColorClass(stat.color);
                                        
                                        return (
                                            <div key={stat.id} className="col-md-3 col-sm-6 mb-3">
                                                <div className={`card ${stat.color} text-center p-2`} style={{ borderRadius: '10px' }}>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="bg-white rounded-circle p-3 mb-2" style={{ width: '60px', height: '60px' }}>
                                                            <i className={`${stat.icon} ${textColorClass}`}></i>
                                                        </div>
                                                    </div>
                                                    <h3 className="fs-4 fw-semibold">{stat.value}</h3>
                                                    <p className="mb-0">{stat.title}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

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
                                                    placeholder="Search statistics..."
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
                                        Add Statistic
                                    </button>
                                </div>

                                <div className="table-responsive">
                                    <table className="table text-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="border-2 border-bottom border-primary border-0">
                                                <th scope="col" className="ps-0">ID</th>
                                                <th scope="col" className="ps-0">Title</th>
                                                <th scope="col" className="ps-0">Value</th>
                                                <th scope="col" className="ps-0">Icon</th>
                                                <th scope="col" className="ps-0">Color</th>
                                                <th scope="col" className="ps-0">Status</th>
                                                <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {currentStatistics.map(stat => {
                                                const textColorClass = getTextColorClass(stat.color);
                                                
                                                return (
                                                    <tr key={stat.id}>
                                                        <th scope="row" className="ps-0 fw-medium">{stat.id}</th>
                                                        <td className="fw-medium">{stat.title}</td>
                                                        <td className="fw-medium">{stat.value}</td>
                                                        <td className="fw-medium">
                                                            <i className={`${stat.icon} ${textColorClass}`}></i> <small className="text-muted">{stat.icon}</small>
                                                        </td>
                                                        <td className="fw-medium">
                                                            <div className="d-flex align-items-center">
                                                                <span
                                                                    className={`${stat.color}`}
                                                                    style={{
                                                                        width: '30px',
                                                                        height: '30px',
                                                                        borderRadius: '6px',
                                                                        display: 'inline-block',
                                                                        marginRight: '8px'
                                                                    }}
                                                                ></span>
                                                                <span className="text-muted small">
                                                                    {stat.color.replace('bg-light-', '')}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="fw-medium">
                                                            {stat.status === 'active' ? (
                                                                <span className="badge bg-success text-white">Active</span>
                                                            ) : (
                                                                <span className="badge bg-danger text-white">Inactive</span>
                                                            )}
                                                        </td>
                                                        <td className="text-center fw-medium">
                                                            <i className="fas fa-edit" onClick={() => openEditModal(stat)} style={{ cursor: 'pointer' }}></i>
                                                            <i className="fas fa-trash" onClick={() => handleDeleteStatistic(stat.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}></i>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="text-muted fs-13">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStatistics.length)} of {filteredStatistics.length} entries
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

                {/* Add Statistic Modal */}
                {isAddModalOpen && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Statistic</h5>
                                    <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-4">
                                        <div className="col-12 d-flex justify-content-center">
                                            <StatisticPreview data={newStatistic} />
                                        </div>
                                    </div>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="statTitle" className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="statTitle"
                                                value={newStatistic.title}
                                                onChange={(e) => setNewStatistic({ ...newStatistic, title: e.target.value })}
                                                required
                                            />
                                            <small className="text-muted">E.g., Users, Students, Courses</small>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="statValue" className="form-label">Value</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="statValue"
                                                value={newStatistic.value}
                                                onChange={(e) => setNewStatistic({ ...newStatistic, value: e.target.value })}
                                                required
                                            />
                                            <small className="text-muted">E.g., 10K+, 80+, 6K+</small>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="statIcon" className="form-label">Icon</label>
                                            <select
                                                className="form-select"
                                                id="statIcon"
                                                value={newStatistic.icon}
                                                onChange={(e) => setNewStatistic({ ...newStatistic, icon: e.target.value })}
                                                required
                                            >
                                                {iconOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label} ({option.value})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="statColor" className="form-label">Color</label>
                                            <select
                                                className="form-select"
                                                id="statColor"
                                                value={newStatistic.color}
                                                onChange={(e) => setNewStatistic({ ...newStatistic, color: e.target.value })}
                                                required
                                            >
                                                {colorOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="statStatus" className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                id="statStatus"
                                                value={newStatistic.status}
                                                onChange={(e) => setNewStatistic({ ...newStatistic, status: e.target.value })}
                                                required
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleAddStatistic}>Save Statistic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Statistic Modal */}
                {isEditModalOpen && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Statistic</h5>
                                    <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-4">
                                        <div className="col-12 d-flex justify-content-center">
                                            <StatisticPreview data={editStatistic} />
                                        </div>
                                    </div>
                                    <form>
                                        <input type="hidden" value={editStatistic?.id} />
                                        <div className="mb-3">
                                            <label htmlFor="editStatTitle" className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editStatTitle"
                                                value={editStatistic?.title}
                                                onChange={(e) => setEditStatistic({ ...editStatistic, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editStatValue" className="form-label">Value</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editStatValue"
                                                value={editStatistic?.value}
                                                onChange={(e) => setEditStatistic({ ...editStatistic, value: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editStatIcon" className="form-label">Icon</label>
                                            <select
                                                className="form-select"
                                                id="editStatIcon"
                                                value={editStatistic?.icon}
                                                onChange={(e) => setEditStatistic({ ...editStatistic, icon: e.target.value })}
                                                required
                                            >
                                                {iconOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label} ({option.value})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editStatColor" className="form-label">Color</label>
                                            <select
                                                className="form-select"
                                                id="editStatColor"
                                                value={editStatistic?.color}
                                                onChange={(e) => setEditStatistic({ ...editStatistic, color: e.target.value })}
                                                required
                                            >
                                                {colorOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editStatStatus" className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                id="editStatStatus"
                                                value={editStatistic?.status}
                                                onChange={(e) => setEditStatistic({ ...editStatistic, status: e.target.value })}
                                                required
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleEditStatistic}>Update Statistic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatisticsManagement;