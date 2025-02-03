// src/components/Dashboard.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SubscriptionTable from '../components/SubscriptionTable';
import MostRequested from '../components/MostRequested';
import CourseCard from '../components/CourseCard';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../assets/css/styles.min.css'; 

const courses = [
    {
        title: 'HTML',
        description: 'HTML course for beginners includes collecting the basic rules of the web.',
        duration: '11 hours',
        price: '30',
        date: 'Mon, Dec 19',
        views: 9,
        image: require('../assets/images/blog/blog-img1.jpg'), 
        userImage: require('../assets/images/profile/user-1.jpg'),
    },
    {
        title: 'CSS',
        description: 'CSS course for beginners includes collecting the basic rules of the web.',
        duration: '20 hours',
        price: '38',
        date: 'Sun, Dec 18',
        views: 40,
        image: require('../assets/images/blog/blog-img2.jpg'),
        userImage: require('../assets/images/profile/user-2.jpg'),
    },
    {
        title: 'Oracle',
        description: 'Oracle course for beginners includes collecting the basic rules of the web.',
        duration: '30 hours',
        price: '12',
        date: 'Sat, Dec 17',
        views: 9,
        image: require('../assets/images/blog/blog-img3.jpg'),
        userImage: require('../assets/images/profile/user-3.jpg'),
    },
];

const Dashboard = () => {
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <SubscriptionTable />
                        </div>
                        <div className="col-lg-4">
                            <MostRequested />
                        </div>
                    </div>
                    <div className="row mt-4">
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;