import React from "react";
import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import neo from "../../images/neo-tech-high-resolution-logo-transparent.png";

function StaffFooter() {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        &copy; Copyright{" "}
        <strong>
          <span>Neo Tech Motors & Services</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="#">OctagonIT Team</a>
      </div>
      <div className="credits">
        IT Support:-{" "}
        <a href="tel:+94 71 152 1161">+94 71 152 1161/+94 71 480 4203 </a>
        <a href="mailto:teamoctagonit@gmail.com">teamoctagonit@gmail.com</a>
      </div>
    </footer>
  );
}

export default StaffFooter;
