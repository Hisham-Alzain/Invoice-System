import React, { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "../../App";
import { Link,useNavigate } from "react-router-dom";
import styles from "./css/Invoices.module.css"; // Import the CSS file for the invoices page
import NavBar from "../NavBar";
import { BsTrash, BsPencil, BsEye } from "react-icons/bs"; // Import the Bootstrap icons
import { DeleteInvoice, FetchInvoices } from "../../apis/api";


const Invoices = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
  useContext(LoginContext);
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (loggedIn && !initialized.current) {
      initialized.current = true;
      FetchInvoices(accessToken)
        .then((response) => {
          if (!response.status==200) {
            throw new Error("Failed to fetch invoices");
          }
          return response; 
        })
        .then((data) => {
          if (Array.isArray(data.data.data)) {
            setInvoices(data.data.data);
          } else {
            throw new Error("Invalid invoice data");
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    }
  }, [loggedIn, accessToken]);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderInvoice = (invoice) => {
    const handleEdit = () => {
      navigate(`/invoices/${invoice.id}/update`);  
    };
  
    const handleDelete = () => {
      // Handle delete logic for the invoice
      DeleteInvoice(accessToken, invoice.id)
        .then(response => {
          if (response.status==200) {
            // Remove the deleted client from the list
            setInvoices(prevInvoices => prevInvoices.filter(c => c.id.toString() !== invoice.id));
          } else {
            console.log(response)
            throw new Error('Failed to delete client');
          }
        })
        .catch(error => {
          // Handle error properly
          console.error(error);
          // Optionally set an error state here
        });
    };
  
    return (
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{invoice.release_date}</td>
        <td>{invoice.client.name}</td>
        <td>{invoice.total_amount.toLocaleString()}</td>
        <td>
          <Link
            to={`/invoices/${invoice.id}`}
            className="btn btn-primary btn-sm"
          >
            <BsEye /> View Details
          </Link>
          <button
            onClick={handleEdit}
            className="btn btn-warning btn-sm"
          >
            <BsPencil /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
          >
            <BsTrash /> Delete
          </button>
        </td>
      </tr>
    );
  };
  

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.invoices_page}>
      <NavBar />
      <div className={styles.contentInvoices}>
        <div className={styles.TopBar}>
        <h1 className={styles.title}>View Invoices</h1>
          <div className={styles.SearchBar}>
            <input
              type="text"
              className={styles.SearchInput}
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className={styles.SearchButton}>Search</button>
            <Link to="/invoices/create" className="btn btn-primary">
              Create
            </Link>
          </div>
        </div>
        <table className={styles.invoices_table}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Invoice Date</th>
              <th>Client</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{filteredInvoices.map(renderInvoice)}</tbody>
        </table>
        <div className="cta-buttons"></div>
      </div>
    </div>
  );
};

export default Invoices;
