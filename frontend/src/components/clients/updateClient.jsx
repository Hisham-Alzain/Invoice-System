import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./css/updateClients.css";

const UpdateClient = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
      },
    })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      setName(data.data.name);
      setLocation(data.data.location);
    })
    .catch((error) => {
      console.log(error);
      setSuccessMessage('An error occurred while updating the Client. Please try again.');
    });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2',
      },
      body: JSON.stringify(
        {
            "name":name,
            "location":location
        }
      ),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setSuccessMessage('Client updated successfully!');
      })
      .catch((error) => {
        console.log(error);
        setSuccessMessage('An error occurred while updating the Client. Please try again.');
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };


  return (
    <div className="create-invoice">
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
        <h1>Update Client</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Client ID:{id}
          </label>
          <label>
            Name:
            <input type="text" name="Name" value={name } onChange={handleNameChange} />
          </label>
          <label>
            Location:
            <input type="text" name="Location" value={location} onChange={handleLocationChange} />
          </label>
          <button type="submit">Update Client</button>
          <Link to={'/clients'}>Return to Clients List</Link>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateClient;