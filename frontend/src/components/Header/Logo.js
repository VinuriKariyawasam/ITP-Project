import React, { useContext } from "react";
import "./Logo.css";
import logo from "../../images/logoblack_trans.png";
import { StaffAuthContext } from "../../context/StaffAuthContext";

export default function Logo() {
  const { userPosition } = useContext(StaffAuthContext);
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  let logoLink = "/";
  // Set different links based on userPosition
  if (userPosition === "General Manager") {
    logoLink = "/staff/gm";
  } else if (userPosition === "HR Manager") {
    logoLink = "/staff/hr";
  } else if (userPosition === "Service Manager") {
    logoLink = "/staff/sm";
  } else if (userPosition === "Finance Manager") {
    logoLink = "/staff/finance";
  } else if (userPosition === "Supervisor") {
    logoLink = "/staff/supervisor";
  } else if (userPosition === "Inventory Manager") {
    logoLink = "/staff/im";
  } else if (userPosition === "Customer Service Agent") {
    logoLink = "/staff/cam";
  }
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href={logoLink} className="logo d-flex align-items-center">
        <img src={logo} alt="Logo" />
      </a>
      <i
        className="bi bi-list toggle-sidebar-btn"
        onClick={handleToggleSideBar}
      ></i>
    </div>
  );
}
