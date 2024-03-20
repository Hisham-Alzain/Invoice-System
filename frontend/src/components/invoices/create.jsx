import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientList from './clients';
import ItemList from './items';
import './css/CreateInvoice.css';

const CreateInvoice = () => {
  const billing_states = [
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
  ];

  const [release_date, setReleaseDate] = useState('');
  const [selectedBilling_status, setSelectedBilling_status] = useState('');
  const [total_amount, setTotalAmount] = useState('');
  const [client, setClient] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [shouldSubmitForm, setShouldSubmitForm] = useState(false);

  const handleSubmit = (e) => {
    if (!shouldSubmitForm) {
      // Check if the form submission should be prevented
      e.preventDefault();
      setShouldSubmitForm(true); // Reset the form submission flag
      return;
    }

      // Perform API request to create the invoice using the invoiceData
      const invoiceData = {
        release_date,
        billing_status: selectedBilling_status,
        total_amount,
        client,
        invoice_items: invoiceItems,
      };

      console.log(client);
      fetch('http://127.0.0.1:8000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2',
        },
        body: JSON.stringify(invoiceData),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset the form fields and state after successful submission
      setReleaseDate('');
      setSelectedBilling_status('');
      setTotalAmount('');
      setClient(null);
      setInvoiceItems([]);
      setShowDropdown(false);
    
  };

  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleBillingStatusChange = (event) => {
    setSelectedBilling_status(event.target.value);
  };

  const handleClientChange = (selectedClient) => {
    setShouldSubmitForm(false); // Set the flag to prevent form submission
    setClient(selectedClient);
  };


  const handleTotalAmountChange = (event) => {
    setTotalAmount(event.target.value);
  };

  const handleItemChange = (index, field, selectedItem) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = selectedItem;
    setInvoiceItems(updatedItems);
  };

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { item: null, quantity: '', price: '' }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  return (
    <div className="create-invoice">
      <div className="sidebar">
        <h2>Invoice System</h2>
        <ul>
          <li>
            <Link to="/invoices">View Invoices</Link>
          </li>
          <li>
            <Link to="/invoices/create">Create New Invoice</Link>
          </li>
          <li>
            <Link to="/clients">Manage Clients</Link>
          </li>
          <li>
            <Link to="/reports">Generate Reports</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Create Invoice</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Client:
            <ClientList handleClientChange={handleClientChange} />
          </label>
          <label>
            Release Date:
            <input type="date" name="release_date" value={release_date} onChange={handleReleaseDateChange} />
          </label>
          <div>
            {billing_states.map((billing_status) => (
              <label key={billing_status.value}>
                <input
                  type="radio"
                  value={billing_status.value}
                  checked={selectedBilling_status === billing_status.value}
                  onChange={handleBillingStatusChange}
                />
                {billing_status.label}
              </label>
            ))}
          </div>
          <label>
            Total Amount:
            <input type="number" name="total_amount" value={total_amount} onChange={handleTotalAmountChange} />
          </label>
          <div>
            <h2>Invoice Items</h2>
            {invoiceItems.map((item, index) => (
              <div key={index}>
                <label>
                  Item ID:
                  <ItemList
                    selectedItem={item.item_id}
                    onChange={(selectedItem) => handleItemChange(index, 'item_id', selectedItem)}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.qtn}
                    onChange={(e) => handleItemChange(index, 'qtn', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => handleRemoveItem(index)}>
                  Remove Item
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
          <button type="submit">Create Invoice</button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;