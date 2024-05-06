import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiCalendarLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "./AddVehicle.css"; // Import CSS file for custom styles

function AddVehicle({ toggleLoading }) {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    year: "",
    name: "",
    contact: "",
    email: "",
    date: new Date(),
    type: "", // Add type field
    government: false,
    records: null, // Adjusted to set a default date
  });

  const [errors, setErrors] = useState({});
  const [errorField, setErrorField] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const datePickerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    let errorMessage = "";

    // Validate each field as it's being typed
    switch (name) {
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
      case "brand":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value)
          ? "Issue should contain only letters"
          : "";
        break;
      case "model":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value)
          ? "Request should contain only letters"
          : "";
        break;
      case "year":
        errorMessage = !/^\d{4}$/.test(value)
          ? "Year should contain exactly 4 digits"
          : "";
        break;
      case "contact":
        errorMessage = !/^\d{10}$/.test(value)
          ? "Contact No. should contain exactly 10 digits"
          : "";
        break;
      case "email":
        errorMessage = !/\S+@\S+\.\S+/.test(value)
          ? "Invalid email address"
          : "";
        break;

      case "type":
        setFormData({ ...formData, [name]: value });
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: errorMessage });
    setErrorField(null);
    setFormData({
      ...formData,
      [name]: name === "government" ? checked : value,
    });
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

  const handleDateChange = (date) => {
    // Validate date
    const errorMessage = !date ? "Date is required" : "";
    setErrors({ ...errors, date: errorMessage });
    datePickerRef.current.setFocus(true);
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/vehicle/add-vehicle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Vehicle registered:", data);
          setShowModal(true);
        } else {
          throw new Error("Failed to register vehicle");
        }
      } catch (error) {
        console.error("Error registering vehicle:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/staff/supervisor/vehicle");
  };

  const handleCalendarIconClick = () => {
    datePickerRef.current.setFocus(true);
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

    if (!formData.brand.trim().length) {
      newErrors.brand = "Brand is required";
      valid = false;
    }

    if (!formData.model.trim().length) {
      newErrors.model = "Model is required";
      valid = false;
    }

    if (!formData.email.trim().length) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.type.trim().length) {
      newErrors.type = "Type is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const goBack = () => {
    navigate(-1);
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
          <h2>Add Vehicle</h2>

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
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`form-control ${errors.brand ? "is-invalid" : ""}`}
            />
            {errors.brand && (
              <div className="invalid-feedback">{errors.brand}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={`form-control ${errors.model ? "is-invalid" : ""}`}
            />
            {errors.model && (
              <div className="invalid-feedback">{errors.model}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`form-control ${errors.year ? "is-invalid" : ""}`}
            />
            {errors.year && (
              <div className="invalid-feedback">{errors.year}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="name">
              Name &nbsp;&nbsp;{" "}
              <span style={{ color: "blue" }}>
                **If the vehicle is a government vehicle, enter ministry name
              </span>
            </label>
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
            <label htmlFor="contact">Contact No.</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`form-control ${errors.contact ? "is-invalid" : ""}`}
            />
            {errors.contact && (
              <div className="invalid-feedback">{errors.contact}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`form-control ${errors.type ? "is-invalid" : ""}`}
            >
              <option value="">Select Type</option>
              <option value="government">Government</option>
              <option value="nonGovernment">Non-Government</option>
            </select>
            {errors.type && (
              <div className="invalid-feedback">{errors.type}</div>
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

          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" className="me-5" onClick={goBack}>
              Back
            </Button>
            <Button type="submit" variant="success">
              Register
            </Button>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Vehicle registered successfully.</Modal.Body>
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

export default AddVehicle;
