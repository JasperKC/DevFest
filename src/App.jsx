import React, { useEffect } from 'react';
import './App.css'; // Ensure your custom CSS is in this file

const App = () => {
  useEffect(() => {
    // Load the widget's script files
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme/javascript/eventListWidget.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = 'https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href!=%22/public/.bedework/categories/sys/Ongoing%22)%20and%20(categories.href=%22/public/.bedework/categories/org/UniversityEvents%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&setappvar=objName(bwObject)&count=10';
    document.body.appendChild(script2);

    script2.onload = () => {
      // Once scripts are loaded, initialize the widget
      const bwJsWidgetOptions = {
        title: 'Upcoming Events',
        showTitle: true,
        displayDescription: false,
        calendarServer: 'https://events.columbia.edu',
        resourcesRoot: 'https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme',
        limitList: false,
        limit: 5,
        displayStartDateOnlyInList: true,
        displayTimeInList: true,
        displayLocationInList: false,
        listMode: 'byTitle',
        displayInNewWindow: false,
      };
      insertBwEvents('bwOutput', bwObject, bwJsWidgetOptions);
    };

    return () => {
      // Cleanup: Remove scripts when component unmounts
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

      {/* Columbia Events Widget */}
      <div id="bwOutput"></div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Columbia University</p>
      </footer>
    </div>
  );
};

export default App;
