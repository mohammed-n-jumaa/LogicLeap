import React from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 
import '../assets/css/styles.min.css';

const Contacts = () => {
  const contacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+123456789', message: 'This is a test message.' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+987654321', message: 'Another example message.' },
   
  ];

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />

      <div className="body-wrapper">
        <Header /> 

        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Contacts Management</h5>
                <div className="table-responsive">
                  <table className="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr className="border-2 border-bottom border-primary border-0">
                        <th scope="col" className="ps-0">ID</th>
                        <th scope="col" className="ps-0">Name</th>
                        <th scope="col" className="ps-0">Email</th>
                        <th scope="col" className="ps-0">Phone</th>
                        <th scope="col" className="ps-0">Message</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {contacts.map(contact => (
                        <tr key={contact.id}>
                          <th scope="row" className="ps-0 fw-medium">{contact.id}</th>
                          <td className="fw-medium">{contact.name}</td>
                          <td className="fw-medium">{contact.email}</td>
                          <td className="fw-medium">{contact.phone}</td>
                          <td className="fw-medium">{contact.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;