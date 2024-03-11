import React from "react";
import DbCard from "./hrdbCard";

function FinanceDashboard() {
  return (
    <div className="row">
      <DbCard
        title="Total Things"
        value=""
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

export default FinanceDashboard;
