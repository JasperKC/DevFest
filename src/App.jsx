import React from "react";
import "./App.css"; // Ensure your custom CSS is in this file
import Weather from "./components/Weather";
import Events from "./components/Events";

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      {/* Weather Widget */}
      <Weather />

      {/* Columbia Events Widget */}
      <Events />

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;