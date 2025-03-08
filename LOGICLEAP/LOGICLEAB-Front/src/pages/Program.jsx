import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProgramDetailsModal from '../components/program/ProgramDetailsModal';
import EditProgramModal from '../components/program/EditProgramModal';
import '../assets/css/styles.min.css';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import LoadingSpinner from '../components/LoadingSpinner'; 

const Program = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [editingProgram, setEditingProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true); 
    try {
      const response = await axios.get('https://logicleap-769836b54d38.herokuapp.com/api/programs');
      const programsWithImagePath = response.data.map((program) => ({
        ...program,
        image: program.image
          ? `https://logicleap-769836b54d38.herokuapp.com/storage/${program.image}`
          : null,
      }));
      setPrograms(programsWithImagePath);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError('Failed to fetch programs.');
    } finally {
      setLoading(false); 
    }
  };

  // Define handler functions using useCallback to prevent unnecessary re-renders
  const handleShowProgram = useCallback((program) => {
    setSelectedProgram(program);
  }, []);

  const handleEditProgram = useCallback((program) => {
    setEditingProgram(program);
  }, []);

  const handleDeleteProgram = useCallback(async (programId) => {
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
        await axios.delete(`https://logicleap-769836b54d38.herokuapp.com/api/programs/${programId}`);
        fetchPrograms();
        Swal.fire('Deleted!', 'Program has been deleted.', 'success');
      } catch (err) {
        setError('Failed to delete program.');
      }
    }
  }, []);

  // Now use these memoized functions in the columns definition
  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => (
          <img
            src={value || '/placeholder.png'}
            alt="Program"
            style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
          />
        ),
      },
      {
        Header: 'Name',
        accessor: 'title',
        Cell: ({ value }) => (
          <div className="fw-medium">
            {value}
          </div>
        ),
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }) => (
          <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleShowProgram(row.original)}
            >
              View
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={() => handleEditProgram(row.original)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteProgram(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [handleShowProgram, handleEditProgram, handleDeleteProgram]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: programs,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const handleSaveEdit = async (updatedProgram) => {
    try {
      const programId = editingProgram.id;
      await axios.post(`https://logicleap-769836b54d38.herokuapp.com/api/programs/${programId}`, updatedProgram, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error('Error updating program:', error.response?.data || error.message);
      setError('Failed to update program.');
    }
  };

  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <Sidebar />
      <div className="body-wrapper">
        <Header />
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              {loading && <LoadingSpinner />}
              {error && <p className="text-danger">{error}</p>}

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/add-program')}
                  >
                    Add New Program
                  </button>
                  <div style={{ width: '300px' }}>
                    <input
                      type="text"
                      className="form-control"
                      value={globalFilter || ''}
                      onChange={e => setGlobalFilter(e.target.value)}
                      placeholder="Search programs..."
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table" {...getTableProps()}>
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="border-bottom">
                              {column.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map(row => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                              <td {...cell.getCellProps()} className="align-middle">
                                {cell.render('Cell')}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {'<<'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {'<'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      {'>'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {'>>'}
                    </button>
                  </div>
                  <span className="d-flex align-items-center gap-1">
                    <div>Page</div>
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </span>
                  <select
                    className="form-select"
                    style={{ width: 'auto' }}
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {selectedProgram && (
            <ProgramDetailsModal
              program={selectedProgram}
              onClose={() => setSelectedProgram(null)}
            />
          )}

          {editingProgram && (
            <EditProgramModal
              program={editingProgram}
              onClose={() => setEditingProgram(null)}
              onSave={handleSaveEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Program;