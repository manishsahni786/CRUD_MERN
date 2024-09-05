import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/exercises/')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(27, 25, 25)',
        minHeight: '100vh',
        padding: '40px 0',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom color="white">
          Exercises
        </Typography>
        <List>
          {exercises.map(exercise => (
            <ListItem key={exercise._id}>
              <ListItemText
                primary={`${exercise.username}: ${exercise.description}`}
                secondary={`${exercise.duration} minutes on ${new Date(exercise.date).toDateString()}`}
                sx={{ color: 'white' }}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Exercises;
