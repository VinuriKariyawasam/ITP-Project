import React from "react";
import "./VehicleSideBar.css";
import vehiclenavList from "../../../data/Vehicle/vehiclenavItem";
import VehicleNavItem from "./VehicleNavItem";

function VehcileSideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {vehiclenavList.map((nav) => (
          <VehicleNavItem key={nav._id} nav={nav} />
        ))}
      </ul>
    </aside>
  );
}

export default VehcileSideBar;
