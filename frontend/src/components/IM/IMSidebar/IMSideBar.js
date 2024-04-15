import React from "react";
import "../IMSidebar/IMSideBar.css";
import imnavList from "../../../data/IM/IMnavItem";
import IMNavItem from "../IMSidebar/IMNavItem";
import { StaffAuthContext } from "../../../context/StaffAuthContext";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function IMSideBar() {
  const { userPosition } = useContext(StaffAuthContext);
  const navigate = useNavigate();
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {imnavList.map((nav) => (
          <IMNavItem key={nav._id} nav={nav} />
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

export default IMSideBar;
