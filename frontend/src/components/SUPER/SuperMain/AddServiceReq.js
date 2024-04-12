import React, { useState, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiCalendarLine } from "react-icons/ri"; // Import calendar icon
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css"; // Import CSS file for custom styles

function AddServiceReq() {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    date: "",
    name: "",
    issue: "",
    quotation: "Rs. ",
    request: "",
    report: "",
    status: ""
  });

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorField, setErrorField] = useState(null); // Track the field causing the error
  const navigate = useNavigate();

  const datePickerRef = useRef(null); // Define datePickerRef variable using useRef hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quotation" ? `Rs. ${value}` : value
    });
  };

  const handleDateChange = (date) => {
    // Convert date object to string and extract only the date part
    const dateString = date.toISOString().split('T')[0];
    setFormData({
      ...formData,
      date: dateString
    });
  };
  
  

  const handleCalendarIconClick = () => {
    datePickerRef.current.setFocus(true); // Focus on the DatePicker input field
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }

    // Check if vehicleNo field is empty
    if (!formData.vehicleNo.trim()) {
      setError('Failed to register the vehicle. Please enter the Vehicle No.');
      setErrorField('vehicleNo');
      return;
    }

    // Custom validations
    if (!validateVehicleNo(formData.vehicleNo)) {
      setError('Please enter a valid vehicle No.');
      setErrorField('vehicleNo');
      return;
    }
      
    if (!validateDate(formData.date)) {
      setError('Failed to register the vehicle. Please enter vehicle date.');
      setErrorField('date');
      return;
    }
      
    if (!validateName(formData.name)) {
      setError('Failed to register the vehicle. Please enter name.');
      setErrorField('name');
      return;
    }

    if (!validateIssue(formData.issue)) {
      setError('Failed to register the vehicle. Please enter issue.');
      setErrorField('issue');
      return;
    }

    if (!validateRequest(formData.request)) {
      setError('Failed to register the vehicle. Please enter request.');
      setErrorField('request');
      return;
    }

    if (!validateQuotation(formData.quotation)) {
      setError('Invalid quotation. Please enter again.');
      setErrorField('quotation');
      return;
    }

    /*if (!validateStatus(formData.status)) {
      setError('Failed to register the vehicle. Please enter a status between 1 to 10 letters.');
      setErrorField('status');
      return;
    }*/

    try {
      const res = await fetch('http://localhost:5000/api/vehicle/add-serviceReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.error || 'Failed to save serviceReq');
        return;
      }
      setShowModal(true);
    } catch (error) {
      setError(error.message || 'An error occurred.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/staff/supervisor/serviceReq");
  };

  // Custom validation functions
  const validateVehicleNo = (vehicleNo) => {
    return vehicleNo.trim().length > 0 && vehicleNo.trim().length <= 10;
  };  

  const validateDate = (date) => {
    return !!date; // Returns true if date is not empty or null
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const validateIssue = (issue) => {
    return issue.trim().length > 0;
  };

  const validateRequest = (request) => {
    return request.trim().length > 0;
  };

  const validateQuotation = (quotation) => {
    return /^\d{0,20}$/.test(quotation.replace(/\D/g, '')); // Allow up to 20 digits
  };
  
 /* const validateStatus = (status) => {
    return /^[A-Za-z]{1,10}$/.test(status.trim());
  };*/
  
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form noValidate>
          <h2>Service Request</h2>

          <div className='mb-2'>
            <label htmlFor="vehicleNo">Vehicle No.</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className={`form-control ${errorField === 'vehicleNo' ? 'vehicle-error' : ''}`} required />
            {errorField === 'vehicleNo' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          {/* Date Picker Field */}
          <div className='mb-2'>
            <label htmlFor="date">Date</label>
            <div className="input-group">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                required
                ref={datePickerRef} // Assign ref to the DatePicker component
              />
              <span className="input-group-text" onClick={handleCalendarIconClick}>
                <RiCalendarLine />
              </span>
            </div>
            {errorField === 'date' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={`form-control ${errorField === 'name' ? 'vehicle-error' : ''}`} required />
            {errorField === 'name' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="issue">Issue</label>
            <input type="text" name="issue" value={formData.issue} onChange={handleChange} className={`form-control ${errorField === 'issue' ? 'vehicle-error' : ''}`} required />
            {errorField === 'issue' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="request">Request</label>
            <input type="text" name="request" value={formData.request} onChange={handleChange} className={`form-control ${errorField === 'request' ? 'vehicle-error' : ''}`} required />
            {errorField === 'request' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="report">Diagnosis Report</label>
            <input type="file" name="report" onChange={handleChange} className="form-control" />
          </div>

          <div className='mb-2'>
            <label htmlFor="quotation">Quotation</label>
            <div className="input-group">
              <span className="input-group-text">Rs.</span>
              <input type="text" name="quotation" value={formData.quotation.replace("Rs. ", "")} onChange={handleChange} className={`form-control ${errorField === 'quotation' ? 'vehicle-error' : ''}`} required />
            </div>
            {errorField === 'quotation' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
  <label htmlFor="status">Status</label>
  <input type="text" name="status" value={formData.status} onChange={handleChange} className={`form-control ${errorField === 'status' ? 'vehicle-error' : ''}`} />
</div>



          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" className="me-5">
              <Link to="/staff/supervisor/serviceReq" className="text-light text-decoration-none">
                Back
              </Link>
            </Button>
            <Button type="submit" onClick={handleClick} variant="success">Add service request</Button>
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

          {error && <p className="vehicle-error-message">{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  )
}

export default AddServiceReq;