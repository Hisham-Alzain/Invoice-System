import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/clientsAdd.module.css'
import NavBar from '../NavBar';

const CreateClient = () => {
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/clients', {
      method: 'POST',
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
        setSuccessMessage('Client created successfully!');
      })
      .catch((error) => {
        console.log(error);
        setSuccessMessage('An error occurred while creating the Client. Please try again.');
      });
    // Reset the form fields and state after successful submission
    setName('');
    setLocation('');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };


  return (
    <div className={styles.clientsAdd}>
       <nav>
      <NavBar />
    </nav>
      <div className={styles.ClientsContent}>
        <h1>Create Client</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="Name" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Location:
            <input type="text" name="Location" value={location} onChange={handleLocationChange} />
          </label>
          <button type="submit">Create Client</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateClient;