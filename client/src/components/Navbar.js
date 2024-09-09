import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout, userEmail }) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/newuser">CreateUser</Link>
        <Link to="/create">CreateExercise</Link>
      </div>
      <div className="auth-buttons">
        {isAuthenticated && userEmail && (
          <span className="user-email">{userEmail}</span>
        )}
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button">Signup</Link>
          </>
        ) : (
          <button onClick={onLogout} className="nav-button">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
