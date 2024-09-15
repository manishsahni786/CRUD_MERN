import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const Exercises = () => {
  const [exercises, setExercises] = useState({});
  const [editingExercise, setEditingExercise] = useState(null);
  const [updatedExercise, setUpdatedExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: ''
  });
  const [expandedUser, setExpandedUser] = useState(null); // State to manage expanded user
  const exercise_API = process.env.REACT_APP_ALL_EXERCISES;

  useEffect(() => {
    fetch(exercise_API)
      .then(response => response.json())
      .then(data => {
        const groupedExercises = data.reduce((acc, exercise) => {
          if (!acc[exercise.username]) {
            acc[exercise.username] = [];
          }
          acc[exercise.username].push(exercise);
          return acc;
        }, {});
        setExercises(groupedExercises);
      })
      .catch(error => console.error('Error:', error));
  }, [exercise_API]);

  const handleEditClick = (exercise) => {
    setEditingExercise(exercise._id);
    setUpdatedExercise({
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toISOString().split('T')[0]
    });
  };

  const handleUpdateExercise = async (id) => {
    try {
      await axios.put(`http://localhost:5000/exercises/update/${id}`, updatedExercise);
      const updatedExercises = await fetch('http://localhost:5000/exercises/').then(res => res.json());
      const groupedExercises = updatedExercises.reduce((acc, exercise) => {
        if (!acc[exercise.username]) {
          acc[exercise.username] = [];
        }
        acc[exercise.username].push(exercise);
        return acc;
      }, {});
      setExercises(groupedExercises);
      setEditingExercise(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${id}`);
      
      // Update the exercises state by filtering out the deleted exercise
      const updatedExercises = Object.keys(exercises).reduce((acc, username) => {
        acc[username] = exercises[username].filter(exercise => exercise._id !== id);
        // Only add the user to the result if they still have exercises
        if (acc[username].length > 0) {
          return acc;
        }
        return acc;
      }, {});
      
      setExercises(updatedExercises);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUserClick = (username) => {
    setExpandedUser(expandedUser === username ? null : username);
  };

  return (
    <Box sx={{ backgroundColor: 'rgb(27, 25, 25)', minHeight: '100vh', padding: '40px 0', color: 'white' }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom color="white">
          Exercises
        </Typography>
        <List>
          {Object.keys(exercises).map(username => (
            <Box key={username} sx={{ marginBottom: '30px' }}>
              <Typography
                variant="h6"
                color="white"
                sx={{ marginBottom: '20px', cursor: 'pointer', fontSize: '1.25rem' }}
                onClick={() => handleUserClick(username)}
              >
                {username}
              </Typography>
              {expandedUser === username && (
                <List>
                  {exercises[username].map(exercise => (
                    <motion.div
                      key={exercise._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        {editingExercise === exercise._id ? (
                          <Box component="form" sx={{ width: '100%' }}>
                            <TextField
                              fullWidth
                              label="Username"
                              placeholder="Enter username"
                              value={updatedExercise.username}
                              onChange={(e) => setUpdatedExercise({ ...updatedExercise, username: e.target.value })}
                              sx={{
                                marginBottom: '10px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: '1px solid teal',
                                '& .MuiInputBase-input': {
                                  color: 'white'
                                },
                                '& .MuiFormLabel-root': {
                                  color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'teal',
                                  },
                                }
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Description"
                              placeholder="Enter description"
                              value={updatedExercise.description}
                              onChange={(e) => setUpdatedExercise({ ...updatedExercise, description: e.target.value })}
                              sx={{
                                marginBottom: '10px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: '1px solid teal',
                                '& .MuiInputBase-input': {
                                  color: 'white'
                                },
                                '& .MuiFormLabel-root': {
                                  color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'teal',
                                  },
                                }
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Duration (minutes)"
                              type="number"
                              placeholder="Enter duration"
                              value={updatedExercise.duration}
                              onChange={(e) => setUpdatedExercise({ ...updatedExercise, duration: e.target.value })}
                              sx={{
                                marginBottom: '10px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: '1px solid teal',
                                '& .MuiInputBase-input': {
                                  color: 'white'
                                },
                                '& .MuiFormLabel-root': {
                                  color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'teal',
                                  },
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
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: '1px solid teal',
                                '& .MuiInputBase-input': {
                                  color: 'white'
                                },
                                '& .MuiFormLabel-root': {
                                  color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'teal',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'teal',
                                  },
                                }
                              }}
                            />
                            <Button onClick={() => handleUpdateExercise(exercise._id)} sx={{ color: 'teal', marginRight: '10px' }}>Save</Button>
                            <Button onClick={() => setEditingExercise(null)} sx={{ color: 'red' }}>Cancel</Button>
                          </Box>
                        ) : (
                          <>
                           <ListItemText
                              primary={`${exercise.description}`} // Show the exercise description (or name)
                              secondary={`${exercise.duration} minutes on ${new Date(exercise.date).toDateString()}`}
                              sx={{ color: 'white', fontSize: '0.875rem' }}
                            />

                            <Box>
                              <Button sx={{ color: 'teal', fontSize: '0.875rem' }} onClick={() => handleEditClick(exercise)}>Update</Button>
                              <Button sx={{ color: 'red', fontSize: '0.875rem' }} onClick={() => deleteExercise(exercise._id)}>Delete</Button>
                            </Box>
                          </>
                        )}
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              )}
            </Box>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Exercises;
