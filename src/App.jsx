import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';  // Make sure you install Papa Parse

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL for fetching event data in CSV format
    const eventsURL = 'https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href!=%22/public/.bedework/categories/sys/Ongoing%22)%20and%20(categories.href=%22/public/.bedework/categories/org/UniversityEvents%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-csv&count=50';
    
    // Using CORS proxy to bypass CORS restriction
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

    // Fetch the CSV data
    fetch(CORS_PROXY + eventsURL)
      .then(response => response.text())
      .then(csvText => {
        // Parse the CSV data
        Papa.parse(csvText, {
          header: true,  // Use headers in CSV to map the values
          skipEmptyLines: true,  // Skip empty lines
          complete: (result) => {
            setEvents(result.data);  // Set the events data
            setLoading(false);  // Turn off the loading state
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      {loading ? (
        <div className="loading-message">Loading events...</div>
      ) : (
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="event-card">
                <h2>{event.summary}</h2> {/* Event title */}
                <p><strong>Date:</strong> {event.startlongdate}</p> {/* Full date */}
                <p><strong>Time:</strong> {event.starttime}</p> {/* Event time */}
                <p><strong>Location:</strong> {event.locationaddress}</p> {/* Location address */}
                {event.locationlink && (
                  <p><a href={event.locationlink} target="_blank" rel="noopener noreferrer">View on map</a></p> 
                )}
                {event.eventlink ? (
                  <p><a href={event.eventlink} target="_blank" rel="noopener noreferrer">More Info</a></p>
                ) : (
                  <p>No additional info</p>
                )}
              </div>
            ))
          ) : (
            <div>No events available at the moment.</div>
          )}
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;
