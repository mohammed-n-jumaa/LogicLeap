import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import profileImage from '../assets/images/profile/Userpfp.jpg';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://logicleap-769836b54d38.herokuapp.com/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />
      <div className="body-wrapper">
        <Header />
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Profile</h5>
              <div className="row">
                <div className="col-md-4 text-center">
                  {/* تصحيح نص alt بإزالة كلمة "Picture" */}
                  <img src={profileImage} alt="Profile" className="img-fluid rounded-circle mb-3" /> 
                  <h3>{user.name}</h3>
                  <p className="text-muted">Role: {user.role}</p>
                </div>
                <div className="col-md-8">
                 
                  <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="profileName" value={user.name} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profileEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="profileEmail" value={user.email} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePhone" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="profilePhone" value={user.phone} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profileRole" className="form-label">Role</label>
                    <input type="text" className="form-control" id="profileRole" value={user.role} disabled />
                  </div>
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