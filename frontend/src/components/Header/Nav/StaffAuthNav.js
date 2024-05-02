import React from "react";
import "./Nav.css";
import CurrentDate from "./CurrentDate";
import { Nav, Dropdown } from "react-bootstrap";

function StaffAuthNav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <CurrentDate />
        <li className="nav-item" style={{ margin: "0 5px" }}>
          <a
            className="nav-link"
            href="mailto:neotechmotorssl@gmail.com"
            styles={{ margin: "10px" }}
          >
            Reset Password
          </a>
        </li>

        <Dropdown as={Nav.Item} className="ml-3" style={{ margin: "0 5px" }}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Contact Admin
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="mailto:dummy@example.com">
              Email: dummy@example.com
            </Dropdown.Item>
            <Dropdown.Item href="tel:+1234567890">
              Phone: (123) 456-7890
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
}

export default StaffAuthNav;
