import React, { useEffect, useState } from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import "./superdash.css";
import VehicleDetailsModal from "./VehicleDetailsModal";
import Table from "./Table";

import { useNavigate } from "react-router-dom";

function EmpDash() {
  //to add employee button part
  const navigate = useNavigate();

  //to all emplyees
  const [tableData, setTableData] = useState([]);

  //to modal parts
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //To modal data fetch
  // Assume you have a function to fetch employee data by ID
  const fetchEmployeeById = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/employee/${employeeId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched employee data from fetch:", data);
      return data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return null;
    }
  };

  //to all employee details fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/employees");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setTableData(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once on component mount

  //table headers
  const columns = ["First", "Last", "Role", "Contact", ""];
  /*const data = [
    [1, "Mark", "Otto", "@mdo"],
    [2, "Jacob", "Thornton", "@fat"],
    [3, "Larry", "Bird", "@twitter"],
  ];*/

  //reagarding modal
  const handleMoreButtonClick = async (employeeId) => {
    console.log("More button clicked:", employeeId);
    setSelectedEmployeeId(employeeId);
    const employee = await fetchEmployeeById(employeeId);
    console.log("Fetched employee data on click:", employee);
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowModal(false);
    setSelectedEmployeeId(null);
    setSelectedEmployee(null);
  };

  return (
    <section>
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-input"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </div>
          <div className="p-2 ms-auto">
            <Button variant="dark" size="md" onClick={() => navigate("add")}>
              Create Employee
            </Button>
          </div>
        </Stack>
      </Row>

      <div className="table">
        <table className="table table-rounded">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.position}</td>
                <td>{employee.contact}</td>
                <td>
                  <Button
                    variant="dark"
                    className="d-flex mx-auto"
                    onClick={() => handleMoreButtonClick(employee._id)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EmployeeDetailsModal
        show={showModal}
        onHide={handleCloseModal}
        employee={selectedEmployee}
      />
    </section>
  );
}

export default EmpDash;