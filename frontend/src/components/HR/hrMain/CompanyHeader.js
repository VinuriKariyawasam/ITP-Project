import React, { useRef } from "react";
import logo from "../../../images/logoblack_trans.png";

export const CompanyHeader = () => {
  return (
    <div className="invoice-title">
      <h4 className="float-end font-size-15">Human Resources</h4>
      <div className="mb-4">
        <img src={logo} alt="Invoice Logo" width="200px" />
      </div>
      <div className="text-muted">
        <p className="mb-1">
          <i className="bi bi-geo-alt-fill"></i>323/1/A Main Street Battaramulla
          {"  "}
          <i className="bi bi-envelope-fill me-1"></i> info@neotech.com{"  "}
          <i className="bi bi-telephone-fill me-1"></i> 0112887998
        </p>
      </div>
      <hr />
    </div>
  );
};
export default CompanyHeader;
