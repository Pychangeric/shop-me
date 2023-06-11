import React, { useState } from "react";
import "./App.css";
import Home from "./components/home";
import About from "./components/about";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleColorMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : "bright-mode"}`}>
      <div className="color-mode-toggle">
        <button onClick={toggleColorMode}>
          {darkMode ? "Bright Mode" : "Dark Mode"}
        </button>
      </div>
      <Home />
      <About />
    </div>
  );
}

export default App;