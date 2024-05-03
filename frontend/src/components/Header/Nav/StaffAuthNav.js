import React from "react";
import "./Nav.css";
import CurrentDate from "./CurrentDate";
import { Nav, Dropdown } from "react-bootstrap";

function StaffAuthNav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <CurrentDate />

        <Dropdown as={Nav.Item} className="ml-3" style={{ margin: "0 5px" }}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Contact Admin
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="mailto:hr.neotechmotorssl@gmail.com">
              <i className="bi bi-envelope-at-fill"></i>
              Email: hr.neotechmotorssl@gmail.com
            </Dropdown.Item>
            <Dropdown.Item href="tel:+94711521161">
              <i className="bi bi-telephone-fill"></i>
              Phone: (071) 152-1161
            </Dropdown.Item>
            <Dropdown.Item href="https://wa.me/94711521161" target="_blank">
              <i className="bi bi-whatsapp"></i>
              WhatsApp: (071) 152-1161
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
}

export default StaffAuthNav;
