import React from "react";
import "./GMMain.css";
import PageTitle from "./GMPageTitle";
import Dashboard from "./GMDashboard";

function Main() {
  return (
    <main id="main" className="main">
      <PageTitle />
      <Dashboard />
    </main>
  );
}

export default Main;
