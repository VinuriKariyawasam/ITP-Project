import React from "react";
import CAM_dbCard from "./CAM_dbcard";

function CAM_dashboard() {
  return (
    <section>
      <div className="col">
        <div className="row">
          <CAM_dbCard
            title="Total Questions"
            value="+10"
            iconClass="bi-people-fill"
            duration="Today"
          />
          <CAM_dbCard
            title="FeedBack"
            value="+100"
            iconClass="bi bi-card-checklist"
            duration="Today"
          />
          <CAM_dbCard
            title="General Reports"
            value="2"
            iconClass="bi bi-clipboard2-data"
            duration="Monthly"
          />
        </div>
      </div>
    </section>
  );
}

export default CAM_dashboard;