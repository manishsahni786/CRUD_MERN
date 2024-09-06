import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // To handle navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/add', { username });
      onUserAdded({ username, _id: response.data._id });
      setUsername('');

      // Show success message
      window.alert('User created successfully!');

      // Navigate to /users route
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
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
    </div>
  );
};

export default CreateUser;
