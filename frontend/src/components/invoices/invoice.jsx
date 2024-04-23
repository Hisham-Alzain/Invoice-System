import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Invoices.css'; // Import the CSS file for the invoices page
import TopBar from '../TopBar';
//import 'bootstrap/dist/css/bootstrap.css';

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

  const renderInvoice = (invoice) => {
    return (
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{invoice.release_date}</td>
        <td>{invoice.client.name}</td>
        <td>{invoice.total_amount}</td>
        <td>
          <Link to={`/invoices/${invoice.id}`}>View Details</Link>
        </td>
      </tr>
    );
  };
  
  return (
    <div className="invoices-page">
      <TopBar/>
      <div className="content">
        <h1>View Invoices</h1>
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Invoice Date</th>
              <th>Client</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(renderInvoice)}
          </tbody>
        </table>
        <div className="cta-buttons"></div>
      </div>
    </div>
  );
}

export default Invoices;