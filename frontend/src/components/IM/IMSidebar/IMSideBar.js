import React from "react";
import "../IMSidebar/IMSideBar.css";
import imnavList from "../../../data/IM/IMnavItem";
import IMNavItem from "../IMSidebar/IMNavItem";


function IMSideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {imnavList.map((nav) => (
          <IMNavItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default IMSideBar;
