import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiCalendarLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import FileUpload from "../SuperUtil/SuperFileUpload";
import "./AddVehicle.css"; // Import CSS file for custom styles

export function validate(name, value) {
  if (name === "vehicleNo") {
    if (!value.trim().length || value.trim().length > 10) {
      return "Vehicle No. is required and must be at most 10 characters";
    }
  }
  if (name === "date") {
    if (!value) {
      return "Date is required";
    }
  }
  if (name === "name") {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Name should contain only letters";
    }
  }
  if (name === "issue") {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Issue should contain only letters";
    }
  }
  if (name === "request") {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Request should contain only letters";
    }
  }
  if (name === "year") {
    if (!/^\d{4}$/.test(value)) {
      return "Year should contain exactly 4 digits";
    }
  }
  if (name === "contact") {
    if (!/^\d{10}$/.test(value)) {
      return "Contact No. should contain exactly 10 digits";
    }
  }
  return "";
}

function AddVehicle() {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    year: "",
    name: "",
    contactNo: "", // Adjusted field name to match backend
    date: new Date(),
    records: null // Adjusted to set a default date
  });

  const [errors, setErrors] = useState({});
  const [errorField, setErrorField] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const datePickerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validate each field as it's being typed
    switch (name) {
      case "vehicleNo":
        errorMessage = value.trim().length === 0 || value.trim().length > 10 ? "Vehicle No. is required and must be at most 10 characters" : "";
        break;
      case "date":
        errorMessage = !value ? "Date is required" : "";
        break;
      case "name":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value) ? "Name should contain only letters" : "";
        break;
      case "brand":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value) ? "Issue should contain only letters" : "";
        break;
      case "model":
        errorMessage = !/^[a-zA-Z\s]*$/.test(value) ? "Request should contain only letters" : "";
        break;
      case "year":
        errorMessage = !/^\d{4}$/.test(value) ? "Year should contain exactly 4 digits" : "";
        break;
      case "contact":
        errorMessage = !/^\d{10}$/.test(value) ? "Contact No. should contain exactly 10 digits" : "";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: errorMessage });
    setErrorField(null);
    setFormData({ ...formData, [name]: value });
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
        const formDataToSend = new FormData();
        formDataToSend.append("vehicleNo", formData.vehicleNo);
        formDataToSend.append("brand", formData.brand); // Adjusted to match backend
        formDataToSend.append("model", formData.model); // Adjusted to match backend
        formDataToSend.append("year", formData.year); 
        formDataToSend.append("name", formData.name);// Adjusted to match backend
        formDataToSend.append("contactNo", formData.contactNo); // Adjusted field name to match backend
        formDataToSend.append("date", formData.date.toISOString());
  
        const response = await fetch("http://localhost:5000/api/vehicle/add-vehicle", {
          method: "POST",
          body: formDataToSend,
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Vehicle registered:", data);
          setShowModal(true);
        } else {
          throw new Error("Failed to register vehicle");
        }
      } catch (error) {
        console.error("Error registering vehicle:", error);
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
  
    if (!formData.vehicleNo.trim().length || formData.vehicleNo.trim().length > 10) {
      newErrors.vehicleNo = "Vehicle No. is required and must be at most 10 characters";
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
      newErrors.issue = "Issue is required";
      valid = false;
    }
  
    if (!formData.model.trim().length) {
      newErrors.request = "Request is required";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "50%", margin: "auto", marginTop: "-20px" }} className="bg-white rounded p-3">
        <form noValidate onSubmit={handleSubmit}>
          <h2>Add Vehicle</h2>
  
          <div className='mb-2'>
            <label htmlFor="vehicleNo">Vehicle No.</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className={`form-control ${errors.vehicleNo ? 'is-invalid' : ''}`} />
            {errors.vehicleNo && <div className="invalid-feedback">{errors.vehicleNo}</div>}
          </div>
  
          <div className='mb-2'>
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className={`form-control ${errors.brand ? 'is-invalid' : ''}`} />
            {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
          </div>
  
          <div className='mb-2'>
            <label htmlFor="model">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} className={`form-control ${errors.model ? 'is-invalid' : ''}`} />
            {errors.model && <div className="invalid-feedback">{errors.model}</div>}
          </div>
  
          <div className='mb-2'>
            <label htmlFor="year">Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} className={`form-control ${errors.year ? 'is-invalid' : ''}`} />
            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
          </div>
  
          <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
  
          <div className='mb-2'>
            <label htmlFor="contactNo">Contact No.</label>
            <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`} />
            {errors.contactNo && <div className="invalid-feedback">{errors.contactNo}</div>}
          </div>
  
          <div className='mb-2'>
            <label htmlFor="date">Date</label>
            <div className="input-group">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                dateFormat="yyyy-MM-dd"
                ref={datePickerRef}
              />
              <span className="input-group-text" onClick={handleCalendarIconClick}>
                <RiCalendarLine />
              </span>
            </div>
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>
  
          
  
          
  
          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" className="me-5">
              <Link to="/staff/supervisor/vehicle" className="text-light text-decoration-none">
                Back
              </Link>
            </Button>
            <Button type="submit" variant="success">Register</Button>
          </div>
  
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Vehicle registered successfully.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
