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
    <div style={{
      //backgroundColor: "#1E3A8A",
      padding: "20px",
      //borderRadius: "10px",
      //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      color: "white",
      textAlign: "center"
    }}>
      <h2 style={{
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
      }}>
        📰 Latest News
      </h2>
      
      {loading ? (
        <p style={{ color: "#d1d5db" }}>Loading news...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {news.map((article, index) => (
            <div key={index} style={{ borderBottom: "1px solid #3B82F6", paddingBottom: "12px" }}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#FFD700",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                {article.headline}
              </a>
              <p style={{ fontSize: "0.9rem", color: "#d1d5db", marginTop: "4px", textAlign: "center" }}>
                {article.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
