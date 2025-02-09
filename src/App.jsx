import React from "react";
import "./App.css"; // Ensure your custom CSS is in this file
import Weather from "./components/weather";
import Events from "./components/events";
import Dining from "./components/dining";
import News from "./components/news";

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      <div className="content-container">
        {/* Weather Widget - Moved to top right */}
        <div className="weather-container">
          <Weather />
        </div>

        <div className="widgets-grid">
          {/* Events Widget (Scrollable) */}
          <div className="widget-container" id="event-widget-container">
            <Events />
          </div>

          {/* Dining Widget (Scrollable) */}
          <div className="widget-container" id="dining-widget-container">
            <Dining />
          </div>

          {/* News Widget (Scrollable) */}
          <div className="widget-container" id="news-widget-container">
            <News />
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>{new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;