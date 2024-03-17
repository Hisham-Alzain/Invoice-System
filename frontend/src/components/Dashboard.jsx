import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for the home page

const Dashboard = () => {
    
  return (
    <div className="homepage">
      <div className="sidebar">
        <h2>Invoice System</h2>
        <ul>
          <li>
            <Link to="/invoices">View Invoices</Link>
          </li>
          <li>
            <Link to="/create-invoice">Create New Invoice</Link>
          </li>
          <li>
            <Link to="/clients">Manage Clients</Link>
          </li>
          <li>
            <Link to="/reports">Generate Reports</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Invoice System</h1>
        <div className="cta-buttons">
          <Link to="/invoices" className="btn btn-primary">
            View Invoices
          </Link>
          <Link to="/create-invoice" className="btn btn-secondary">
            Create New Invoice
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;