// src/pages/EditProfile.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import profileImage from '../assets/images/profile/mohammed.jpg';

const EditProfile = () => {
  const [userId] = useState("1");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("(123) 456-7890");
  const [role] = useState("Admin"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ userId, name, email, phone, role });
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      
      <Sidebar />
      <div className="body-wrapper">
        <Header />
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Edit Profile</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4 text-center">
                    <img src={profileImage} alt="Profile Picture" className="img-fluid rounded-circle mb-3" /> 
                    <h3>{name}</h3>
                    <p className="text-muted">Role: {role}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label htmlFor="profileId" className="form-label">User ID</label>
                      <input type="text" className="form-control" id="profileId" value={userId} disabled />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profileName" className="form-label">Name</label>
                      <input type="text" className="form-control" id="profileName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profileEmail" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="profileEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profilePhone" className="form-label">Phone Number</label>
                      <input type="text" className="form-control" id="profilePhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profileRole" className="form-label">Role</label>
                      <input type="text" className="form-control" id="profileRole" value={role} disabled />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <Link to="/profile" className="btn btn-secondary ms-2">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default EditProfile;