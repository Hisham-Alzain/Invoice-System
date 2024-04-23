import React, { useEffect, useState, useRef, createContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const cookieToken = Cookies.get('access_token');
        if (cookieToken) {
          const response = await checkToken(cookieToken);
          if (response.status === 200) {
            setLoggedIn(true);
            setAccessToken(cookieToken);
          } else {
            handleUnauthorized();
          }
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const checkToken = async (token) => {
    // Mock API call to validate token
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token === "valid_token") {
          resolve({ status: 200 });
        } else {
          resolve({ status: 401, statusText: "Unauthorized" });
        }
      }, 1000);
    });
  };

  const handleUnauthorized = () => {
    // Handle unauthorized access (e.g., clear cookies, redirect to login)
    Cookies.remove('access_token');
    setLoggedIn(false);
    setAccessToken(null);
    console.log("Unauthorized access. Redirecting to login...");
  };

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
