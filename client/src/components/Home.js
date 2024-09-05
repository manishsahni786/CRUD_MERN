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
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" color="white" align="center">
          Welcome to the Home Page
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
