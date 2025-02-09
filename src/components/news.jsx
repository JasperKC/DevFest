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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📰 Latest News</h2>
      {loading ? (
        <p className="text-gray-600">Loading news...</p>
      ) : (
        <div className="space-y-4">
          {news.map((article, index) => (
            <div key={index} className="border-b pb-4">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-yellow-400 hover:underline"
              >
                {article.headline}
              </a>
              <p className="text-sm text-gray-300">{article.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;