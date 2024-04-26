import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Invoices.css"; // Import the CSS file for the invoices page
import NavBar from "../NavBar";
import { BsTrash, BsPencil, BsEye } from "react-icons/bs"; // Import the Bootstrap icons

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/invoices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch invoices");
        }
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setInvoices(data.data);
        } else {
          throw new Error("Invalid invoice data");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

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
          <tbody>{invoices.map(renderInvoice)}</tbody>
        </table>
        <div className="cta-buttons"></div>
      </div>
    </div>
  );
};

export default Invoices;
