import React from "react";
import DbCard from "./hrdbCard";

function Dashboard() {
  return (
    <div className="row">
      <DbCard
        title="Total Things"
        value="3"
        iconClass="bi-calendar-x"
        duration="Today"
      />
      <DbCard
        title="Common"
        value="500,0000"
        iconClass="bi-coin"
        duration="Monthly"
      />
    </div>
  );
}

export default Dashboard;
