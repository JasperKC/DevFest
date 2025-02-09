
import React, { useState, useEffect } from "react";

const Dining = () => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://devfest-npjn.onrender.com/dining")
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🍽 Columbia Dining Menu</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading menu...</p>
        ) : (
          <div className="space-y-8">
            {diningHalls.map((hall, index) => (
              <div key={index} className="p-6 border-b border-gray-300">
                {/* Dining Hall Name & Status */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold text-gray-800">{hall.name}</h3>
                  <span
                    className={`px-4 py-1 rounded-full text-lg font-bold ${
                      hall.status === "OPEN"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {hall.status}
                  </span>
                </div>
                <p className="text-gray-600 text-lg">{hall.openTime}</p>

                {/* Menu Items in a Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {hall.menu.length > 0 ? (
                    hall.menu.map((item, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-3 rounded-md text-lg text-center shadow-sm border border-gray-200"
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
    </div>
  );
};

export default Dining;
