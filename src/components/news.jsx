import React, { useState, useEffect } from "react";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://devfest-npjn.onrender.com/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">📰 Latest News</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <ul className="list-disc ml-5">
          {news.map((article, index) => (
            <li key={index} className="mb-2">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {article.headline}
              </a>
              <span className="text-gray-500 text-sm"> - {article.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;