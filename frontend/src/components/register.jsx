import React, { useEffect, useState,useContext } from 'react';
import './css/Register.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';

const Register = () => {
  const [results, setResults] = useState([]);

  const types = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [errorMessage,setErrorMessages]=useState([]);

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
        .then((response) => {
          
            return response.json();
        })
        .then((data) => {
          if(data.errors){
            console.log(data.errors);
            setErrorMessages(Object.values(data.errors)); // Update this line
            throw new Error(response.status);
          }
          // Do somthing with the token return from Server data['token'] 
          console.log(data)
          // Reset the form fields
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setName('');
          setSelectedType('')
          // Redirect to dashboard
          navigate('/login');
        })
        .catch(error => {
          // Handle errors
          console.log(error);
        });
  
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
    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditional rendering of error message */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;