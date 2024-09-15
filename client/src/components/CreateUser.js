import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUser } from '../services/api';  // Import the API service
import Modal from './Modal';  // Import the Modal component

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility state
  const [modalMessage, setModalMessage] = useState('');  // Modal message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createUser({ username });  // Call the API service
      setUsername('');  // Clear input field

      // Show success modal
      setModalMessage('User created successfully!');
      setIsModalVisible(true);

      // Optional: Auto-hide the modal after 3 seconds
      setTimeout(() => setIsModalVisible(false), 3000);

    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error creating user. Please try again.');  // Show error in modal
      setIsModalVisible(true);

      // Auto-hide the modal after 3 seconds
      setTimeout(() => setIsModalVisible(false), 3000);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);  // Close the modal manually
  };

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
        
        {/* Modal for success or error message */}
        {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
      </div>
    </motion.div>
  );
};

export default CreateUser;
