import React from "react";
import "./Nav.css";
import NavAvatar from "./NavAvatar";
import CurrentDate from "./CurrentDate";

function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <CurrentDate />
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
