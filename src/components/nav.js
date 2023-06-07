import React, { useState } from 'react';
import SignInForm from './SignInForm';
import './nav.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="toggle-icon"></span>
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
            <SignInForm />
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/account">Account Details</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;