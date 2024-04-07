import React from "react";
import cusavatar from '../../../../images/customerlogo.png'
function NavAvatar() {
  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={cusavatar} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">T.Eranga</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow cus-profile">
        <li className="cus-dropdown-header">
        <img src={cusavatar} alt="Profile" className="rounded-circle" />
          <h6 style={{float:"center"}}>Tharii Eranga</h6>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="cus-dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
          
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="cus-dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            
            <span>My Payments</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="cus-dropdown-item d-flex align-items-center"
            href="pages-faq.html"
          >
           
            <span>My Appointments</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a className="cus-dropdown-item d-flex align-items-center" href="/customer/MyAppointment">
            
            <span>Mobile Services</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
