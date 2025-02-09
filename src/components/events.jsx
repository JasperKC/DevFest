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
      "https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(((vpath=%22/public/aliases/Type/Career%20Fair%22)%20or%20(vpath=%22/public/aliases/Type/Open%20House%22)%20or%20(vpath=%22/public/aliases/Type/Panel%22)%20or%20(vpath=%22/public/aliases/Type/Seminar%22)%20or%20(vpath=%22/public/aliases/Type/Sports%22)%20or%20(vpath=%22/public/aliases/Type/Theater%22)%20or%20(vpath=%22/public/aliases/Type/Workshop%22)%20or%20(vpath=%22/public/aliases/Type/Discussion%22)%20or%20(vpath=%22/public/aliases/Type/Cultural%22)%20or%20(vpath=%22/public/aliases/Type/Conference%22)))%20and%20(categories.href=%22/public/.bedework/categories/org/UniversityEvents%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&setappvar=objName(bwObject)&count=200";
    document.body.appendChild(script2);

    script2.onload = () => {
      const bwJsWidgetOptions = {
        title: "🎟️ Upcoming Events",
        showTitle: false,
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

      // Apply styles to fix text color
      setTimeout(() => {
        const links = document.querySelectorAll("#bwOutput a");
        links.forEach((link) => {
          link.style.color = "#FFD700"; // yellow link color
          link.style.fontWeight = "600"; // Make bolder
          link.style.textDecoration = "underline";
        });

        const eventItems = document.querySelectorAll("#bwOutput li");
        eventItems.forEach((item) => {
          item.style.marginBottom = "1rem"; // Add spacing between events
          item.style.listStyleType = "none"; // Remove bullet points
        });
      }, 500);
    };

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="bg-[#2357a4] p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="mr-2">🎟️</span> Upcoming Events
      </h2>
      <div id="bwOutput" className="text-white"></div>
    </div>
  );
};

export default Events;