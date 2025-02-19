import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement'; 
import AddUser from './pages/AddUser'; 
import ServiceManagement from './pages/ServiceManagement'; 
import AddService from './pages/AddService'; 
import ServiceRequests from './pages/ServiceRequests'; 
import ProgramPage from './pages/Program'; 
import AddProgram from './pages/AddProgram';
import ProgramRegistrations from './pages/ProgramRegistrations';
import Categories from './pages/Categories'; 
import Sliders from './pages/Sliders'; 
import Contacts from './pages/Contacts';
import Partners from './pages/Partners';
import FormsManagement from './pages/FormsManagement'; 
import Profile from './pages/Profile'; 
import EditProfile from './pages/EditProfile';
import SuccessStories from './pages/SuccessStories';  
import FAQManagement from './pages/FAQManagement'; 
import Login from './pages/Login'; 
import ProtectedRoute from './ProtectedRoute'; 
import Gallery from './pages/Gallery';
const App = () => {
    const location = useLocation(); 
    
    return (
        <div className="app">
            {location.pathname !== '/login' && <Sidebar />}
            <div className="content">
                <Routes>
                    
                    <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} /> 

                    
                    <Route path="/login" element={<Login />} /> 

                    
                    <Route 
                        path="/user-management" 
                        element={<ProtectedRoute element={<UserManagement />} requiredRole={['admin', 'super_admin']} />} 
                    />
                    <Route 
                        path="/add-user" 
                        element={<ProtectedRoute element={<AddUser />} requiredRole={['admin', 'super_admin']} />} 
                    />

                   
                    <Route 
                        path="/service-management" 
                        element={<ProtectedRoute element={<ServiceManagement />} requiredRole={['admin', 'super_admin']} />} 
                    />
                    <Route 
                        path="/add-service" 
                        element={<ProtectedRoute element={<AddService />} requiredRole={['admin', 'super_admin']} />} 
                    />
                    <Route 
                        path="/service-requests" 
                        element={<ProtectedRoute element={<ServiceRequests />} />} 
                    />

                    
                    <Route 
                        path="/programs" 
                        element={<ProtectedRoute element={<ProgramPage />} />} 
                    />
                    <Route 
                        path="/add-program" 
                        element={<ProtectedRoute element={<AddProgram />} requiredRole={['admin', 'super_admin']} />} 
                    />
                    <Route 
                        path="/program-registrations" 
                        element={<ProtectedRoute element={<ProgramRegistrations />} />} 
                    />

                    
                    <Route 
                        path="/categories" 
                        element={<ProtectedRoute element={<Categories />} requiredRole={['admin', 'super_admin']} />} 
                    />

                    
                    <Route 
                        path="/sliders" 
                        element={<ProtectedRoute element={<Sliders />} requiredRole={['admin', 'super_admin']} />} 
                    />

                    
                    <Route 
                        path="/contacts" 
                        element={<ProtectedRoute element={<Contacts />} />} 
                    />

                    
                    <Route 
                        path="/partners" 
                        element={<ProtectedRoute element={<Partners />} requiredRole={['admin', 'super_admin']} />} 
                    />

                    
                    <Route 
                        path="/forms" 
                        element={<ProtectedRoute element={<FormsManagement />} requiredRole={['admin', 'super_admin']} />} 
                    />

                    
                    <Route 
                        path="/profile" 
                        element={<ProtectedRoute element={<Profile />} />} 
                    />
                    <Route 
                        path="/edit-profile" 
                        element={<ProtectedRoute element={<EditProfile />} />} 
                    />

                    
                    <Route 
                        path="/success-stories" 
                        element={<ProtectedRoute element={<SuccessStories />} requiredRole={['admin', 'super_admin']} />} 
                    />

                    
                    <Route 
                        path="/faq-management" 
                        element={<ProtectedRoute element={<FAQManagement />} requiredRole={['admin', 'super_admin']} />} 
                    />
                                      <Route 
                        path="/gallery"
                        element={<ProtectedRoute element={<Gallery />} requiredRole={['admin', 'super_admin']}/>}
                    />
                </Routes>
            </div>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;