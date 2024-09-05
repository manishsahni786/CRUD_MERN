import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/create">CreateExercise</Link>
      </div>
      <div className="auth-buttons">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
