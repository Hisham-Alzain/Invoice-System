import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/HomePage.module.css'; // Import the CSS file for the home page
import NavBar from './NavBar';

const Dashboard = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.Homecontainer}>
        <NavBar></NavBar>
      </div>
      <div className={styles.homecontent}>
        <div className={styles.Homecontainer}>
          <h2>Welcome to the Invoice System</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;