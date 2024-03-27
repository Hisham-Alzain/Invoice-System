import React, { useState } from 'react';
import './css/TopBsr.css';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`TopBar ${menuOpen ? 'menu-open' : ''}`}>
      <header>
        <h1>Invoice System</h1>
        <nav>
          <label htmlFor="menu-toggle" className="menu-btn" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </label>
          <ul className={`menu ${menuOpen ? 'open' : ''}`}>
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
  );
};

export default TopBar;