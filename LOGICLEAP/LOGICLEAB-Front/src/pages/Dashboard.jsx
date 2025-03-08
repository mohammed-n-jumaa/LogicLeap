import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SubscriptionTable from '../components/SubscriptionTable';
import MostRequested from '../components/MostRequested';
import CourseCard from '../components/CourseCard';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [mostRequested, setMostRequested] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start with loading true

    useEffect(() => {
        setIsLoading(true); // Ensure loading is true at the start
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    fetch('https://logicleap-769836b54d38.herokuapp.com/api/latest-registrations'),
                    fetch('https://logicleap-769836b54d38.herokuapp.com/api/most-requested'),
                    fetch('https://logicleap-769836b54d38.herokuapp.com/api/courses'),
                    fetch('https://logicleap-769836b54d38.herokuapp.com/api/users')
                ]);

                responses.forEach((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                });

                const [registrationsData, mostRequestedData, programsData, usersData] = 
                    await Promise.all(responses.map(res => res.json()));

                setRegistrations(registrationsData);
                setMostRequested(mostRequestedData);
                setPrograms(programsData);
                setUsers(usersData);
                setIsLoading(false); // Only set loading to false after all data is set
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            setIsLoading(true); // Reset loading state when component unmounts
        };
    }, []);

    // Show loading spinner immediately if loading
    if (isLoading) {
        return (
            <div className="page-wrapper">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper"
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                        <div className="col-lg-8">
                            <ErrorBoundary>
                                <SubscriptionTable
                                    registrations={registrations}
                                    users={users}
                                    programs={programs}
                                />
                            </ErrorBoundary>
                        </div>
                        <div className="col-lg-4">
                            <MostRequested mostRequested={mostRequested} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        {programs.length === 0 ? (
                            <div className="col-12">No programs available</div>
                        ) : (
                            programs.map((program) => (
                                <CourseCard key={program.id} course={program} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;