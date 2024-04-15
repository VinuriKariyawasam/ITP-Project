import React from "react";
import "./SuperSideBar.css";
import supernavList from "../../../data/SUPER/supernavItem";
import SuperNavItem from "./SuperNavItem";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { StaffAuthContext } from "../../../context/StaffAuthContext";

function SuperSideBar() {
  const { userPosition } = useContext(StaffAuthContext);
  const navigate = useNavigate();
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {supernavList.map((nav) => (
          <SuperNavItem key={nav._id} nav={nav} />
        ))}
        {userPosition === "General Manager" && (
          <li>
            <Button
              variant="dark"
              onClick={() => navigate("/staff/gm")}
              style={{ margin: "10px" }}
            >
              <BsArrowLeft /> Gm Dashboard
            </Button>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default SuperSideBar;