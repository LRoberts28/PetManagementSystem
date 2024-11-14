import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Change from useHistory to useNavigate
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Replace history with navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:5600/api/login', loginData);
      // Handle successful login here (e.g., store JWT in localStorage)
      setErrorMessage('');
      navigate('/pets');  // Use navigate() instead of history.push()
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/register');  // Use navigate() instead of history.push()
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUpRedirect}>Sign Up</button>
    </div>
  );
};

export default LoginForm;
