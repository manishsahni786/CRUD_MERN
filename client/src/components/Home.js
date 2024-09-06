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
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            animation: 'fadeInUp 1.5s ease-in-out',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          Welcome to the Home Page
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            animation: 'fadeInUp 2s ease-in-out',
            opacity: 0,
            animationDelay: '0.5s',
            animationFillMode: 'forwards',
          }}
        >
          Explore the app and create your own exercises!
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
