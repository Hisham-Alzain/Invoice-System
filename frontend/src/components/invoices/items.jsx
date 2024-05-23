import React, { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "../../App";
import { FetchItems } from "../../apis/api";
import Select from 'react-select';

const ItemList = ({ initialItem, handleItemChange }) => {
  const { loggedIn, accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [itemListData, setItemListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (loggedIn && !initialized.current) {
      initialized.current = true;
      FetchItems(accessToken)
        .then((response) => response.data.data)
        .then((data) => {
          if (Array.isArray(data)) {
            setItemListData(data);
          } else {
            throw new Error("Invalid item data");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn, accessToken]);

  useEffect(() => {
    setSelectedItem(initialItem);
  }, [initialItem]);

  const handleItemChangeInternal = (selectedOption) => {
    setSelectedItem(selectedOption);
    handleItemChange(selectedOption); // Call the handleItemChange prop function
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = itemListData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemOptions = filteredItems.map(item => ({
    value: item.id,
    label: item.name
  }));

  return (
    <div>
      <label htmlFor="itemDropdown"></label>
      <Select
        id="itemDropdown"
        value={selectedItem}
        onChange={handleItemChangeInternal}
        options={itemOptions}
        placeholder="Please choose an option"
      />
    </div>
  );
};

export default ItemList;