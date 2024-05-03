import React, { useState, useRef } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiCalendarLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import FileUpload from "../SuperUtil/SuperFileUpload";

function AddServiceReq({ toggleLoading }) {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    date: null,
    name: "",
    issue: "",
    request: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const datePickerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validate each field as it's being typed
    switch (name) {
      // handleChange function
      case "vehicleNo":
        errorMessage =
          value.trim().length === 0 || value.trim().length > 10
            ? "Vehicle No. is required and must be at most 10 characters"
            : !/^[A-Z\u0DC1\u0DCA\u200D\u0DBB\u0DD3\d]+$/.test(value)
            ? "Vehicle No. must contain only capital letters, Sinhala word 'ශ්‍රී', or numbers"
            : value.trim().length > 1 && value.trim().startsWith("ශ්‍රී")
            ? "ශ්‍රී can only be added after the first character"
            : !/^[A-Z\d]*$/.test(value)
            ? ""
            : "";
        break;

      case "date":
        errorMessage = !value ? "Date is required" : "";
        break;
      case "name":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value)
          ? "Name should contain only letters"
          : "";
        break;
      case "issue":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value)
          ? "Issue should contain only letters"
          : "";
        break;
      case "request":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value)
          ? "Request should contain only letters"
          : "";
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file) => {
    setFormData({
      ...formData,
      report: file,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        toggleLoading(true); // Set loading to true before API call
        const formDataToSend = new FormData();
        formDataToSend.append("vehicleNo", formData.vehicleNo);
        formDataToSend.append("date", formData.date.toISOString());
        formDataToSend.append("name", formData.name);
        formDataToSend.append("issue", formData.issue);
        formDataToSend.append("request", formData.request);
        formDataToSend.append("report", formData.report);
        formDataToSend.append("reportFileName", formData.report.name);
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/vehicle/add-serviceReq`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Service request created:", data);
          setShowModal(true);
        } else {
          throw new Error("Failed to create service request");
        }
      } catch (error) {
        console.error("Error creating service request:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (
      !formData.vehicleNo.trim().length ||
      formData.vehicleNo.trim().length > 10
    ) {
      newErrors.vehicleNo =
        "Vehicle No. is required and must be at most 10 characters";
      valid = false;
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    if (!formData.name.trim().length) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.issue.trim().length) {
      newErrors.issue = "Issue is required";
      valid = false;
    }

    if (!formData.request.trim().length) {
      newErrors.request = "Request is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddSri = () => {
    const trimmedValue = formData.vehicleNo.trim();
    // Check if the vehicle number is empty or starts with "ශ්‍රී"
    if (trimmedValue.length === 0 || trimmedValue.startsWith("ශ්‍රී")) {
      return; // Exit function if the conditions are met
    }

    // Validate the vehicle number to ensure it starts with a number and contains only numbers
    if (!/^\d+$/.test(trimmedValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vehicleNo:
          "Vehicle No. must start with a number and contain only numbers",
      }));
      return; // Exit function if validation fails
    }

    // If all conditions are met, add "ශ්‍රී" to the vehicle number
    setFormData((prevFormData) => ({
      ...prevFormData,
      vehicleNo: trimmedValue + "ශ්‍රී",
    }));
  };

  const handleCalendarIconClick = () => {
    datePickerRef.current.setFocus(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/staff/supervisor/serviceReq");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{ width: "50%", margin: "auto", marginTop: "-20px" }}
        className="bg-white rounded p-3"
      >
        <form noValidate onSubmit={handleSubmit}>
          <h2>Service Request</h2>

          <div className="mb-2">
            <label htmlFor="vehicleNo">Vehicle No.</label>
            <input
              type="text"
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleChange}
              className={`form-control ${errors.vehicleNo ? "is-invalid" : ""}`}
            />
            <Button variant="secondary" onClick={handleAddSri}>
              Add ශ්‍රී
            </Button>
            {errors.vehicleNo && (
              <div className="invalid-feedback">{errors.vehicleNo}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="date">Date</label>
            <div className="input-group">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className={`form-control ${errors.date ? "is-invalid" : ""}`}
                dateFormat="yyyy-MM-dd"
                ref={datePickerRef}
              />
              <span
                className="input-group-text"
                onClick={handleCalendarIconClick}
              >
                <RiCalendarLine />
              </span>
            </div>
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="issue">Issue</label>
            <input
              type="text"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className={`form-control ${errors.issue ? "is-invalid" : ""}`}
            />
            {errors.issue && (
              <div className="invalid-feedback">{errors.issue}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="request">Request</label>
            <input
              type="text"
              name="request"
              value={formData.request}
              onChange={handleChange}
              className={`form-control ${errors.request ? "is-invalid" : ""}`}
            />
            {errors.request && (
              <div className="invalid-feedback">{errors.request}</div>
            )}
          </div>

          <Form.Group as={Col} controlId="formFileDocuments" className="mb-2">
            <Form.Label>Diagnosis Report</Form.Label>
            <FileUpload
              id="documents"
              accept=".pdf"
              onInput={(id, file, isValid) => handleFileChange(file)}
              errorText={errors.report && "Please choose a file"}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" className="me-5">
              <Link
                to="/staff/supervisor/serviceReq"
                className="text-light text-decoration-none"
              >
                Back
              </Link>
            </Button>
            <Button type="submit" variant="success">
              Add service request
            </Button>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Service Request added successfully.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default AddServiceReq;
