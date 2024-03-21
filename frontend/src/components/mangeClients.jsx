import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/mangeClients.css'; // Import the CSS file for the invoices page

const MangeClients = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/clients", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
      },
    })
      .then(response => response.json())
      .then(data => setClients(data.data))
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render individual client view
  const renderClient = (client) => {
    const handleDeleteClient = () => {
        fetch(`http://127.0.0.1:8000/api/clients/${client.id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
          },
        })
          .then(response => {
            if (response.ok) {
              // Remove the deleted client from the list
              setClients(prevClients => prevClients.filter(c => c.id !== client.id));
            } else {
              throw new Error('Failed to delete client');
            }
          })
          .catch(error => setError(error));
      };
    return (
      <div key={client.id} className="client-container">
        <div className="left-part">
          <h2>Client ID: {client.id}</h2>
          <p>Name: {client.name}</p>
          <p>Location: {client.location}</p>
        </div>
        <div className="right-part">
          <button onClick={handleDeleteClient}>Delete Client</button>
          <Link to={`/clients/update/${client.id}`}>Update Client</Link>
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
            <Link to="/invoices/create">Create New Invoice</Link>
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
        <h1>View Clients</h1>
        {clients.map(renderClient)}
        <div className="cta-buttons">
          <Link to="/clients/add" className="btn">Add Client</Link>
        </div>
      </div>
    </div>
  );
};

export default MangeClients;