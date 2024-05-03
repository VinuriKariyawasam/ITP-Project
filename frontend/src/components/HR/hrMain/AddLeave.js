import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Toast } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const AddLeave = ({ toggleLoading }) => {
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
  const [nameTouched, setNameTouched] = useState(false);
  const [reasonTouched, setReasonTouched] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastBody, setToastBody] = useState("");
  const [toastType, setToastType] = useState("");

  const [newField, setNewField] = useState("");

  useEffect(() => {
    // Fetch employees from the backend when the component mounts
    const fetchEmployees = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/employees`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
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
    setNameTouched(true);
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

    // Clear the error messages for fromDate and toDate
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      fromDate: "",
      toDate: "",
    }));

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
    leaveData.newField = newField;

    console.log(leaveData);
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/add-leave`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveData),
        }
      );
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
      setToastType("success");
      setToastHeader("Success");
      setToastBody("Leave request created successfully");
      setShowToast(true);

      // Navigate after a delay
      setTimeout(() => {
        navigate("/staff/hr/leaves");
      }, 1250); // Adjust the delay as needed
    } catch (error) {
      console.error("Error adding leave:", error);
      setToastType("warning");
      setToastHeader("Warning");
      setToastBody("Error creating leave request. Please try again later.");
      setShowToast(true);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  // Function to validate the form data
  const validateForm = (data) => {
    let errors = {};

    if (!data.name || data.name === "Select Employee" || !nameTouched) {
      errors.name = "Employee name is required";
    }

    if (!data.fromDate) {
      errors.fromDate = "From date is required";
    }

    if (!data.toDate) {
      errors.toDate = "To date is required";
    }

    if (!data.reason || data.reason.length < 3 || !reasonTouched) {
      errors.reason =
        "Reason is required and must be at least 3 characters long";
    }

    if (new Date(data.fromDate) < new Date()) {
      errors.fromDate =
        "From date should be the same as or after the current date";
    }

    return errors;
  };

  return (
    <main>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={1250}
        autohide
        style={{
          position: "fixed",
          top: "90px",
          right: "10px",
          background: toastType === "success" ? "#28a745" : "#dc3545",
          color: "white",
        }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{toastHeader}</strong>
        </Toast.Header>
        <Toast.Body>{toastBody}</Toast.Body>
      </Toast>
      <Button
        variant="dark"
        onClick={() => navigate("/staff/hr/leaves")}
        style={{ margin: "10px" }}
      >
        <BsArrowLeft /> Leave
      </Button>
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
                    onBlur={() => setReasonTouched(true)}
                    isValid={!!leaveData.reason && leaveData.reason.length >= 3}
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
                  {validationErrors.fromDate && (
                    <div style={{ color: "red" }}>
                      {validationErrors.fromDate}
                    </div>
                  )}
                  {validationErrors.toDate && (
                    <div style={{ color: "red" }}>
                      {validationErrors.toDate}
                    </div>
                  )}
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
            {/*<Form.Group
              controlId="formNewField"
              style={{ marginBottom: "15px" }}
            >
              <Form.Label>New Field</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                name="newField"
                value={leaveData.newField}
                onChange={(e) => setNewField(e.target.value)}
              />
                </Form.Group>*/}
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
