import React, { useEffect, useState,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './css/clientsAdd.module.css';
import NavBar from '../NavBar';
import { LoginContext } from '../../App';

const UpdateClient = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
  useContext(LoginContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${accessToken}`
      },
    })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      setName(data.data.name);
      setLocation(data.data.location);
      console.log(name);
      console.log(location);
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
        Authorization: `Bearer ${accessToken}`,
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
    <div className={styles.clientsAdd}>
       <nav>
      <NavBar />
    </nav>
      <div className={styles.ClientsContent}>
        <h1>Update Client</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="Name" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Location:
            <input type="text" name="Location" value={location} onChange={handleLocationChange} />
          </label>
          <button type="submit">Update Client</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateClient;