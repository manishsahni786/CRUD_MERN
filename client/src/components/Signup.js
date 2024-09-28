import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signupUser } from '../services/api';
import Modal from './Modal';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await signupUser({ username, email, password });
      navigate('/login');
    } catch (err) {
      // If there is a validation error (status 400), show a short message
      if (err.response && err.response.status === 400) {
        setErrorMessage('Invalid data provided. Please check your input.');
      } else {
        setErrorMessage(err.response ? err.response.data : 'Signup failed');
      }
    }
  };

  const closeModal = () => setErrorMessage('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }} 
      transition={{ duration: 0.5 }} 
      className="auth-container"
    >
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Signup</h2>
        <p>Create a new account</p>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
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
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
          required 
        />
        <button type="submit">Signup</button>
      </form>
      {errorMessage && <Modal message={errorMessage} onClose={closeModal} />}
    </motion.div>
  );
};

export default Signup;
