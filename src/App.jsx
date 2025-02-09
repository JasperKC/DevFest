import React from "react";
import "./App.css";
import Weather from "./components/weather";
import Events from "./components/events";
import Dining from "./components/dining";
import News from "./components/news";

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="weather-icon-container"> {/* Container for smaller weather icon */}
          <Weather isIcon={true} /> {/* Pass prop to Weather component */}
        </div>
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      <div className="content-container">
        <div className="widget-container">
          <Events />
        </div>
        <div className="widget-container">
          <Dining />
        </div>
        <div className="widget-container">
          <News />
        </div>
      </div>

      <footer className="footer">
        <p>{new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;