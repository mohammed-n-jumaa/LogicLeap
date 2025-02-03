import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ProgramCard from '../components/program/ProgramCard';
import ProgramDetailsModal from '../components/program/ProgramDetailsModal';
import EditProgramModal from '../components/program/EditProgramModal';
import '../assets/css/styles.min.css';
import HTML5Logo from '../assets/images/backgrounds/HTML5.png';
import CSSLogo from '../assets/images/backgrounds/CSS-Logo.png';
import JSLogo from '../assets/images/backgrounds/JavaScript-Logo.png';
import Header from '../components/Header'; 

const Program = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [editingProgram, setEditingProgram] = useState(null);

  const programs = [
    {
      id: 1,
      title: "Web Development Program",
      description: "Master modern web development fundamentals with practical examples.",
      duration: 30,
      cost: 100,
      price: "free",
      status: "active",
      image: HTML5Logo,
      categoryId: 1,
      startDate: "2023-01-01",
      mode: "online",
      zoomLink: "http://example.com/zoom-link"
    },
    {
      id: 2,
      title: "CSS Mastery Program",
      description: "Deep dive into CSS and create stunning web designs.",
      duration: 25,
      cost: 80,
      price: "paid",
      status: "active",
      image: CSSLogo,
      categoryId: 2,
      startDate: "2023-02-01",
      mode: "online",
      zoomLink: "http://example.com/css-zoom-link"
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      description: "Learn JavaScript from scratch and build interactive websites.",
      duration: 40,
      cost: 120,
      price: "free",
      status: "active",
      image: JSLogo,
      categoryId: 3,
      startDate: "2023-03-01",
      mode: "online",
      zoomLink: "http://example.com/js-zoom-link"
    }
  ];

  const handleShowProgram = (program) => {
    setSelectedProgram(program);
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
  };

  const handleDeleteProgram = (programId) => {
    console.log('Delete program:', programId);
  };

  const handleSaveEdit = (updatedProgram) => {
    console.log('Save program:', updatedProgram);
    setEditingProgram(null);
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <div className="body-wrapper">
        <Header /> 

        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <button className="btn btn-primary" onClick={() => navigate('/add-program')}>
                    Add New Program
                  </button>
                </div>
                <h5 className="card-title fw-semibold" style={{ flex: 1, textAlign: 'center' }}>Programs</h5>
              </div>

              <div className="row">
                {programs.map(program => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    onShow={handleShowProgram}
                    onEdit={handleEditProgram}
                    onDelete={handleDeleteProgram}
                  />
                ))}
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