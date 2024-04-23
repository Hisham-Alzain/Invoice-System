import React from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css'; // Import the CSS file for the home page
import NavBar from './NavBar';

const Dashboard = () => {
  return (
    <div className="homepage">
      <div className="container">
        <NavBar></NavBar>
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