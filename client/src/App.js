import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Exercises from './components/Exercises';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Users from './components/Users';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/newuser" element={<CreateUser />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/users" element={<Users />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
