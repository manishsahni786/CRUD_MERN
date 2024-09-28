import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUser } from '../services/api';  
import Modal from './Modal';  

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [modalMessage, setModalMessage] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username) {
      setModalMessage('Username is required.');  
      setIsModalVisible(true);
      return;
    }

    try {
      await createUser({ username });  
      setUsername('');  

      setModalMessage('User created successfully!');
      setIsModalVisible(true);

      setTimeout(() => setIsModalVisible(false), 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMessage('Invalid data provided. Please check your input.');
      } else {
        setModalMessage('Error creating user. Please try again.');
      }
      setIsModalVisible(true);
      setTimeout(() => setIsModalVisible(false), 3000);
    }
  };

  const closeModal = () => setIsModalVisible(false);  

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="create-user-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Add User</button>
        </form>
        
        {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
      </div>
    </motion.div>
  );
};

export default CreateUser;
