import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  //to redirect after success
  const navigate = useNavigate();

  const [leaveData, setLeaveData] = useState({
    empId: "", // You may need to fetch or set employee ID dynamically
    empDBId: "",
    name: "", // You may need to fetch or set employee name dynamically
    fromDate: "",
    toDate: "",
    reason: "",
    status: "Pending",
  });

  const [employees, setEmployees] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [futureDateError, setFutureDateError] = useState(false);

  useEffect(() => {
    // Fetch employees from the backend when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/employees");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
    // Reset validation errors for the field being changed
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployee = employees.find(
      (emp) => `${emp.firstName} ${emp.lastName}` === e.target.value
    );
    setLeaveData((prevData) => ({
      ...prevData,
      empId: selectedEmployee ? selectedEmployee.empId : "",
      empDBId: selectedEmployee ? selectedEmployee._id : "",
      name: e.target.value,
    }));
    resetReason(); // Reset reason when employee changes
    setValidationErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const resetReason = () => {
    setLeaveData((prevData) => ({
      ...prevData,
      reason: "",
    }));
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    if (new Date(item.selection.startDate) < new Date()) {
      setFutureDateError(true);
    } else {
      setFutureDateError(false);
    }
    setState([item.selection]);
    const { startDate, endDate } = item.selection;
    setLeaveData((prevData) => ({
      ...prevData,
      fromDate: startDate,
      toDate: endDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    // Validate the form before submission
    const errors = validateForm(leaveData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    console.log(leaveData);
    try {
      const response = await fetch("http://localhost:5000/api/hr/add-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });
      console.log(response);

      if (response.status === 422) {
        // Handle validation errors (e.g., NIC already exists)
        const errorData = await response.json();
        alert("Employee alredy have requested leave in these days.");
        navigate("/staff/hr/leaves/add");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Leave added successfully");
      // Add any additional logic after leave is successfully added
      navigate("/staff/hr/leaves");
    } catch (error) {
      console.error("Error adding leave:", error);
    }
  };

  // Function to validate the form data
  const validateForm = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Employee name is required";
    }

    if (!data.fromDate) {
      errors.fromDate = "From date is required";
    }

    if (!data.toDate) {
      errors.toDate = "To date is required";
    }

    if (!data.reason) {
      errors.reason = "Reason is required";
    }

    if (new Date(data.fromDate) < new Date()) {
      errors.fromDate =
        "From date should be the same as or after the current date";
    }

    return errors;
  };

  return (
    <main>
      <Card>
        <Card.Header style={{ backgroundColor: "black", color: "white" }}>
          Create Leave Request
        </Card.Header>
        <Card.Body style={{ padding: "20px", backgroundColor: "white" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group
                  controlId="formEmpName"
                  style={{ marginBottom: "15px" }}
                >
                  <Form.Label>Select Employee</Form.Label>
                  <Form.Select
                    aria-label="Select Employee"
                    onChange={handleEmployeeChange}
                    isInvalid={formSubmitted && !!validationErrors.name}
                  >
                    <option value="">Select Employee</option>
                    {Array.isArray(employees) &&
                      employees.map((emp, index) => (
                        <option
                          key={index}
                          value={`${emp.firstName} ${emp.lastName}`}
                        >
                          {emp.firstName} {emp.lastName}-{emp.empId}
                        </option>
                      ))}
                  </Form.Select>
                  {/* Display validation error */}
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="formReason"
                  style={{ marginBottom: "15px" }}
                >
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter reason"
                    name="reason"
                    value={leaveData.reason}
                    onChange={handleChange}
                    isInvalid={formSubmitted && !!validationErrors.reason}
                  />
                  {/* Display validation error */}
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.reason}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="formDateRange"
                  style={{ marginBottom: "15px" }}
                >
                  <Form.Label>Date Range</Form.Label>
                  <br></br>
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                  {futureDateError && (
                    <div style={{ color: "red" }}>
                      From date should be the same as or after the current date
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formStatus" style={{ display: "none" }}>
              <Form.Control
                type="hidden"
                name="status"
                value={leaveData.status}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default AddLeave;
