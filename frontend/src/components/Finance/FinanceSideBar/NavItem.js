import React from "react";
import NavLink from "./NavLink";

function HrNavItem({ nav }) {
  return (
    <li className="nav-item">
      {nav.children && nav.children.length > 0 ? (
        <NavLink href={nav.href} icon={nav.icon} title={nav.name} hasSubmenu>
          <i className="bi bi-chevron-down ms-auto"></i>
        </NavLink>
      ) : (
        <NavLink href={nav.href} icon={nav.icon} title={nav.name} />
      )}

      {nav.children && nav.children.length > 0 && (
        <ul
          id={`nav-${nav._id}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {nav.children.map((childNav) => (
            <HrNavItem key={childNav._id} nav={childNav} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default HrNavItem;
