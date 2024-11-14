import React, { useState } from 'react';
import axios from 'axios';  // You can install axios with 'npm install axios'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newOwner = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      phone_number: phoneNumber,
    };

    try {
      const response = await axios.post('http://localhost:5600/api/owners', newOwner);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      // You can also redirect the user to login or dashboard here
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input 
            type="text" 
            id="phoneNumber" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
