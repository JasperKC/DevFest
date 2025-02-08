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
      "https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(((vpath=%22/public/aliases/Type/Career%20Fair%22)%20or%20(vpath=%22/public/aliases/Type/Open%20House%22)%20or%20(vpath=%22/public/aliases/Type/Panel%22)%20or%20(vpath=%22/public/aliases/Type/Seminar%22)%20or%20(vpath=%22/public/aliases/Type/Sports%22)%20or%20(vpath=%22/public/aliases/Type/Theater%22)%20or%20(vpath=%22/public/aliases/Type/Workshop%22)%20or%20(vpath=%22/public/aliases/Type/Discussion%22)%20or%20(vpath=%22/public/aliases/Type/Cultural%22)%20or%20(vpath=%22/public/aliases/Type/Conference%22)))%20and%20(categories.href=%22/public/.bedework/categories/org/UniversityEvents%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&setappvar=objName(bwObject)&count=5";
    document.body.appendChild(script2);

    script2.onload = () => {
      const bwJsWidgetOptions = {
        title: "Upcoming Events",
        showTitle: true,
        displayDescription: false,
        calendarServer: "https://events.columbia.edu",
        resourcesRoot:
          "https://events.columbia.edu/3.10/calfeedrsrc.MainCampus/default/default/theme",
        limitList: false,
        limit: 5,
        displayStartDateOnlyInList: true,
        displayTimeInList: true,
        displayLocationInList: false,
        listMode: "byTitle",
        displayInNewWindow: false,
      };
      insertBwEvents("bwOutput", bwObject, bwJsWidgetOptions);
    };

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return <div id="bwOutput"></div>;
};

export default Events;
