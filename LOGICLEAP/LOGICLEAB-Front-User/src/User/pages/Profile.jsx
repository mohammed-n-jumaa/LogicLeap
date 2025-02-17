import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmedPrograms, setConfirmedPrograms] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:8000/api/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();
      setUser(data);
      setLoading(false);

      // Fetch confirmed programs
      fetchConfirmedPrograms(data.id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchConfirmedPrograms = async (userId) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:8000/api/user/${userId}/confirmed-programs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch confirmed programs');

      const data = await response.json();
      setConfirmedPrograms(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
       <Header/>
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <h1 className="profile-name">{user?.name}</h1>
        <p className="profile-role">{user?.role}</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="card-header">
            <h2>Personal Information</h2>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <i className="bi bi-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="bi bi-telephone"></i>
              <div>
                <h3>Phone Number</h3>
                <p>{user?.phone}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="bi bi-calendar"></i>
              <div>
                <h3>Join Date</h3>
                <p>{new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="bi bi-shield-check"></i>
              <div>
                <h3>Role</h3>
                <p>{user?.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <h2>Confirmed Programs</h2>
          </div>
          <div className="programs-grid">
            {confirmedPrograms.map((program) => (
              <div className="program-card" key={program.id}>
                <div className="program-header">
                  <h3>{program.name}</h3>
                </div>
                <div className="program-content">
                  <p className="program-description">{program.description}</p>
                  <div className="program-details">
                    <div className="detail-item">
                      <i className="bi bi-calendar-event"></i>
                      <div>
                        <span>Start Date</span>
                        <p>{new Date(program.start_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-calendar-check"></i>
                      <div>
                        <span>End Date</span>
                        <p>{new Date(program.end_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-currency-dollar"></i>
                      <div>
                        <span>Cost</span>
                        <p>JD {program.cost}</p>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={program.zoom_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="join-button"
                  >
                    <i className="bi bi-camera-video"></i>
                    Join Session Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .profile-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            direction: ltr;
          }

          .profile-header {
            position: relative;
            text-align: center;
            margin-bottom: 40px;
          }

          .profile-cover {
            height: 200px;
            background: linear-gradient(135deg, #a3d08c 0%, #84b76e 100%);
            border-radius: 15px;
            margin-bottom: 60px;
          }

          .profile-avatar {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 120px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .profile-avatar i {
            font-size: 64px;
            color: #a3d08c;
          }

          .profile-name {
            font-size: 2rem;
            color: #333;
            margin: 45px 0 5px;
          }

          .profile-role {
            color: #666;
            font-size: 1.1rem;
            text-transform: capitalize;
          }

          .profile-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 30px;
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .card-header h2 {
            color: #333;
            font-size: 1.5rem;
            margin: 0;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
          }

          .info-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
          }

          .info-item i {
            font-size: 24px;
            color: #a3d08c;
          }

          .info-item h3 {
            color: #666;
            font-size: 0.9rem;
            margin: 0 0 5px;
          }

          .info-item p {
            color: #333;
            font-size: 1.1rem;
            margin: 0;
          }

          .programs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
          }

          .program-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid #eee;
          }

          .program-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }

          .program-header {
            background: linear-gradient(135deg, #a3d08c 0%, #84b76e 100%);
            padding: 15px 20px;
          }

          .program-header h3 {
            color: white;
            margin: 0;
            font-size: 1.2rem;
          }

          .program-content {
            padding: 20px;
          }

          .program-description {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.5;
          }

          .program-details {
            display: grid;
            gap: 15px;
            margin-bottom: 20px;
          }

          .detail-item {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .detail-item i {
            font-size: 20px;
            color: #a3d08c;
          }

          .detail-item span {
            color: #666;
            font-size: 0.9rem;
            display: block;
            margin-bottom: 2px;
          }

          .detail-item p {
            color: #333;
            margin: 0;
            font-weight: 500;
          }

          .join-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #a3d08c;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 8px;
            transition: background-color 0.3s ease;
            font-weight: 500;
            margin-top: 15px;
          }

          .join-button:hover {
            background: #8fb77a;
          }

          .join-button i {
            font-size: 18px;
          }

          .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 200px;
            font-size: 1.2rem;
            color: #666;
          }

          .error-message {
            color: #df1529;
            text-align: center;
            padding: 20px;
            font-size: 1.1rem;
          }

          @media (max-width: 768px) {
            .profile-card {
              padding: 20px;
            }
            
            .programs-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      <Footer/>

    </div>
  );
}

export default Profile;