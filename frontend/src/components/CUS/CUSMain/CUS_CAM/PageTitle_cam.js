import React from "react";
import "../../../CAM/CAM_main/CAM_pageTitle.css";

function PageTitle_cam(props){
    return (
            <div className="pagetitle">
              <h1>{props.title}</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/customer">
                      <i className="bi bi-house-door"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active">{props.path}</li>
                </ol>
              </nav>
            </div>
    );
}

export default PageTitle_cam;