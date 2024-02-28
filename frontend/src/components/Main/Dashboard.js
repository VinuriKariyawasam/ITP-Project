import React from "react";
import DbCard from "./dbCard";

function Dashboard() {
  return (
    <div className="row">
      <DbCard title="Total Employees" value="30" iconClass="bi-people-fill" />
      <DbCard title="Total Leaves" value="3" iconClass="bi-calendar-x" />
      <DbCard title="Weekly Sales" value="Rs. 500,0000" iconClass="bi-coin" />
    </div>
  );
}

export default Dashboard;
