import React from 'react';
import './SMpageTitle.css';

function PageTitle() {
  return (
    <div className="pagetitle">
      <h1>Service Manager</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <i className="bi bi-house-door"></i>
            </a>
          </li>
          <li className="breadcrumb-item active">Service Manager</li>
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;
