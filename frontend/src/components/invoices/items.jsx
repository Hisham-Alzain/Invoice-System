import React, { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "../../App";
import { FetchItems } from "../../apis/api";
import './css/item.css';

const ItemList = ({ handleItemChange }) => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
    useContext(LoginContext);
  const initialized = useRef(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [itemListData, setItemListData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (loggedIn && !initialized.current) {
      initialized.current = true;
      FetchItems(accessToken)
        .then((response) => response)
        .then((data) => {
          if (Array.isArray(data.data.data)) {
            setItemListData(data.data.data);
          } else {
            throw new Error("Invalid invoice data");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn, accessToken]);

  const handleDropdownToggle = (event) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDropdown(false);
    handleItemChange(item);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedItem.id} onChange={handleItemClick}>
        <option value="">-- Please choose an option --</option>
        {itemListData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemList;