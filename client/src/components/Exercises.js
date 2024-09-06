import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button, TextField } from '@mui/material';
import axios from 'axios';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null); // To track which exercise is being edited
  const [updatedExercise, setUpdatedExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/exercises/')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Handle Update Button Click (open the form)
  const handleEditClick = (exercise) => {
    setEditingExercise(exercise._id);
    setUpdatedExercise({
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toISOString().split('T')[0] // Format date as yyyy-mm-dd
    });
  };

  // Update exercise in the backend
  const handleUpdateExercise = async (id) => {
    try {
      await axios.post(`http://localhost:5000/exercises/update/${id}`, updatedExercise);
      // Refresh exercises list after update
      const updatedExercises = await fetch('http://localhost:5000/exercises/').then(res => res.json());
      setExercises(updatedExercises);
      setEditingExercise(null); // Close the edit form
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete exercise
  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${id}`);
      setExercises(exercises.filter(exercise => exercise._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'rgb(27, 25, 25)', minHeight: '100vh', padding: '40px 0', color: 'white' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom color="white">
          Exercises
        </Typography>
        <List>
          {exercises.map(exercise => (
            <ListItem key={exercise._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {editingExercise === exercise._id ? (
                <Box component="form" sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={updatedExercise.username}
                    onChange={(e) => setUpdatedExercise({ ...updatedExercise, username: e.target.value })}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    value={updatedExercise.description}
                    onChange={(e) => setUpdatedExercise({ ...updatedExercise, description: e.target.value })}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    label="Duration (minutes)"
                    type="number"
                    value={updatedExercise.duration}
                    onChange={(e) => setUpdatedExercise({ ...updatedExercise, duration: e.target.value })}
                    sx={{ 
                      marginBottom: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', /* High contrast background */
                      color: 'white', /* High contrast text color */
                      border: '1px solid rgba(255, 255, 255, 0.5)', /* Lighter border */
                      '& .MuiInputBase-input': {
                        color: 'white' /* Ensure text color is white */
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={updatedExercise.date}
                    onChange={(e) => setUpdatedExercise({ ...updatedExercise, date: e.target.value })}
                    sx={{ 
                      marginBottom: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', /* High contrast background */
                      color: 'white', /* High contrast text color */
                      border: '1px solid rgba(255, 255, 255, 0.5)', /* Lighter border */
                      '& .MuiInputBase-input': {
                        color: 'white' /* Ensure text color is white */
                      }
                    }}
                  />
                  <Button onClick={() => handleUpdateExercise(exercise._id)} sx={{ color: 'teal', marginRight: '10px' }}>Save</Button>
                  <Button onClick={() => setEditingExercise(null)} sx={{ color: 'red' }}>Cancel</Button>
                </Box>
              ) : (
                <>
                  <ListItemText
                    primary={`${exercise.username}: ${exercise.description}`}
                    secondary={`${exercise.duration} minutes on ${new Date(exercise.date).toDateString()}`}
                    sx={{ color: 'white' }}
                  />
                  <Box>
                    <Button sx={{ color: 'teal' }} onClick={() => handleEditClick(exercise)}>Update</Button>
                    <Button sx={{ color: 'red' }} onClick={() => deleteExercise(exercise._id)}>Delete</Button>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Exercises;
