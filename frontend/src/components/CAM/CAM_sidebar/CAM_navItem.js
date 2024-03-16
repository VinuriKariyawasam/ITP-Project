import React from "react";
import CAM_navLink from "./CAM_navLink";

function CAM_navItem({ nav }) {
  return (
    <li className="nav-item">
      {nav.children && nav.children.length > 0 ? (
        <CAM_navLink href={nav.href} icon={nav.icon} title={nav.name} hasSubmenu>
          <i className="bi bi-chevron-down ms-auto"></i>
        </CAM_navLink>
      ) : (
        <CAM_navLink href={nav.href} icon={nav.icon} title={nav.name} />
      )}

      {nav.children && nav.children.length > 0 && (
        <ul
          id={`nav-${nav._id}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {nav.children.map((childNav) => (
            <CAM_navItem key={childNav._id} nav={childNav} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default CAM_navItem;