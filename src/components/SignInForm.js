import React, { useState } from "react";
import "./sign.css";

const SignInForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState("");

  const handleSignInClick = () => {
    setShowDropdown(true);
  };

  const handleCloseClick = () => {
    setShowDropdown(false);
  };

  const handleDropdownSubmit = (e) => {
    e.preventDefault();

    // Perform backend API call to store user data
    fetch("http://localhost:9292/users", {
      method: "POST",
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Handle successful sign-in and data submission
          setShowNotification(true);
          setTimeout(() => {
            setShowDropdown(false);
            setShowNotification(false);
          }, 3000); // Delay to hide the dropdown and notification after 3 seconds
        } else {
          // Handle sign-in error
          setError(data.message);
        }
      })
      .catch((error) => {
        // Handle sign-in error
        setError("An error occurred during sign-in.");
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handleSignInClick}>Sign In</button>

      {showDropdown && (
        <div className="dropdown">
          <button className="close-button" onClick={handleCloseClick}>
            Close
          </button>
          <h2>Sign In</h2>
          <form onSubmit={handleDropdownSubmit}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}

      {showNotification && (
        <div className="notification">
          Congratulations! You have successfully created your account.
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInForm;
