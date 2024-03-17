import React from "react";
import "./SMSidebar.css";
import SMnavList from "../../../data/SM/navItem";
import SMNavItem from "./SMNavItem.js";

function SMSidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {SMnavList.map((nav) => (
          <SMNavItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default SMSidebar;