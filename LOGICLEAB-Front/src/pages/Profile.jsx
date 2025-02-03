// src/pages/Profile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import profileImage from '../assets/images/profile/mohammed.jpg'; 

const Profile = () => {
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      
      <Sidebar />
      <div className="body-wrapper">
        <Header />
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Profile</h5>
              <div className="row">
                
                <div className="col-md-4 text-center">
                  <img src={profileImage} alt="Profile Picture" className="img-fluid rounded-circle mb-3" /> 
                  <h3>John Doe</h3>
                  <p className="text-muted">Role: Admin</p>
                </div>
                
                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="profileId" className="form-label">User ID</label>
                    <input type="text" className="form-control" id="profileId" value="1" disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="profileName" value="John Doe" disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profileEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="profileEmail" value="johndoe@example.com" disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePhone" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="profilePhone" value="(123) 456-7890" disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profileRole" className="form-label">Role</label>
                    <input type="text" className="form-control" id="profileRole" value="Admin" disabled />
                  </div>
                  <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link> 
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Profile;