import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/invoiceDetails.css";

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/invoices/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 22|49TmZtWBceqNonxi1AgaXaYmYh8dGPXctHN60zkb19dc2ac2"
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch invoice details');
                }
            })
            .then((data) => {
                setInvoice(data.data);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            });
    }, [id]);

    const handleDelete = () => {
        // Add delete logic here
    };

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!invoice) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="invoice-details">
            <div className="header">
                <h2 className="invoice-id">Invoice ID: {invoice.id}</h2>
                <Link to={`/invoices/${id}/update`} className="action-button">Edit</Link>
            </div>

            <div className="invoice-info">
                <div className="info-block">
                    <h3>Invoice Release Date</h3>
                    <p>{invoice.release_date}</p>
                </div>
                <div className="info-block">
                    <h3>Client</h3>
                    <p>{invoice.client.name}</p>
                </div>
                <div className="info-block">
                    <h3>Total Amount</h3>
                    <p>{invoice.total_amount}</p>
                </div>
                <div className="info-block">
                    <h3>Billing Status</h3>
                    <p>{invoice.billing_status}</p>
                </div>
            </div>

            <div className="created-by">
                <h3>Created By</h3>
                <p>{invoice.created_by.name}</p>
                <p>{invoice.created_by.email}</p>
            </div>

            <div className="invoice-items">
                <h3>Invoice Items</h3>
                {invoice.Invoice_items.map((item) => (
                    <div className="item" key={item.id}>
                        <p>{item.item.name}</p>
                        <p>Quantity: {item.qtn}</p>
                    </div>
                ))}
            </div>

            <div className="actions">
                <button onClick={handleDelete} className="delete-button">Delete</button>
                <Link to="/invoices" className="action-link">Return to Invoices</Link>
            </div>
        </div>
    );
};

export default InvoiceDetails;