import React, { useState, useEffect } from "react";

const DiningWidget = () => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://devfest-npjn.onrender.com") // Replace with your actual API URL
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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🍽 Columbia Dining Menus</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading menu...</p>
      ) : (
        <div className="space-y-6">
          {diningHalls.map((hall, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              {/* Dining Hall Name & Status */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{hall.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    hall.status === "OPEN"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {hall.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{hall.openTime}</p>

              {/* Menu Items in Grid Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                {hall.menu.length > 0 ? (
                  hall.menu.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-2 rounded-md text-sm text-center"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No menu available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiningWidget;
