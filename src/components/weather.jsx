import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "13b82388859c1cf0d6f5ca9f6837c61c"; // OpenWeather API Key
const CITY = "New York";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=imperial&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-widget">
      <h2>Weather in {CITY}</h2>
      {weather ? (
        <div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
            width="80"
          />
          <p>
            {weather.main.temp}°F - {weather.weather[0].description}
          </p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;