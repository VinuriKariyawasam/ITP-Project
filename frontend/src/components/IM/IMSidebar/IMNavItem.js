import React from "react";
import IMNavLink from "../IMSidebar/IMNavLink";


function IMNavItem({ nav }) {
  return (
    <li className="nav-item">
      {nav.children && nav.children.length > 0 ? (
        <IMNavLink href={nav.href} icon={nav.icon} title={nav.name} hasSubmenu>
          <i className="bi bi-chevron-down ms-auto"></i>
        </IMNavLink>
      ) : (
        <IMNavLink href={nav.href} icon={nav.icon} title={nav.name} />
      )}

      {nav.children && nav.children.length > 0 && (
        <ul
          id={`nav-${nav._id}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {nav.children.map((childNav) => (
            <IMNavItem key={childNav._id} nav={childNav} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default IMNavItem;
