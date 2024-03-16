import React, { useState } from 'react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Extract email from the token in the component's initial render
    const { token } = match.params;
    const decodedToken = decodeURIComponent(token);
    const emailFromToken = getEmailFromToken(decodedToken);
    setEmail(emailFromToken);
  }, [match.params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/password/reset", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(
            {
                "email":email,
                "password":newPassword
            })
        })
        .then(data => {
        return data.json();
        })
        .then(data => {
        console.log(data);
        setSuccess(true);
        setSuccessMessage('The password has been changed successfully');
        })
        .catch(err => {
        console.log(err);
        });
      

    console.log('Email:', email);
    // Reset the form fields
    setEmail('');
  };

  return (
    <div>
      <h2>Change Password</h2>
      {success ? (
        <div>
          <p>Your password has been changed successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
         
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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