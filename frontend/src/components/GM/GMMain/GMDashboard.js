import React from "react";
import DbCard from "./GMdbCard";

function Dashboard() {
  return (
    <div className="row">
      <DbCard
        title="No of vehicles available"
        value="6"
        iconClass="bi bi-car-front"
        duration="Today"
      />
      <DbCard
        title=" No of Employees"
        value="8"
        iconClass="bi bi-person-check"
        duration="Today"
      />
      <DbCard
        title="Today current Income"
        value="500000"
        iconClass="bi bi-currency-exchange"
        duration="Today"
      />
    </div>
  );
}

export default Dashboard;
