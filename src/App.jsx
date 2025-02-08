import React from "react";
import "./App.css"; // Ensure your custom CSS is in this file
import Weather from "./components/weather";
import Events from "./components/events";

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      <div className="content-container">
        {/* Weather Widget */}
        <div className="widget-container">
          <Weather />
        </div>

        {/* Columbia Events Widget */}
        <div className="widget-container" id="event-widget-container">
          <Events />
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;