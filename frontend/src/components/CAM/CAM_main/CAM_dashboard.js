import React from "react";
import CAM_dbCard from "./CAM_dbcard";

function CAM_dashboard() {
  return (
    <section>
      <div className="col">
        <div className="row">
          <CAM_dbCard
            title="Total Employees"
            value="30"
            iconClass="bi-people-fill"
          />
          <CAM_dbCard
            title="Total Leaves"
            value="3"
            iconClass="bi-calendar-x"
            duration="Today"
          />
          <CAM_dbCard
            title="Total Salaries"
            value="500,0000"
            iconClass="bi-coin"
            duration="Monthly"
          />
        </div>
      </div>
    </section>
  );
}

export default CAM_dashboard;