import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Invoices.css'; // Import the CSS file for the invoices page

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/invoices", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch invoices');
        }
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setInvoices(data.data);
        } else {
          throw new Error('Invalid invoice data');
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render individual invoice view
  const renderInvoice = (invoice) => {
    return (
      <div key={invoice.id} className="invoice-container">
        <div className="left-part">
          <h2>Invoice ID: {invoice.id}</h2>
          <p>Invoice Date: {invoice.release_date}</p>
          <p>Client: {invoice.client.name}</p>
          <p>Total Amount: {invoice.total_amount}</p>
          
        </div>
        <div className="right-part">
          <Link to={`/invoices/${invoice.id}`}>View Details</Link>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <div className="invoices-page">
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
        <h1>View Invoices</h1>
        {invoices.map(renderInvoice)}
        <div className="cta-buttons"></div>
      </div>
    </div>
  );
};

export default Invoices;