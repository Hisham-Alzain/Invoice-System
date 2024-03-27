import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/invoiceDetails.css";
import TopBar from '../TopBar.jsx';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/invoices/${id}`, {
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
          throw new Error('Failed to fetch invoice details');
        }
      })
      .then((data) => {
        setInvoice(data.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/invoices/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
      },
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted client from the list
          window.location.href = '/invoices';
        } else {
          throw new Error('Failed to delete invoice');
        }
      })
      .catch(error => setError(error));
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!invoice) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="invoice-details">
         
      <div className="header">
        <TopBar />
      </div>

      <div className="invoice-info">
      <h2 className="invoice-id">Invoice ID: {invoice.id}</h2>
        <Link to={`/invoices/${id}/update`} className="action-button">Edit</Link>
        <table className="info-table">
          <tbody>
            <tr>
              <td><h3>Invoice Release Date</h3></td>
              <td>{invoice.release_date}</td>
            </tr>
            <tr>
              <td><h3>Client</h3></td>
              <td>{invoice.client.name}</td>
            </tr>
            <tr>
              <td><h3>Total Amount</h3></td>
              <td>{invoice.total_amount}</td>
            </tr>
            <tr>
              <td><h3>Billing Status</h3></td>
              <td>{invoice.billing_status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="created-by">
        <h3>Created By</h3>
        <p>{invoice.created_by.name}</p>
        <p>{invoice.created_by.email}</p>
      </div>

      <div className="invoice-items">
        <h3>Invoice Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {invoice.Invoice_items.map((item) => (
              <tr key={item.id}>
                <td>{item.item.name}</td>
                <td>{item.qtn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button onClick={handleDelete} className="delete-button">Delete</button>
        <Link to="/invoices" className="action-link">Return to Invoices</Link>
      </div>
    </div>
  );
};

export default InvoiceDetails;