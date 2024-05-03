import React, { useContext, useState, useEffect } from "react";
import profileImg from "../../../images/user2.png";
import { StaffAuthContext } from "../../../context/StaffAuthContext";

function NavAvatar() {
  const { logout } = useContext(StaffAuthContext);
  const { userId, userPosition } = useContext(StaffAuthContext);
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleLogout = () => {
    // Call logout function from authentication context
    logout();
    // Optionally, redirect the user to the login page or another page after logout
    window.location.href = "/staff/login"; // Example redirect to login page
  };

  const fetchEmployeeData = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/employee/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch employee data using userId
      fetchEmployeeData(userId);
    }
  }, [userId]);

  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        {employeeData ? (
          <>
            {employeeData.photoUrl ? (
              <img
                src={employeeData.photoUrl}
                alt="Profile"
                className="rounded"
                style={{
                  width: "100%", // Ensure the image takes up the full width of the container
                  height: "100%", // Allow the height to adjust based on the image's aspect ratio
                  display: "block", // Display the image as a block element
                }}
              />
            ) : (
              <img src={profileImg} alt="Profile" className="rounded-circle" />
            )}
            <span className="d-none d-md-block dropdown-toggle ps-2">
              {employeeData.firstName}
            </span>
          </>
        ) : (
          "Loading..."
        )}
      </a>

      <ul
        className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
        style={{ backgroundColor: "lightgrey" }}
      >
        <li className="dropdown-header">
          <h6>{employeeData ? employeeData.firstName : "Loading..."}</h6>
          <span>{employeeData ? employeeData.position : "Loading..."}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="/staff/staffprofile"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="#"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
