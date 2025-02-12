import React from 'react';

const SubscriptionTable = ({ registrations, users = [], programs = [] }) => {
    if (!registrations || registrations.length === 0) {
        return <div className="alert alert-warning">No recordings available.</div>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Latest Registrations</h5>
                <div className="table-responsive">
                    <table className="table text-nowrap align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Program</th>
                                <th className="text-center">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((registration) => {
                                const user = users.find(user => user.id === registration.user_id);
                                const program = programs.find(program => program.id === registration.program_id);

                                return (
                                    <tr key={registration.id}>
                                        <th scope="row">{user ? user.name : 'N/A'}</th>
                                        <td>{program ? program.title : 'N/A'}</td>
                                        <td className="text-center">{user ? user.phone : 'N/A'}</td>
                                        <td className="text-center">
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionTable;