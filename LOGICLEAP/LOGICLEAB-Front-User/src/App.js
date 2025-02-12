
import React from 'react'
import About from './User/pages/about'
import Contact from './User/pages/contact'
import CourseDetails from './User/pages/courseDetails'
import CourseDetails2 from './User/pages/courseDetails2'
import Courses from './User/pages/courses'
import Index from './User/pages'
import Login from './User/pages/login'
import Question from './User/pages/question'
import ServiceRequest from './User/pages/serviceRequest'
import Services from './User/pages/services'
import DervicesDetails from './User/pages/servicesDetails'
import SuccessStory from './User/pages/successStory'
import Header from './User/components/header'
import Home from './User/pages/home'
import Partner from './User/components/partner'
import Footer from './User/components/footer'
import Hero from './User/components/hero'
import CounterCourses from './User/components/counterCourses'
import CounterServices from './User/components/counterServices'
import Features from './User/components/Features'
import RegistrationCourses from './User/pages/registrationCourses'
import NavServices from './User/components/navServices'
import RegistrationServices from './User/pages/registrationServices'
import Hero2 from './User/components/hero2'
import Hero3 from './User/components/hero3'
import Courses2 from './User/pages/courses2'
import Register from './User/pages/register'
import Partner2 from './User/components/partner2'
import Header2 from './User/components/header2'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'

function App() {
  return (
  <div>
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='courseDetails' element={<CourseDetails/>}/>
      <Route path='courses' element={<Courses/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='question' element={<Question/>}/>
      <Route path='serviceRequest' element={<ServiceRequest/>}/>
      <Route path='services' element={<Services/>}/>
      <Route path='dervicesDetails' element={<DervicesDetails/>}/>
      <Route path='successStory' element={<SuccessStory/>}/>
      <Route path='header' element={<Header/>}/>
      <Route path='hero' element={<Hero/>}/>
      <Route path='footer' element={<Footer/>}/>
      <Route path='home' element={<Home />}/>
      <Route path='partner' element={<Partner/>} />
      <Route path='counterCourses' element={<CounterCourses />}/>
      <Route path='counterServices'element={<CounterServices/>}/>
      <Route path='features' element={<Features />}/>
      <Route path='RegistrationCourses' element={<RegistrationCourses />}/>
      <Route path='registrationServices' element={<RegistrationServices />}/>
      <Route path='navServices' element={<NavServices/>}/>
      <Route path='Hero2' element={<Hero2/>}/>
      <Route path='Hero3' element={<Hero3/>}/>
      <Route path='courses2' element={<Courses2/>}/>
      <Route path='courseDetails2' element={<CourseDetails2/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='partner2' element={<Partner2/>}/>
      <Route path='header2'  element={<Header2/>}/>
    </Routes>
    </BrowserRouter>
  

  </div>
  
  )
}

export default App