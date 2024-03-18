import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const { token } = query.getEmailFromToken();

  useEffect(() => {
    const decodedToken = decodeURIComponent(token);

    const getEmailFromToken = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + decodedToken
          }
        });
        const data = await response.json();
        setEmail(data);
      } catch (err) {
        console.log(decodedToken);
      }
    };

    getEmailFromToken();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/password/reset", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: newPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSuccess(true);
        setSuccessMessage('The password has been changed successfully');
      })
      .catch(err => {
        console.log(err);
      });

    // Reset the form fields
    setNewPassword('');
  };

  return (
    <div>
      <h2>{token}</h2>
      {success ? (
        <div>
          <p>{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: {email}</label>
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            {error && <p>{error}</p>}
            <button type="submit">Change Password</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;