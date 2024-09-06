import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({ username: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleOpenForm = (user = null) => {
    if (user) {
      setIsUpdating(true);
      setSelectedUserId(user._id);
      setFormData({ username: user.username });
    } else {
      setIsUpdating(false);
      setFormData({ username: '' });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ username: '' });
    setSelectedUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) {
      try {
        await axios.put(`http://localhost:5000/users/${selectedUserId}`, formData);
        setUsers(users.map(user => (user._id === selectedUserId ? { ...user, ...formData } : user)));
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/users/add', formData);
        setUsers([...users, { ...formData, _id: response.data._id }]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    handleCloseForm();
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      sx={{ backgroundColor: 'rgb(27, 25, 25)', minHeight: '100vh', padding: '40px 0', color: 'white' }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom color="white">
          Users
        </Typography>
        <List>
          {users.map(user => (
            <ListItem key={user._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={user.username} sx={{ color: 'white' }} />
              <Box>
                <Button sx={{ color: 'teal' }} onClick={() => handleOpenForm(user)}>Update</Button>
                <Button sx={{ color: 'red' }} onClick={() => deleteUser(user._id)}>Delete</Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>

      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>{isUpdating ? 'Update User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={formData.username}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit}>{isUpdating ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Users;
