import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/login';
import Register from './components/register';
import ForgetPassword from './components/forgetPassword';
import ResetPassword from './components/resetPassword';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoices from './components/invoices/invoice';
import CreateInvoice from './components/invoices/create';
import ItemList from './components/invoices/items';
import ClientList from './components/invoices/clientList';
import MangeClients from './components/mangeClients';
import CreateClient from './components/clientsAdd';
import UpdateClient from './components/updateClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/clients" element={<MangeClients/>} />
          <Route path="/clients/add" element={<CreateClient/>} />
          <Route path="/clients/update/:id" element={<UpdateClient/>} />
          <Route path="/invoices/create" element={<CreateInvoice/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>,
  </React.StrictMode>,
)
