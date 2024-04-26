import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientList from './clientList';
import ItemList from './items';
import './css/CreateInvoice.css';
import NavBar from '../NavBar';
//import 'bootstrap/dist/css/bootstrap.css';

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
  
    if (!updatedItems[index]) {
      updatedItems[index] = {}; // Initialize the item object if it doesn't exist
    }
  
    updatedItems[index].item = selectedItem; // Update the item property
    setInvoiceItems(updatedItems);
  };

  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { item: null, qtn: 0, price: '', total: 0 } // Add default values for the new item
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  return (
    <div className='createInvoice'>
      <nav>
      <NavBar />
    </nav>
    <div className="content">
    
    <div className="left-section">
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="client">Client:</label>
          <ClientList handleClientChange={handleClientChange} />
        </div>
        <div className="form-group">
          <label htmlFor="release_date">Release Date:</label>
          <input type="date" id="release_date" value={release_date} onChange={handleReleaseDateChange} />
        </div>
        <div className="form-group">
          <label>Billing Status:</label>
          {billing_states.map((billing_status) => (
            <label key={billing_status.value} className="radio-label">
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
        <div className="form-group">
          <label htmlFor="total_amount">Total Amount:</label>
          <input type="number" id="total_amount" value={total_amount} onChange={handleTotalAmountChange} />
        </div>
        <button type="submit" className="submit-button">Create Invoice</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
    <div className="right-section">
      <div className="invoice-items">
        <h2>Invoice Items:</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <ItemList className='itemList' handleItemChange={handleItemChange} />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.qtn}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </td>
                <td>{item.total}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleRemoveItem(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='btn btn-primary' onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  </div>
  </div>
  );
};

export default CreateInvoice;