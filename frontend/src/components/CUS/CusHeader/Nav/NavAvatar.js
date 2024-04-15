import React, { useState, useContext } from "react";
import cusavatar from '../../../../images/customerlogo.png'
import { CusAuthContext } from "../../../../context/cus-authcontext"
import { useNavigate,Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

function NavAvatar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const cusauth = useContext(CusAuthContext);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    cusauth.logout(); // Call the logout function from the context
    setShowLogoutModal(false); // Close the modal
    navigate("/customer/cuslogin"); // Redirect to the login page after logout
  };

  return (
    <div>
    <li className="nav-item dropdown pe-3">
      {cusauth.isLoggedIn && (
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={cusavatar} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">{cusauth.name}</span>
      </a>
      )}
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow cus-profile">
      {cusauth.isLoggedIn && (
        <>
         <li className="cus-dropdown-header">
        <img src={cusavatar} alt="Profile" className="rounded-circle" />
          <h6 style={{float:"center"}}>{cusauth.name}</h6>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="cus-dropdown-item d-flex align-items-center"
            href="http://localhost:3000/customer/cusprofile"
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
            href="http://localhost:3000/customer/appointment/myappointment"
          >
           
            <span>My Appointments</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a className="cus-dropdown-item d-flex align-items-center" href="/">
            
            <span>Mobile Services</span>
          </a>
        </li>

        <li>
          <a
            className="cus-dropdown-item d-flex align-items-center"
            href="#"
            onClick={() => setShowLogoutModal(true)} // Show logout modal on click
          >
            
            <span>Log Out</span>
          </a>
        </li>
        </>
      )}
      </ul>

      {/* Logout confirmation modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </li>
     {!cusauth.isLoggedIn && (
      <div style={{display:"flex"}}>
        <Link to="/customer/cuslogin">
  <Button variant="outline-light">Signin </Button>
  </Link>
  <Link to="/customer/cusreg">
  <Button variant="outline-light"style={{marginLeft:"1.5%"}}>Signup</Button>
  </Link>
  </div>
  )}
  </div>

  );
}

export default NavAvatar;
