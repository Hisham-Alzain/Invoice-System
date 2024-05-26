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
export const FetchInvoice = async (token,id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/invoices/${id}`, {
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
export const CreateInvoiceApi = async(
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
export const EditInvoice=async(
  token,
  client,
  release_date,
  selectedBilling_status,
  total_amount,
  NewinvoiceItems 
)=>{
  try {
    const response = await axios.put('http://127.0.0.1:8000/api/invoices/',{
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
export const LogoutAPI=async(
  token
)=>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/logout', {
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
export const DeleteInvoice=async(token,id)=>{
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/invoices/${id}`, {
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
export const ShowInvoice=async(token,id)=>{
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/invoices/${id}`, {
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
export const AnnualData=async(token,year)=>{
try{
  const response = await axios.post(`http://127.0.0.1:8000/api/aa`,{
    "year":year
  }, {
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': "application/json",
        //  'Authorization': `Bearer ${token}`
      }
  });
  return response;
}catch(error){
  return error.response;
}
};
export const MonthlyData=async(token,year)=>{
  try{
    const response = await axios.post(`http://127.0.0.1:8000/api/mm`,{
      "year":year
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
          //  'Authorization': `Bearer ${token}`
        }
    });
    return response;
  }catch(error){
    return error.response;
  }
  };