import React, { useEffect, useState,useContext,useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/login.module.css';
import { LoginContext } from '../App';
import Cookies from 'js-cookie';

const Login = () => {
    // Context
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
    // Define states
  const initialized = useRef(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = (event) => {
    
    event.preventDefault();
    if (!initialized.current) {
      initialized.current = true;
    // Perform Login logic (Call api)
    fetch("http://127.0.0.1:8000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        "email": Email,
        "password": password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Do something with the token returned from Server data['token'] 
        console.log(data);
        const token = data.access_token;
        setAccessToken(token);
        Cookies.set('access_token', token);
        // Reset the form fields
        setEmail('');
        setPassword('');
        setLoggedIn(true);
        // Redirect to dashboard
        navigate('/');
        
      })
      .catch(error => {
        // Handle errors
        setFailMessage("Invalid email or password");
        console.log(error);
      });
    }
  };

  const handleRegisterClick = () => {
    // Redirect to the registration page
    navigate('/register');
  };

  const handleForgotPasswordSubmit = (event) => {
    window.location.href = '/forgetPassword';
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div>
        <label htmlFor="Email">Email:</label>
        <input
          type="email"
          id="Email"
          value={Email}
          onChange={handleEmailChange}
        />
      </div>
      <div className={styles.passwordContainer}>
        <label htmlFor="password">Password:</label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className={styles.togglePasswordButton}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button type="submit" className={styles.loginButton}>Login</button>
      <button type="button" onClick={handleForgotPasswordSubmit} className={styles.forgotPasswordButton}>
        Forgot Password?
      </button>
      <div className={styles.registerLink}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <div className={styles.failMessage}>{failMessage}</div>      
    </form>
  );
};

export default Login;