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
import Profile from './User/pages/Profile';
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
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses2' element={<Courses2 />} />
          <Route path='/courseDetails' element={<CourseDetails />} />
          <Route path='/courseDetails2/:id' element={<CourseDetails2 />} />
          <Route path='/services' element={<Services />} />
          <Route path='/dervicesDetails' element={<DervicesDetails />} />
          <Route path='/serviceRequest' element={<ServiceRequest />} />
          <Route path='/successStory' element={<SuccessStory />} />
          <Route path='/question' element={<Question />} />
          <Route path='/GalleryPage' element={<GalleryPage />} />
          <Route path='/registrationServices' element={<RegistrationServices />} />
          
          {/* Component Routes also made public */}
          <Route path='/hero' element={<Hero />} />
          <Route path='/hero2' element={<Hero2 />} />
          <Route path='/hero3' element={<Hero3 />} />
          <Route path='/partner' element={<Partner />} />
          <Route path='/partner2' element={<Partner2 />} />
          <Route path='/header2' element={<Header2 />} />
          <Route path='/features' element={<Features />} />
          <Route path='/counterCourses' element={<CounterCourses />} />
          <Route path='/navServices' element={<NavServices />} />
          
          {/* Authentication Routes */}
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

          {/* Protected Routes - Only these require login */}
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/registrationCourses' element={
            <ProtectedRoute>
              <RegistrationCourses />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;