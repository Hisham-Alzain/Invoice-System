import React, { useEffect, useState, useRef, createContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CheckToken } from './apis/api.jsx';
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import Invoices from "./components/invoices/invoice";
import InvoiceDetails from "./components/invoices/InvoiceDetails";
import UpdateInvoice from "./components/invoices/updateInvoice";
import Register from "./components/register";
import Login from "./components/login";
import ForgetPassword from './components/forgetPassword';
import ResetPassword from "./components/resetPassword";
import ItemList from "./components/invoices/items";
import MangeClients from "./components/mangeClients";
import CreateClient from "./components/clientsAdd";
import CreateInvoice from "./components/invoices/create";
import UpdateClient from "./components/updateClient";
import AnonymousRoutes from "./components/AnonymousRoutes";
import NavBar from "./components/NavBar";
import "./App.css";

export const LoginContext = createContext({});

function App() {
  const initialized = useRef(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  if (!initialized.current) {
    initialized.current = true;
    // Get user token from cookie (if there is any)
    const cookieToken = Cookies.get('access_token');
    // Check user token
    if (typeof cookieToken !== 'undefined') {
      CheckToken(cookieToken).then((response) => {
        if (response.status === 201) {
          setLoggedIn(true);
          setAccessToken(cookieToken);
        }
        else {
          Cookies.remove('access_token');
          console.log(response.statusText);
        }
        setLoading(false);
      });
    }
    else {
      setLoading(false);
    }
  }
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topbar" element={<NavBar />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/:id" element={<InvoiceDetails />} />
            <Route path="/invoices/:id/update" element={<UpdateInvoice />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/clients" element={<MangeClients />} />
            <Route path="/clients/add" element={<CreateClient />} />
            <Route path="/clients/update/:id" element={<UpdateClient />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
          </Route>
          <Route element={<AnonymousRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
