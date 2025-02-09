import React, { useEffect } from "react";

const Events = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src =
      "https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme/javascript/eventListWidget.js";
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&skinName=json&setappvar=objName(bwObject)&count=5";
    document.body.appendChild(script2);

    script2.onload = () => {
      if (typeof insertBwEvents === "function") {
        const bwJsWidgetOptions = {
          title: "🎟️ Upcoming Events",
          showTitle: true,
          displayDescription: false,
          calendarServer: "https://events.columbia.edu",
          resourcesRoot:
            "https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme",
          limitList: true,
          limit: 5, // Show only 5 events
          displayStartDateOnlyInList: true,
          displayTimeInList: true,
          displayLocationInList: true,
          listMode: "byTitle",
          displayInNewWindow: true,
        };
        insertBwEvents("bwOutput", bwObject, bwJsWidgetOptions);
      } else {
        console.error("❌ insertBwEvents function not found.");
      }
    };

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎟️ Upcoming Events</h2>
      <div id="bwOutput" className="text-gray-700"></div>
    </div>
  );
};

export default Events;
