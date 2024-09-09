import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/Login';
import Signup from './components/Signup';
import Exercises from './components/Exercises';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Users from './components/Users';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const AnimatedRoute = ({ element }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {element}
    </motion.div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user details to set the email
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} userEmail={userEmail} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/signup"
            element={<AnimatedRoute element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />}
          />
          <Route
            path="/login"
            element={<AnimatedRoute element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />} />}
          />
          <Route
            path="/exercises"
            element={<AnimatedRoute element={isAuthenticated ? <Exercises /> : <Navigate to="/login" />} />}
          />
          <Route
            path="/newuser"
            element={<AnimatedRoute element={isAuthenticated ? <CreateUser /> : <Navigate to="/login" />} />}
          />
          <Route
            path="/create"
            element={<AnimatedRoute element={isAuthenticated ? <CreateExercise /> : <Navigate to="/login" />} />}
          />
          <Route
            path="/users"
            element={<AnimatedRoute element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />}
          />
          <Route
            path="/home"
            element={<AnimatedRoute element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
