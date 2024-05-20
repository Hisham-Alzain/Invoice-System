import React, { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "../../App";
import { FetchItems } from "../../apis/api";
import './css/item.css';

const ItemList = ({ handleItemChange }) => {
  const { loggedIn, accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [itemListData, setItemListData] = useState([]);

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

  const handleChange = (event) => {
    const selectedItemId = event.target.value;
    const selectedItem = itemListData.find(item => item.id.toString() === selectedItemId);
    console.log(selectedItem)
    setSelectedItem(selectedItem);
    handleItemChange(selectedItem);
  };

  return (
    <div>
      <label htmlFor="dropdown"></label>
      <select id="dropdown" value={selectedItem?.id || ''} onChange={handleChange}>
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
