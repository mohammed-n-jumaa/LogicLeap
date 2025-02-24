import React from 'react';
import About from '../pagesHome/aboutHome';
import Services from '../pagesHome/servicesHome';
import CounterCourses from '../components/counterCourses';
import Courses from '../pagesHome/coursesHome';
import Hero3 from '../components/hero3'
import Header from '../components/header';
import Footer from '../components/footer';

const App = () => {
  return (
    <>
        <Header/>
        <Hero3 />
        <About />
        <Courses />
        <Services />
        <Footer/>
        
    </>
  );
}

export default App;
