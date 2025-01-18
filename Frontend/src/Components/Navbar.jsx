import React from 'react';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Signup Form</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/table">User Table</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;