import React from 'react';
import axios from 'axios';


export const FetchUserData = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/userData', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const CheckToken = async (
  token
) => {
  try {
      const response = await axios.get('http://127.0.0.1:8000/api/isExpired', {
          headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': "application/json",
              'Authorization': `Bearer ${token}`
          }
      });
      return response;
  } catch (error) {
      return error.response;
  }
};
export const FetchItems = async(
  token
)=>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/items', {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
} catch (error) {
    return error.response;
}
};
export const FetchInvoices = async(
  token
)=>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/invoices', {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
} catch (error) {
    return error.response;
}
};
export const FetchClients = async(
  token
)=>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/clients', {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
} catch (error) {
    return error.response;
}
};
export const CreateInvoice = async(
  token,
  client,
  release_date,
  selectedBilling_status,
  total_amount,
  NewinvoiceItems,
)=>{
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/invoices',{
      "client_id": client.id,
      "release_date": release_date,
      "billing_status": selectedBilling_status,
      "total_amount": total_amount,
      "invoice_items": NewinvoiceItems,
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
} catch (error) {
    return error.response;
}
};