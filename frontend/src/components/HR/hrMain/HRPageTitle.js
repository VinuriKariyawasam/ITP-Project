import React from "react";
import "./hrpageTitle.css";

function HrPageTitle({ title, url }) {
  return (
    <div className="pagetitle">
      <h1>{title}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <i className="bi bi-house-door"></i>
            </a>
          </li>
          <li className="breadcrumb-item active">{url}</li>
        </ol>
      </nav>
    </div>
  );
}

export default HrPageTitle;
