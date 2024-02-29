import React from "react";
import "./HrSideBar.css";
import hrnavList from "../../../data/HR/hrnavItem";
import HrNavItem from "./HrNavItem";

function HrSideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {hrnavList.map((nav) => (
          <HrNavItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default HrSideBar;
