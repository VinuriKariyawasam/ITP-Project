import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css"; // Import CSS file for custom styles

function AddVehicle() {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    year: "",
    name: "",
    contact: "",
    records: null // Assuming records is a file
  });

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorField, setErrorField] = useState(null); // Track the field causing the error
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

    if (!validateBrand(formData.brand)) {
      setError('Failed to register the vehicle. Please enter vehicle brand.');
      setErrorField('brand');
      return;
    }

    if (!validateModel(formData.model)) {
      setError('Failed to register the vehicle. Please enter vehicle model.');
      setErrorField('model');
      return;
    }

    if (!formData.year.trim()) {
      setError('Failed to register the vehicle. Please enter year.');
      setErrorField('year');
      return;
    }
  
    if (!validateYear(formData.year)) {
      setError('Invalid year. Please enter again.');
      setErrorField('year');
      return;
    }

    if (!validateName(formData.name)) {
      setError('Failed to register the vehicle. Please enter name.');
      setErrorField('name');
      return;
    }

    if (!formData.contact.trim()) {
      setError('Failed to register the vehicle. Please enter contact number.');
      setErrorField('contact');
      return;
    }

    if (!validateContact(formData.contact)) {
      setError('Invalid contact number. Please enter again.');
      setErrorField('contact');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/vehicle/add-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.error || 'Failed to save vehicle');
        return;
      }
      setShowModal(true);
    } catch (error) {
      setError(error.message || 'An error occurred.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/staff/supervisor/vehicle");
  };

  // Custom validation functions
  const validateVehicleNo = (vehicleNo) => {
    return vehicleNo.trim().length > 0 && vehicleNo.trim().length <= 10;
  };  

  const validateBrand = (brand) => {
    return brand.trim().length > 0;
  };

  const validateModel = (model) => {
    return model.trim().length > 0;
  };

  const validateYear = (year) => {
    return /^\d{4}$/.test(year);
  };  

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const validateContact = (contact) => {
    return /^\d{10}$/.test(contact);
  };
  

  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form noValidate>
          <h2>Vehicle</h2>

          <div className='mb-2'>
            <label htmlFor="vehicleNo">Vehicle No.</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className={`form-control ${errorField === 'vehicleNo' ? 'vehicle-error' : ''}`} required />
            {errorField === 'vehicleNo' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className={`form-control ${errorField === 'brand' ? 'vehicle-error' : ''}`} required />
            {errorField === 'brand' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="model">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} className={`form-control ${errorField === 'model' ? 'vehicle-error' : ''}`} required />
            {errorField === 'model' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="year">Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} className={`form-control ${errorField === 'year' ? 'vehicle-error' : ''}`} required />
            {errorField === 'year' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={`form-control ${errorField === 'name' ? 'vehicle-error' : ''}`} required />
            {errorField === 'name' && <span className="vehicle-exclamation-mark">!</span>}
          </div>

          <div className='mb-2'>
            <label htmlFor="contact">Contact No.</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} className={`form-control ${errorField === 'contact' ? 'vehicle-error' : ''}`} required />
            {errorField === 'contact' && <span className="vehicle-exclamation-mark">!</span>}
          </div>
          
          <div className='mb-2'>
            <label htmlFor="records">Current Records</label>
            <input type="file" name="records" onChange={handleChange} className="form-control" />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" className="me-5">
              <Link to="/staff/supervisor/vehicle" className="text-light text-decoration-none">
                Back
              </Link>
            </Button>
            <Button type="submit" onClick={handleClick} variant="success">Register</Button>
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

export default AddVehicle;
