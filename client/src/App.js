import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Exercises from './components/Exercises';
import Users from './components/Users';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CreateExercise from './components/CreateExercise';
import './App.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/exercise" element={<Exercises />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/users" element={<Users />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
