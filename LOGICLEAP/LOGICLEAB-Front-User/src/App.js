// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './User/components/ProtectedRoute';

// Pages
import About from './User/pages/about';
import Contact from './User/pages/contact';
import CourseDetails from './User/pages/courseDetails';
import CourseDetails2 from './User/pages/courseDetails2';
import Courses from './User/pages/courses';
import Login from './User/pages/login';
import Question from './User/pages/question';
import ServiceRequest from './User/pages/serviceRequest';
import Services from './User/pages/services';
import DervicesDetails from './User/pages/servicesDetails';
import SuccessStory from './User/pages/successStory';
import Home from './User/pages/home';
import RegistrationCourses from './User/pages/registrationCourses';
import RegistrationServices from './User/pages/registrationServices';
import Courses2 from './User/pages/courses2';
import Register from './User/pages/register';
import Profile from './User/pages/Profile'; // Add this import
import GalleryPage from './User/pages/GalleryPage';
// Components
import Header from './User/components/header';
import Partner from './User/components/partner';
import Footer from './User/components/footer';
import Hero from './User/components/hero';
import CounterCourses from './User/components/counterCourses';

import Features from './User/components/Features';
import NavServices from './User/components/navServices';
import Hero2 from './User/components/hero2';
import Hero3 from './User/components/hero3';
import Partner2 from './User/components/partner2';
import Header2 from './User/components/header2';
 
// Styles
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  };

  return (
    <div>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Navigate to="/home" replace />} />
          <Route path='/home' element={<Home />} />
          <Route
            path='/login'
            element={
              isLoggedIn ?
                <Navigate to="/home" replace /> :
                <Login onLogin={handleLogin} />
            }
          />
          <Route
            path='/register'
            element={
              isLoggedIn ?
                <Navigate to="/home" replace /> :
                <Register />
            }
          />

          {/* Add Profile Route */}
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Protected Page Routes */}
          <Route path='/about' element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path='/contact' element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          <Route path='/courses' element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path='/courses2' element={
            <ProtectedRoute>
              <Courses2 />
            </ProtectedRoute>
          } />
          <Route path='/courseDetails' element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          } />
          <Route
            path='/courseDetails2/:id'
            element={
              <ProtectedRoute>
                <CourseDetails2 />
              </ProtectedRoute>
            }
          />
          <Route path='/services' element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } />
          <Route path='/dervicesDetails' element={
            <ProtectedRoute>
              <DervicesDetails />
            </ProtectedRoute>
          } />
          <Route path='/serviceRequest' element={
            <ProtectedRoute>
              <ServiceRequest />
            </ProtectedRoute>
          } />
          <Route path='/successStory' element={
            <ProtectedRoute>
              <SuccessStory />
            </ProtectedRoute>
          } />
          <Route path='/question' element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          } />
          <Route path='/registrationCourses' element={
            <ProtectedRoute>
              <RegistrationCourses />
            </ProtectedRoute>
          } />
          <Route path='/registrationServices' element={
            <ProtectedRoute>
              <RegistrationServices />
            </ProtectedRoute>
          } />

          {/* Protected Component Routes */}
          <Route path='/hero' element={
            <ProtectedRoute>
              <Hero />
            </ProtectedRoute>
          } />
          <Route path='/hero2' element={
            <ProtectedRoute>
              <Hero2 />
            </ProtectedRoute>
          } />
          <Route path='/hero3' element={
            <ProtectedRoute>
              <Hero3 />
            </ProtectedRoute>
          } />
          <Route path='/partner' element={
            <ProtectedRoute>
              <Partner />
            </ProtectedRoute>
          } />
          <Route path='/partner2' element={
            <ProtectedRoute>
              <Partner2 />
            </ProtectedRoute>
          } />
          <Route path='/header2' element={
            <ProtectedRoute>
              <Header2 />
            </ProtectedRoute>
          } />
          <Route path='/features' element={
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          } />
          <Route path='/counterCourses' element={
            <ProtectedRoute>
              <CounterCourses />
            </ProtectedRoute>
          } />
       
          <Route path='/navServices' element={
            <ProtectedRoute>
              <NavServices />
            </ProtectedRoute>
          } />
           <Route path='/GalleryPage' element={
            <ProtectedRoute>
              <GalleryPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;