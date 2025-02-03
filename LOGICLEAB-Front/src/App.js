// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
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
import SuccessStories from './pages/SuccessStories';  // استيراد صفحة Success Stories
import FAQManagement from './pages/FAQManagement';  // استيراد صفحة FAQ Management

const App = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/user-management" element={<UserManagement />} />
                        <Route path="/add-user" element={<AddUser />} />
                        <Route path="/service-management" element={<ServiceManagement />} /> 
                        <Route path="/add-service" element={<AddService />} />
                        <Route path="/service-requests" element={<ServiceRequests />} />
                        <Route path="/programs" element={<ProgramPage />} /> 
                        <Route path="/add-program" element={<AddProgram />} /> 
                        <Route path="/program-registrations" element={<ProgramRegistrations />} /> 
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/sliders" element={<Sliders />} /> 
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/partners" element={<Partners />} /> 
                        <Route path="/forms" element={<FormsManagement />} /> 
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/edit-profile" element={<EditProfile />} /> 
                        <Route path="/success-stories" element={<SuccessStories />} /> 
                        <Route path="/faq-management" element={<FAQManagement />} /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;