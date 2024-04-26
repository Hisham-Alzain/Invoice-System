import React, { useState, useEffect,useContext,useRef } from 'react';
import './css/item.css';
import { LoginContext } from '../../App';
import { FetchClients } from '../../apis/api';

const ClientList = ({ handleClientChange }) => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [clientListData, setClientListData] = useState([]);
  const [showDropdown, setShowDropdownProp] = useState(false);

  useEffect(() => {
    if (loggedIn && !initialized.current) {
      initialized.current = true;
      FetchClients(accessToken)
        .then((response) => response)
        .then((data) => {
          if (Array.isArray(data.data.data)) {
            setClientListData(data.data.data);
          } else {
            throw new Error("Invalid invoice data");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn, accessToken]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowDropdownProp(false);
    handleClientChange(client); // Call the handleClientChange prop function
  };

  return (
    <div>
    <label htmlFor="dropdown"></label>
    <select id="dropdown" value={selectedClient.id} onChange={handleClientClick}>
      <option value="">-- Please choose an option --</option>
      {clientListData.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
  );
};

export default ClientList;