import React, { useState, useEffect } from 'react';
import './css/item.css';

const ItemList = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemListData, setItemListData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
      },
    })
      .then(response => response.json())
      .then(data => setItemListData(data.data))
      .catch(error => console.log(error));
  }, []);

  const handleDropdownToggle = (event) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={handleDropdownToggle}>
        {selectedItem ? selectedItem.name : 'Select an item'}
      </button>
      {showDropdown && (
        <ul className="dropdown-menu">
          {itemListData.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={selectedItem === item ? 'selected' : ''}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;