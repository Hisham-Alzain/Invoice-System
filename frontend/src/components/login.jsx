import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [results, setResults] = useState([])
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform Login logic (Call api)
    fetch("http://127.0.0.1:8000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify(
        {
          "email": Email,
          "password": password
        })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        // Do somthing with the token return from Server data['token'] 
        console.log(data)
        // Reset the form fields
        setEmail('');
        setPassword('');
        // Redirect to dashboard
        navigate('/main');
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });


  };
  const handleForgotPasswordSubmit = (event) => {
    window.location.href = '/forgetPassword';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Email">Email:</label>
        <input
          type="email"
          id="Email"
          value={Email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={handleForgotPasswordSubmit}>
        Forgot Password?
      </button>
    </form>
  );
};

export default Login;