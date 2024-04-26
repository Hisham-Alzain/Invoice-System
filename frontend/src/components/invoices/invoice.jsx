import React, { useEffect, useContext, useState, useRef } from "react";
import { LoginContext } from "../../App";
import { Link } from "react-router-dom";
import "./css/Invoices.css"; // Import the CSS file for the invoices page
import NavBar from "../NavBar";
import { BsTrash, BsPencil, BsEye } from "react-icons/bs"; // Import the Bootstrap icons
import { FetchInvoices } from "../../apis/api";


const Invoices = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
  useContext(LoginContext);
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
      // Handle edit logic for the invoice
      console.log(`Edit invoice with ID: ${invoice.id}`);
    };

    const handleDelete = () => {
      // Handle delete logic for the invoice
      console.log(`Delete invoice with ID: ${invoice.id}`);
    };

    return (
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{invoice.release_date}</td>
        <td>{invoice.client.name}</td>
        <td>{invoice.total_amount}</td>
        <td>
          <Link
            to={`/invoices/${invoice.id}`}
            className="btn btn-primary btn-sm"
          >
            <BsEye /> View Details
          </Link>
          <button
            onClick={() => handleEdit(invoice.id)}
            className="btn btn-warning btn-sm"
          >
            <BsPencil /> Edit
          </button>
          <button
            onClick={() => handleDelete(invoice.id)}
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
    <div className="invoices-page">
      <NavBar />
      <div className="content">
        <div className="top-bar">
          <h1>View Invoices</h1>
          <div className="SearchBar">
            <input
              type="text"
              className="SearchInput"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="SearchButton">Search</button>
            <Link to="/invoices/create" className="btn btn-primary">
              Create
            </Link>
          </div>
        </div>
        <table className="invoices-table">
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
