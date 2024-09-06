import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(27, 25, 25)',
        color: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <Typography variant="h6" align="center">
          Explore the app and create your own exercises!
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
