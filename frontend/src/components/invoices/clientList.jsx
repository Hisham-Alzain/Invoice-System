import React, { useState, useEffect, useContext, useRef } from 'react';
import './css/item.css';
import { LoginContext } from '../../App';
import { FetchClients } from '../../apis/api';

const ClientList = ({ initialClient, handleClientChange }) => {
  const { loggedIn, accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [selectedClient, setSelectedClient] = useState(initialClient);
  const [clientListData, setClientListData] = useState([]);

  useEffect(() => {
    if (loggedIn && !initialized.current) {
      initialized.current = true;
      FetchClients(accessToken)
        .then((response) => response)
        .then((data) => {
          if (Array.isArray(data.data.data)) {
            setClientListData(data.data.data);
          } else {
            throw new Error("Invalid client data");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn, accessToken]);

  useEffect(() => {
    setSelectedClient(initialClient);
  }, [initialClient]);

  const handleClientChangeInternal = (event) => {
    const selectedClientId = event.target.value;
    const selectedClient = clientListData.find(client => client.id.toString() === selectedClientId);
    setSelectedClient(selectedClient);
    handleClientChange(selectedClient); // Call the handleClientChange prop function
  };

  return (
    <div>
      <label htmlFor="clientDropdown">Client:</label>
      <select id="clientDropdown" value={selectedClient ? selectedClient.id : ''} onChange={handleClientChangeInternal}>
        <option value="">-- Please choose an option --</option>
        {clientListData.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientList;