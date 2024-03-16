import React from "react";
import VehicleNavLink from "./SuperNavLink";

function VehicleNavItem({ nav }) {
  return (
    <li className="nav-item">
      {nav.children && nav.children.length > 0 ? (
        <VehicleNavLink
          href={`#nav-${nav._id}`}
          icon={nav.icon}
          title={nav.name}
          hasSubmenu
        >
          <i className="bi bi-chevron-down ms-auto"></i>
        </VehicleNavLink>
      ) : (
        <VehicleNavLink href="#" icon={nav.icon} title={nav.name} />
      )}

      {nav.children && nav.children.length > 0 && (
        <ul
          id={`nav-${nav._id}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {nav.children.map((childNav) => (
            <VehicleNavItem key={childNav._id} nav={childNav} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default VehicleNavItem;
