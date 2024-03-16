import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    fetch("http://127.0.0.1:8000/api/password/reset-link", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(
            {
                "email":email
            })
        })
        .then(data => {
        return data.json();
        })
        .then(data => {
        console.log(data);
        setSuccessMessage('Reset password email has been sent.');
        })
        .catch(err => {
        console.log(123123);
        });
      

    console.log('Email:', email);
    // Reset the form fields
    setEmail('');
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default ForgetPassword;