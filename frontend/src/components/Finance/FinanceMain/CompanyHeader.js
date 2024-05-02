import React from 'react'
import logo from "../../../images/Payment/neotechlogo.jpg"

export const CompanyHeader = () => {
  return (
    <div className="invoice-title">
    <h4 className="float-end font-size-15">
      Financial Report
    </h4>
    <div className="mb-4">
      <img src={logo} alt="Invoice Logo" width="200px" />
    </div>
    <div className="text-muted">
      <p className="mb-1">323/1/A Main Street Battaramulla</p>
      <p className="mb-1">
        <i className="uil uil-envelope-alt me-1"></i>{" "}
        info@neotech.com
      </p>
      <p>
        <i className="uil uil-phone me-1"></i> 0112887998
      </p>
    </div>
  </div>
 
  )
}
export default CompanyHeader;