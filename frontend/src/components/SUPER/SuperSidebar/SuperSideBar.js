import React from "react";
import "./SuperSideBar.css";
import supernavList from "../../../data/SUPER/supernavItem";
import SuperNavItem from "./SuperNavItem";

function SuperSideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {supernavList.map((nav) => (
          <SuperNavItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default SuperSideBar;