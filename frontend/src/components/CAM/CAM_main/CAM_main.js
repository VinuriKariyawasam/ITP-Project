import React from "react";
import "./CAM_main.css";
import CAM_dashboard from "./CAM_dashboard";
import CAM_pageTitle from "./CAM_pageTitle";

function CAM_main() {
  return (
    <main id="main" className="cam-main">
      <CAM_pageTitle title="Customer Affairs Management Dashboard" url="/cam" />
      <CAM_dashboard />
    </main>
    
  );
}

export default CAM_main;