import React from "react";
import "./App.css"; // Make sure this is included
import Weather from "./components/weather";
import Events from "./components/events";
import Dining from "./components/dining";
import News from "./components/news";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav>
        <div className="max-w-5xl mx-auto">
          <h1>🦁 LionPulse</h1>
          <p className="nav-subtext">Columbia Campus Updates</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather & Events Side-by-Side */}
          <div className="widget-container">
            <Weather />
          </div>
          <div className="widget-container">
            <Events />
          </div>

          {/* Dining Menu Spans Full Width */}
          <div className="widget-container dining-widget md:col-span-2">
            <Dining />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;
