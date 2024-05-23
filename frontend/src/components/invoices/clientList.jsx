import React, { useState, useEffect, useContext, useRef } from 'react';
import Select from 'react-select';
import { LoginContext } from '../../App';
import { FetchClients } from '../../apis/api';

const ClientList = ({ initialClient, handleClientChange }) => {
  const { loggedIn, accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [selectedClient, setSelectedClient] = useState(initialClient);
  const [clientListData, setClientListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleClientChangeInternal = (selectedOption) => {
    setSelectedClient(selectedOption);
    handleClientChange(selectedOption); // Call the handleClientChange prop function
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clientListData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clientOptions = filteredClients.map(client => ({
    value: client.id,
    label: client.name
  }));

  return (
    <div>
      <label htmlFor="clientDropdown">Client:</label>
      <Select
        id="clientDropdown"
        value={selectedClient}
        onChange={handleClientChangeInternal}
        options={clientOptions}
        placeholder="Please choose an option"
      />
    </div>
  );
};

export default ClientList;