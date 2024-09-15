import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';  // Import the API service

const Login = ({ setIsAuthenticated, setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser({ email, password });  // Call the API service
      localStorage.setItem('token', response.token);  // Store JWT token
      localStorage.setItem('isAuthenticated', 'true');  // Persist authentication status
      localStorage.setItem('userEmail', email);  // Persist user email

      setIsAuthenticated(true);  // Update parent component authentication state
      setUserEmail(email);  // Update parent component with user email
      navigate('/home');  // Redirect to home page
    } catch (err) {
      setError('Login failed, please check your credentials.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }} 
      transition={{ duration: 0.5 }} 
      className="auth-container"
    >
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <p>Login to your account to continue</p>
        {error && <p className="error-message">{error}</p>}  {/* Display error message */}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </motion.div>
  );
};

export default Login;
