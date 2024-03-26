import React from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css'; // Import the CSS file for the home page
import { useMediaQuery } from 'react-responsive';

const Dashboard = () => {
  
  return (
    <div className="homepage">
      <div className="container">
        <header>
          <h1>Invoice System</h1>
          <nav>
            <label htmlFor="menu-toggle" className="menu-btn">
              <span className="menu-icon"></span>
            </label>
            <ul className="menu">
              <li>
                <Link to="/invoices">View Invoices</Link>
              </li>
              <li>
                <Link to="/invoices/create">Create New Invoice</Link>
              </li>
              <li>
                <Link to="/clients">Manage Clients</Link>
              </li>
              <li>
                <Link to="/reports">Generate Reports</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div className="content">
        <div className="container">
          <h2>Welcome to the Invoice System</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;