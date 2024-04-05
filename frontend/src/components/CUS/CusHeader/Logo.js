import React from "react";
import "./Logo.css";
import neo from '../../../images/neo-tech-high-resolution-logo-transparent.png'

export default function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        <img src={neo} alt="Logo" />
      </a>
    </div>
  );
}
