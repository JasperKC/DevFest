import React from "react";
import "./App.css"; // Make sure this has Tailwind or custom styles
import Weather from "./components/weather";
import Events from "./components/events";
import Dining from "./components/dining";
import News from "./components/news";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">🦁 LionPulse</h1>
          <p className="text-sm">Columbia Campus Updates</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather & Events Side-by-Side */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Weather />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Events />
          </div>

          {/* Dining Menu Spans Full Width */}
          <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
            <Dining />
          </div>
        </div>

        {/* News Widget */}
        <div className="widget-container">
          <News />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-4">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;
