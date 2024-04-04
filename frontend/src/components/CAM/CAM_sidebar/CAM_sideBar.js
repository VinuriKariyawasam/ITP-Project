import React from "react";
import "./CAM_sideBar.css";
import navList from "../../../data/CAM/CAMnavItem";
import CAM_navItem from "./CAM_navItem";

function CAM_sideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {navList.map((nav) => (
          <CAM_navItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default CAM_sideBar;