import React, { useEffect } from "react";

const Events = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadEvents = async () => {
      try {
        await loadScript("https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme/javascript/eventListWidget.js");
        await loadScript("https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&skinName=json&setappvar=objName(bwObject)&count=5");

        if (typeof insertBwEvents === "function" && typeof bwObject !== "undefined") {
          const bwJsWidgetOptions = {
            title: "🎟️ Upcoming Events",
            showTitle: true,
            displayDescription: false,
            calendarServer: "https://events.columbia.edu",
            resourcesRoot:
              "https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme",
            limitList: true,
            limit: 5,
            displayStartDateOnlyInList: true,
            displayTimeInList: true,
            displayLocationInList: true,
            listMode: "byTitle",
            displayInNewWindow: true,
          };

          insertBwEvents("bwOutput", bwObject, bwJsWidgetOptions);
        } else {
          console.error("❌ insertBwEvents function not found or bwObject is undefined.");
        }
      } catch (error) {
        console.error("❌ Error loading event scripts:", error);
      }
    };

    loadEvents();

    return () => {
      document.querySelectorAll("script").forEach((script) => {
        if (script.src.includes("events.columbia.edu")) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎟️ Upcoming Events</h2>
      <div id="bwOutput" className="text-gray-700">Loading events...</div>
    </div>
  );
};

export default Events;
