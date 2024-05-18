import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./css/invoiceDetails.css";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/invoices/${id}`, {
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
          throw new Error("Failed to fetch invoice details");
        }
      })
      .then((data) => {
        console.log(data.data);
        setInvoice(data.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/invoices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted client from the list
          window.location.href = "/invoices";
        } else {
          throw new Error("Failed to delete invoice");
        }
      })
      .catch((error) => setError(error));
  };

  const handlePrint = () => {
    window.print();
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!invoice) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="invoice-details">
      <nav>
        <NavBar />
      </nav>

      <div className="detailsContainer">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="invoice-title">
                  <h4 className="float-end font-size-15">
                    {id}
                    <span className="badge bg-success font-size-12 ms-2">
                      {invoice.billing_status}
                    </span>
                  </h4>
                  <div className="mb-4">
                    <h2 className="mb-1 text-muted">InvoiceSystem.com</h2>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-sm-6">
                    <div className="text-muted">
                      <h5 className="font-size-16 mb-3">Billed To:</h5>
                      <h5 className="font-size-15 mb-2">
                        {invoice.client.name}
                      </h5>
                      <p className="mb-1">{invoice.client.location}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-muted text-sm-end">
                      <div>
                        <h5 className="font-size-15 mb-1">Invoice No:</h5>
                        <p>{invoice.id}</p>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                        <p>{invoice.release_date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <h5 className="font-size-15">Order Summary</h5>

                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-centered mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "70px" }}>No.</th>
                          <th>Item</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th className="text-end" style={{ width: "120px" }}>
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.Invoice_items.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.item.name}</td>
                            <td>{item.item.price}</td>
                            <td>{item.qtn}</td>
                            <td className="text-end">
                              {item.item.price * item.qtn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6"></div>
                  <div className="col-sm-6">
                    <div className="text-muted text-sm-end">
                      <div>
                        <h5 className="font-size-15 mb-1">Total Amount:</h5>
                        <p>{invoice.total_amount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-print-none">
                  <div className="float-end">
                    <Link
                      to={`/invoices/${id}/edit`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>{" "}
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                    <button className="btn btn-secondary" onClick={handlePrint}>
                      <FontAwesomeIcon icon={faPrint} className="me-1" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
