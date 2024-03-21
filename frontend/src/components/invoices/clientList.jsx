import React, { useState, useEffect } from 'react';
import './css/item.css';

const ClientList = ({ handleClientChange }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientListData, setClientListData] = useState([]);
  const [showDropdown, setShowDropdownProp] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/clients", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
      },
    })
      .then(response => response.json())
      .then(data => setClientListData(data.data))
      .catch(error => console.log(error));
  }, []);

  const handleDropdownToggle = (event) => {
    event.preventDefault();
    setShowDropdownProp(!showDropdown);
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowDropdownProp(false);
    handleClientChange(client); // Call the handleClientChange prop function
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={handleDropdownToggle}>
        {selectedClient ? selectedClient.name : 'Select a client'}
      </button>
      {showDropdown && (
        <ul className="dropdown-menu">
          {clientListData.map((client) => (
            <li
              key={client.id}
              onClick={() => handleClientClick(client)}
              className={selectedClient === client ? 'selected' : ''}
            >
              {client.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientList;