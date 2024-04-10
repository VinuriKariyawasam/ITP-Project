import React from "react";
import Logo from "./Logo";
import Navitem2 from "./Nav/Nav";
import CusnavItem from '../../../data/CUS/CusnavItem'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Logo/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <CusnavItem/>
          </Nav>
        </Navbar.Collapse>
        <Navitem2/>
    </Navbar>
  );
}

export default Header;
