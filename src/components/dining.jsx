import React, { useState, useEffect } from "react";

const Dining = () => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/menus") // Fetch from your local API
      .then((res) => res.json())
      .then((data) => {
        setDiningHalls(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dining data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">🍽 Today's Dining Menu</h2>
      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div>
          {diningHalls.map((hall, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{hall.name}</h3>
              <p className="text-gray-600">{hall.openTime} - {hall.status}</p>
              <ul className="list-disc ml-5 mt-2">
                {hall.menu.length > 0 ? (
                  hall.menu.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>No menu available</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dining;
