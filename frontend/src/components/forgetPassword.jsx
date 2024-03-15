import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here, such as making an API request to validate the credentials

    
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
    </div>
  );
};

export default ForgetPassword;