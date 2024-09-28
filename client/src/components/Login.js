import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import Modal from './Modal';

const Login = ({ setIsAuthenticated, setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);

      setIsAuthenticated(true);
      setUserEmail(email);
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage('Invalid data provided. Please check your input.');
      } else {
        setErrorMessage('Login failed, please check your credentials.');
      }
    }
  };

  const closeModal = () => setErrorMessage('');

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }} className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <p>Login to your account to continue</p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <Modal message={errorMessage} onClose={closeModal} />}
    </motion.div>
  );
};

export default Login;
