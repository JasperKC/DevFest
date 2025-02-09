import React, { useEffect, useState } from "react";

const EventsWidget = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://devfest-npjn.onrender.com/news"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const data = await response.json();
        setEvents(data?.events || []); // Ensure it safely extracts events
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div id="event-widget-container" className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🎟️ Upcoming Events
        </h2>
        <div
          className={`text-gray-700 text-lg font-semibold text-center py-4 transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {loading ? "Loading events..." : events.length > 0 ? (
            <ul className="space-y-2">
              {events.map((event, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-lg">
                  {event.title} - {new Date(event.start).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            "No upcoming events"
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsWidget;
