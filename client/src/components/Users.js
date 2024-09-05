import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
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
          Users
        </Typography>
        <List>
          {users.map(user => (
            <ListItem key={user._id}>
              <ListItemText primary={user.username} sx={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Users;
