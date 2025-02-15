// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Header from './User/components/header';
import Home from './User/pages/home';
import Partner from './User/components/partner';
import Footer from './User/components/footer';
import Hero from './User/components/hero';
import CounterCourses from './User/components/counterCourses';
import CounterServices from './User/components/counterServices';
import Features from './User/components/Features';
import RegistrationCourses from './User/pages/registrationCourses';
import NavServices from './User/components/navServices';
import RegistrationServices from './User/pages/registrationServices';
import Hero2 from './User/components/hero2';
import Hero3 from './User/components/hero3';
import Courses2 from './User/pages/courses2';
import Register from './User/pages/register';
import Partner2 from './User/components/partner2';
import Header2 from './User/components/header2';
import ProtectedRoute from './User/components/ProtectedRoute';
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
          {/* Public routes */}
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

          {/* Protected routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Navigate to="/home" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path='/home'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/about'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path='/contact'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path='/courses'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path='/courses2'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Courses2 />
              </ProtectedRoute>
            }
          />
          <Route
            path='/courseDetails'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/courseDetails2'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CourseDetails2 />
              </ProtectedRoute>
            }
          />
          <Route
            path='/services'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dervicesDetails'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DervicesDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/serviceRequest'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ServiceRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path='/successStory'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SuccessStory />
              </ProtectedRoute>
            }
          />
          <Route
            path='/question'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Question />
              </ProtectedRoute>
            }
          />
          <Route
            path='/registrationCourses'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RegistrationCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path='/registrationServices'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RegistrationServices />
              </ProtectedRoute>
            }
          />
          
          {/* Component routes */}
          <Route
            path='/hero'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Hero />
              </ProtectedRoute>
            }
          />
          <Route
            path='/hero2'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Hero2 />
              </ProtectedRoute>
            }
          />
          <Route
            path='/hero3'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Hero3 />
              </ProtectedRoute>
            }
          />
          <Route
            path='/partner'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Partner />
              </ProtectedRoute>
            }
          />
          <Route
            path='/partner2'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Partner2 />
              </ProtectedRoute>
            }
          />
          <Route
            path='/header2'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header2 />
              </ProtectedRoute>
            }
          />
          <Route
            path='/features'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Features />
              </ProtectedRoute>
            }
          />
          <Route
            path='/counterCourses'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CounterCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path='/counterServices'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CounterServices />
              </ProtectedRoute>
            }
          />
          <Route
            path='/navServices'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <NavServices />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;