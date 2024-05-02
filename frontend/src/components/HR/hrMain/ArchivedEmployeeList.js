import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function ArchivedEmployeeList({ toggleLoading }) {
  const [archivedEmployees, setArchivedEmployees] = useState([]);
  //to redirect after success
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch archived employee data from the backend
    const fetchArchivedEmployees = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/archivedEmployees`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setArchivedEmployees(data);
      } catch (error) {
        console.error("Error fetching archived employees:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };

    fetchArchivedEmployees();
  }, []);

  return (
    <section>
      <div>
        <h2>
          <Button
            variant="dark"
            onClick={() => navigate("/staff/hr/employee")}
            style={{ margin: "10px" }}
          >
            <BsArrowLeft /> Employee
          </Button>
          Archived Employee List
        </h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Employee ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                First Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Last Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Birth Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>NIC</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Address
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Gender
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Contact
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Start Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Position
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Basic Salary
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Bank
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Branch
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Account
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {archivedEmployees.map((employee) => (
              <tr key={employee._id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.empId}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.firstName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.lastName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {new Date(employee.birthDate).toLocaleDateString()}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.nic}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.address}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.gender}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.contact}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {new Date(employee.startDate).toLocaleDateString()}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.position}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.basicSalary}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.bank}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.branch}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {employee.account}
                </td>
                {/* Add more table cells for other data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ArchivedEmployeeList;
