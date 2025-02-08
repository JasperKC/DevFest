import React, { useState, useEffect } from 'react';
import { getColumbiaSpectatorHeadlines, getBarnardBulletinHeadlines } from './newsScraper';

function NewsComponent() {
  const [spectatorHeadlines, setSpectatorHeadlines] = useState([]);
  const [bulletinHeadlines, setBulletinHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHeadlines() {
      try {
        const spectator = await getColumbiaSpectatorHeadlines();
        const bulletin = await getBarnardBulletinHeadlines();
        setSpectatorHeadlines(spectator);
        setBulletinHeadlines(bulletin);
      } catch (err) {
        setError(err);
        console.error("Error fetching headlines:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHeadlines();
  }, []);

  if (loading) {
    return <div>Loading headlines...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Columbia Spectator Headlines</h2>
      <ul>
        {spectatorHeadlines.map((headline, index) => (
          <li key={index}>{headline}</li>
        ))}
      </ul>

      <h2>Barnard Bulletin Headlines</h2>
      <ul>
        {bulletinHeadlines.map((headline, index) => (
          <li key={index}>{headline}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewsComponent;