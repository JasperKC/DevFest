import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import './LionPulse.css';

const eventsData = [
  { title: 'Columbia Basketball Game', time: '6:00 PM', location: 'Lerner Hall', description: 'Come support the Lions!' },
  { title: 'Math Club Speaker Event', time: '4:00 PM', location: 'Math Building', description: 'A guest speaker discussing complex analysis.' },
  { title: 'Sustainable Fashion Show', time: '7:00 PM', location: 'Low Library', description: 'Highlighting eco-friendly designers.' },
  // Add more events here
];

const LionPulse = () => {
  const [events, setEvents] = useState(eventsData);

  // Optionally, you can fetch real data or update the event list dynamically.
  useEffect(() => {
    // Fetch or update event data
  }, []);

  return (
    <div className="lionpulse-container">
      <header className="header">
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h2>{event.title}</h2>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default LionPulse;
