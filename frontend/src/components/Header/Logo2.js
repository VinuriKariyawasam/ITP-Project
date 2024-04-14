import React from "react";
import "./Logo.css";
import logo from "../../images/logoblack_trans.png";

export default function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        <img src={logo} alt="Logo" />
      </a>
    </div>
  );
}
