import React from "react";
import "./Logo.css";
import neo from "../../../images/neo-tech-high-resolution-logo-transparent.png";

export default function Logo() {
  const cushome_frontendurl = `${process.env.React_App_Frontend_URL}/customer`;
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href={cushome_frontendurl} className="logo d-flex align-items-center">
        <img src={neo} alt="Logo" />
      </a>
    </div>
  );
}
