import React, { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    // Add the external script to load the widget
    const script1 = document.createElement('script');
    script1.src = "https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme/javascript/eventListWidget.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href!=%22/public/.bedework/categories/sys/Ongoing%22)%20and%20(categories.href=%22/public/.bedework/categories/org/UniversityEvents%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&setappvar=objName(bwObject)&count=50";
    script2.async = true;
    document.body.appendChild(script2);

    script2.onload = () => {
      const bwJsWidgetOptions = {
        title: "Upcoming Events",
        showTitle: true,
        displayDescription: false,
        calendarServer: "https://events.columbia.edu",
        resourcesRoot: "https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme",
        limitList: false,
        limit: 5,
        displayStartDateOnlyInList: true,
        displayTimeInList: true,
        displayLocationInList: false,
        listMode: "byTitle",
        displayInNewWindow: false,
      };
      // Initialize the widget
      insertBwEvents("bwOutput", bwObject, bwJsWidgetOptions);
    };

    // Clean up the scripts when the component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>LionPulse</h1>
        <p>Stay up to date with what's happening around Columbia Campus</p>
      </header>

      {/* The div where the widget will be inserted */}
      <div id="bwOutput"></div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;
