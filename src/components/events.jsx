import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&skinName=list-json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.bwEventList && data.bwEventList.events) {
          setEvents(data.bwEventList.events.slice(0, 5)); // Show only the latest 5 events
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎟️ Upcoming Events</h2>
      {loading ? (
        <p className="text-gray-600">Loading events...</p>
      ) : (
        <ul className="space-y-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <li key={index} className="border-b pb-3">
                <a
                  href={event.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {event.summary}
                </a>
                <p className="text-gray-500 text-sm">
                  📅 {event.start.longdate} {event.start.time && `• 🕒 ${event.start.time}`}
                </p>
                {event.location && event.location.address && (
                  <p className="text-gray-600 text-sm">📍 {event.location.address}</p>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No upcoming events found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Events;
