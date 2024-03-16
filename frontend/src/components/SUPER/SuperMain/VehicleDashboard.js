import React from "react";
import DbCard from "./VehicleDbCard";

function VehicleDashboard() {
  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard
            title="Total Employees"
            value="30"
            iconClass="bi-people-fill"
          />
          <DbCard
            title="Total Leaves"
            value="3"
            iconClass="bi-calendar-x"
            duration="Today"
          />
          <DbCard
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

export default VehicleDashboard;
