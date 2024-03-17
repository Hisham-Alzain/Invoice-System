import React, { useEffect, useState } from 'react';


const Login = () => {
  const [results, setResults] = useState([])

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
    // Perform login logic here, such as making an API request to validate the credentials

    
    fetch("http://127.0.0.1:8000/api/login", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(
            {
                "email":Email,
                "password":password
            })
        })
        .then(data => {
        return data.json();
        })
        .then(data => {
        console.log(data);
        })
        .catch(err => {
        console.log(123123);
        });
      

    console.log('Email:', Email);
    console.log('Password:', password);
    window.location.href = '/main';
    // Reset the form fields
    setEmail('');
    setPassword('');
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