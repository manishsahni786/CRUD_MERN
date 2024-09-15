import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createExercise, fetchUsers } from '../services/api';  // Import the API services
import Modal from './Modal';  // Import the Modal component

const CreateExercise = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility state
  const [modalMessage, setModalMessage] = useState('');  // Modal message state
  const navigate = useNavigate();

  // Fetch the list of users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();  // Fetch the users from the API
        setUsers(usersData);  // Set users in the component state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExercise = { username, description, duration, date };
    
    try {
      await createExercise(newExercise);  // Call the API to create a new exercise

      // Show success modal
      setModalMessage('Exercise created successfully!');
      setIsModalVisible(true);

      // Optional: Auto-hide the modal after 3 seconds
      setTimeout(() => {
        setIsModalVisible(false);
        navigate('/exercises');  // Redirect to the exercises list after modal hides
      }, 3000);

    } catch (error) {
      console.error('Error adding exercise:', error);
      setModalMessage('Error creating exercise. Please try again.');  // Show error in modal
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
      <div className="create-exercise-container">
        <h2>Create New Exercise</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select value={username} onChange={(e) => setUsername(e.target.value)} required>
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Exercise</button>
        </form>

        {/* Modal for success or error message */}
        {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
      </div>
    </motion.div>
  );
};

export default CreateExercise;
