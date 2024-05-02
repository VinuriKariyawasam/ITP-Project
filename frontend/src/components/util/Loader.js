// Loader.js
import React from "react";
import "./Loader.css"; // CSS for styling the loader
import companyLogo from "../../images/logoblack_trans.png"; // Import the company logo image

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-bars"></div>
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
      </div>
    </div>
  );
};

export default Loader;
