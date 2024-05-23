import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ClientList from "./clientList";
import ItemList from "./items";
import styles from "./css/CreateInvoice.module.css";
import NavBar from "../NavBar";
import moment from "moment";
import { ShowInvoice } from "../../apis/api";
import { LoginContext } from "../../App";

const UpdateInvoice = () => {
  const billing_states = [
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
  ];

  const { loggedIn, accessToken } = useContext(LoginContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [release_date, setReleaseDate] = useState("");
  const [selectedBilling_status, setSelectedBilling_status] = useState("");
  const [total_amount, setTotalAmount] = useState(0);
  const [client, setClient] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowInvoice(accessToken, id);
        const data = response.data.data;
        setClient(data.client);
        setInvoiceItems(data.Invoice_items.map((item) => ({
          item: item.item,
          qtn: item.qtn
        })));
        setTotalAmount(data.total_amount)
        setSelectedBilling_status(data.billing_status);
        setReleaseDate(data.release_date);
      } catch (error) {
        console.log(error);
        setSuccessMessage(
          "An error occurred while updating the Invoice. Please try again."
        );
      }
    };

    fetchData();
  }, [id, accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const NewinvoiceItems = invoiceItems.map((item) => ({
      item_id: item.id,
      qtn: item.qtn,
    }));
    // Perform API request to create the invoice using the invoiceData
    const data = {
      client_id: client.id,
      release_date: release_date,
      billing_status: selectedBilling_status,
      total_amount: total_amount,
      invoice_items: NewinvoiceItems,
    };
    fetch(` http://127.0.0.1:8000/api/invoices/${id} `, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":
        `Bearer ${accessToken}`
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setSuccessMessage("Invoice updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        setSuccessMessage(
          "An error occurred while updating the invoice. Please try again."
        );
      });
    // Reset the form fields and state after successful submission
    setReleaseDate("");
    setSelectedBilling_status("");
    setTotalAmount("");
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
    setClient(selectedClient);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].qtn = Number(quantity);
    setInvoiceItems(updatedItems);

    const newTotalAmount = updatedItems.reduce(
      (acc, item) => acc + (item.item?.price || 0) * item.qtn,
      0
    );
    setTotalAmount(newTotalAmount);
  };

  const handleItemChange = (index, selectedItem) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index] = { ...updatedItems[index], item: selectedItem };
    setInvoiceItems(updatedItems);

    const newTotalAmount = updatedItems.reduce(
      (acc, item) => acc + (item.item?.price || 0) * item.qtn,
      0
    );
    setTotalAmount(newTotalAmount);
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
          <h1>Update Invoice</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="client"></label>
              <ClientList
                initialClient={client}
                handleClientChange={handleClientChange}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="release_date">Release Date:</label>
              <input
                type="date"
                id="release_date"
                value={release_date}
                onChange={handleReleaseDateChange}
              />
            </div>
            <div className={styles.form_group}>
              <label>Billing Status:</label>
              {billing_states.map((billing_status) => (
                <label
                  key={billing_status.value}
                  className={styles.radio_label}
                >
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
              <div>{total_amount}</div>
            </div>
            <button type="submit" className={styles.submit_button}>
              Create Invoice
            </button>
            {successMessage && (
              <p className={styles.success_message}>{successMessage}</p>
            )}
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
                    <ItemList
                      className={styles.itemList}
                      initialItem={item.item} // Pass the initial item
                      handleItemChange={(selectedItem) =>
                        handleItemChange(index, selectedItem)
                      }
                    />
                  </td>
                    <td>
                      <input
                        type="number"
                        value={item.qtn}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td>{((item.item?.price || 0) * item.qtn).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInvoice;
