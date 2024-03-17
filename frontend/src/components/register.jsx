import React, { useEffect, useState } from 'react';

const Register = () => {
  const [results, setResults] = useState([]);

  const types = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here, such as making an API request to validate the credentials
    
    fetch("http://127.0.0.1:8000/api/register", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(
            {
                "name":name,
                "email":email,
                "password":password,
                "confirm_password":confirmPassword,
                "type":selectedType
            })
        })
        .then(data => {
        return data.json();
        })
        .then(data => {
        console.log(data);
        })
        .catch(err => {
        console.log(err);
        });
        window.location.href = '/main';
    // Reset the form fields
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSelectedType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="Email">Email:</label>
        <input
          type="email"
          id="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          id="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <div>
      {types.map((type) => (
        <label key={type.value}>
          <input
            type="radio"
            value={type.value}
            checked={selectedType === type.value}
            onChange={handleTypeChange}
          />
          {type.label}
        </label>
      ))}
    </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;