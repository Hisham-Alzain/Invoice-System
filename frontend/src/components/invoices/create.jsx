import React, { useState, useEffect, useContext } from 'react';
import ClientList from './clientList';
import ItemList from './items';
import styles from './css/CreateInvoice.module.css';
import NavBar from '../NavBar';
import { CreateInvoiceApi } from '../../apis/api';
import { LoginContext } from '../../App';

const CreateInvoice = () => {
  const billing_states = [
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
  ];

  const { loggedIn, accessToken } = useContext(LoginContext);
  const [release_date, setReleaseDate] = useState('');
  const [selectedBilling_status, setSelectedBilling_status] = useState('');
  const [total_amount, setTotalAmount] = useState(0);
  const [client, setClient] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const newTotalAmount = invoiceItems.reduce((acc, item) => {
      console.log(item);
      const itemPrice = item.item?.price || 0;
      const itemQuantity = item.qtn || 0;
      return acc + itemPrice * itemQuantity;
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [invoiceItems]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const NewinvoiceItems = invoiceItems.map((item) => ({
      item_id: item.item.value,
      qtn: item.qtn,
    }));
    console.log(client.value)
    CreateInvoiceApi(accessToken, client.value, release_date, selectedBilling_status, total_amount, NewinvoiceItems)
      .then((response) => {
        console.log(response);
        if(response.status==200){
        setSuccessMessage('Invoice created successfully!');
        setReleaseDate('');
        setSelectedBilling_status('');
        setClient(null);
        setInvoiceItems([]);
      }
      else{
        setSuccessMessage('An error occurred while creating the invoice. Please try again.');
      }
  })
      .catch((error) => {
        console.log(error);
        setSuccessMessage('An error occurred while creating the invoice. Please try again.');
      });
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

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].qtn = Number(quantity);
    setInvoiceItems(updatedItems);
  };

  const handleItemChange = (index, selectedItem) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index] = { ...updatedItems[index], item: selectedItem };
    setInvoiceItems(updatedItems);
  };

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { item: null, qtn: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  return (
    <div className={styles.createInvoice}>
      <nav>
        <NavBar />
      </nav>
      <div className={styles.contentCreateInvoice}>
        <div className={styles.left_section}>
          <h1>Create Invoice</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="client"></label>
              <ClientList handleClientChange={handleClientChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="release_date">Release Date:</label>
              <input type="date" id="release_date" value={release_date} onChange={handleReleaseDateChange} />
            </div>
            <div className={styles.form_group}>
              <label>Billing Status:</label>
              {billing_states.map((billing_status) => (
                <label key={billing_status.value} className={styles.radio_label}>
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
            <div className={styles.form_group}>
              <label htmlFor="total_amount">Total Amount:</label>
              <div>{total_amount.toFixed(2)}</div>
            </div>
            <button type="submit" className={styles.submit_button}>Create Invoice</button>
            {successMessage && <p className={styles.success_message}>{successMessage}</p>}
          </form>
        </div>
        <div className={styles.right_section}>
          <div className={styles.invoice_items}>
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
                      <ItemList className={styles.itemList} handleItemChange={(selectedItem) => handleItemChange(index, selectedItem)} />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.qtn}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                    </td>
                    <td>{((item.item?.price || 0) * item.qtn).toFixed(2)}</td>
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
