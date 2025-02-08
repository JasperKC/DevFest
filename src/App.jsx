import React from "react";
import "./App.css"; // Ensure your custom CSS is in this file
import Weather from "./components/weather";
import Events from "./components/events";
import Dining from "./components/dining";

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

        {/* Columbia Dining Widget */}
        <div className="widget-container" id="dining-widget-container">
          <Dining />
        </div>

        {/* News Widget */}
        {/* <div className="widget-container">
          <News />
        </div> */}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;