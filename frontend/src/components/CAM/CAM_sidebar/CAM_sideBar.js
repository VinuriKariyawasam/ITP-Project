import React from "react";
import "./CAM_sideBar.css";
import navList from "../../../data/CAM/CAMnavItem";
import CAM_navItem from "./CAM_navItem";
import { StaffAuthContext } from "../../../context/StaffAuthContext";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function CAM_sideBar() {
  const { userPosition } = useContext(StaffAuthContext);
  const navigate = useNavigate();
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {navList.map((nav) => (
          <CAM_navItem key={nav._id} nav={nav} />
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

export default CAM_sideBar;