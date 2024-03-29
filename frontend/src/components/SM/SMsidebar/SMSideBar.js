import React from "react";
import "./SMSideBar.css";
import SMnavList from "../../../data/SM/navItem";
import SMNavItem from "./SMNavItem";

function SMSideBar() {
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

export default SMSideBar;
