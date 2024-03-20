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
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const NewinvoiceItems = invoiceItems.map(item => ({
      item_id: item.id,
      qtn: item.qtn
    }));
    // Perform API request to create the invoice using the invoiceData
    const data = {
      client_id: client.id,
      release_date: release_date,
      billing_status: selectedBilling_status,
      total_amount: total_amount,
      invoice_items: NewinvoiceItems,
    };
    fetch('http://127.0.0.1:8000/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2',
      },
      body: JSON.stringify(
        data
      ),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setSuccessMessage('Invoice created successfully!');
      })
      .catch((error) => {
        console.log(error);
        setSuccessMessage('An error occurred while creating the invoice. Please try again.');
      });
    // Reset the form fields and state after successful submission
    setReleaseDate('');
    setSelectedBilling_status('');
    setTotalAmount('');
    setClient(null);
    setInvoiceItems([]);

  };

  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleBillingStatusChange = (event) => {
    setSelectedBilling_status(event.target.value);
  };

  const handleClientChange = (selectedClient) => {
    console.log(selectedClient);
    setClient(selectedClient);
  };


  const handleTotalAmountChange = (event) => {
    setTotalAmount(event.target.value);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...invoiceItems];

    if (!updatedItems[index]) {
      updatedItems[index] = {}; // Initialize the item object if it doesn't exist
    }

    updatedItems[index].qtn = quantity; // Update the qtn property
    setInvoiceItems(updatedItems);
  };

  const handleItemChange = (index, selectedItem) => {
    const updatedItems = [...invoiceItems];
    console.log(selectedItem);
    if (!updatedItems[index]) {
      updatedItems[index] = {}; // Initialize the item object if it doesn't exist
    }

    updatedItems[index] = selectedItem; // Update the item_id property
    setInvoiceItems(updatedItems);
  };

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { item: null, qtn: 0, price: '' }]);
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
                  Item:
                  <ItemList handleItemChange={(selectedItem) => handleItemChange(index, selectedItem)} />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.qtn}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
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
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;