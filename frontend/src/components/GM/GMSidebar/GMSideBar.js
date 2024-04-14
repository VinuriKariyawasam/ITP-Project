import React from "react";
import "./GMSideBar.css";
import gmnavList from "../../../data/GM/gmnavItem";
import GMNavItem from "./GMNavItem";

function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {gmnavList.map((nav) => (
          <GMNavItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
