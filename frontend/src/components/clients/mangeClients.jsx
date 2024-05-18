import React, { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "../../App";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { BsTrash, BsPencil, BsEye } from "react-icons/bs"; // Import the Bootstrap icons
import styles from '../invoices/css/Invoices.module.css'; // Import the CSS file for the invoices page

const MangeClients = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
  useContext(LoginContext);
  const initialized = useRef(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (loggedIn && !initialized.current) {
      initialized.current = true;
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
  }
},[loggedIn, accessToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render individual client view
  const renderClient = (client) => {
    const handleDelete = () => {
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
      const handleEdit= () => {
        
      }
    return (
      <tr key={client.id}>
      <td>{client.id}</td>
      <td>{client.name}</td>
      <td>{client.location}</td>
      <td>
        <button
          onClick={() => handleEdit(client.id)}
          className="btn btn-warning btn-sm"
        >
          <BsPencil /> Edit
        </button>
        <button
          onClick={() => handleDelete(client.id)}
          className="btn btn-danger btn-sm"
        >
          <BsTrash /> Delete
        </button>
      </td>
    </tr>
    );
  };
  const filteredClients = clients.filter((client) =>
  client.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleSearch = (e) => {
  setSearchQuery(e.target.value);
};
return (
  <div className={styles.invoices_page}>
    <NavBar />
    <div className={styles.contentInvoices}>
      <div className={styles.TopBar}>
        <h1 className={styles.title}>View Clients</h1>
        <div className={styles.SearchBar}>
          <input
            type="text"
            className={styles.SearchInput}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className={styles.SearchButton}>Search</button>
          <Link to="/clients/create" className="btn btn-primary">
            Create
          </Link>
        </div>
      </div>
      <table className={styles.invoices_table}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{filteredClients.map(renderClient)}</tbody>
      </table>
      <div className="cta-buttons"></div>
    </div>
  </div>
);
};

export default MangeClients;