import React from "react";
import DbCard from "./SuperDbCard";

function SuperDashboard() {
  
  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard
            title="Service Requests"
            value="3"
            iconClass="bi-calendar-x"
            duration="Today"
          />
          <DbCard
            title="Vehicles"
            value="50"
            iconClass="bi-coin"
            duration="Monthly"
          />
        </div>
      </div>
    </section>
  );
}

export default SuperDashboard;