import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createUser } from '../services/api';  // Import the API service

const CreateUser = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newUser = await createUser({ username });  // Call the API service
      onUserAdded({ username, _id: newUser._id });
      setUsername('');
      window.alert('User created successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
      <div className="create-user-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateUser;
