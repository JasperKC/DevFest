import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CSV URL
    const eventsURL = 'https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href!=%22/public/.bedework/categories/sys/Ongoing%22)%20and%20(categories.href=%22/public/.bedework/categories/org/UniversityEvents%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-csv&count=50';

    // Fetch the CSV data
    fetch(eventsURL)
      .then((response) => response.text()) // Get the response as text (CSV format)
      .then((csvText) => {
        // Parse the CSV text into JSON
        Papa.parse(csvText, {
          header: true,  // Treat first row as headers
          skipEmptyLines: true,  // Skip empty lines
          complete: (result) => {
            setEvents(result.data); // Set parsed data into events
            setLoading(false); // Stop loading once data is fetched
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false); // Stop loading in case of error
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
        setLoading(false); // Stop loading in case of error
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
                <p><strong>Date:</strong> {event.startlongdate}</p> {/* Full start date */}
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
