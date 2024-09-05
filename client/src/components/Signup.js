import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgb(27, 25, 25)',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
            Signup
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: 'teal', marginTop: 2 }}>
              Signup
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
