import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/createVehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Vehicle created successfully, redirect to vehicle dashboard
        window.location.href = "/supervisor/vehicle";
      } else {
        console.error("Failed to register vehicle");
      }
    } catch (error) {
      console.error("Error registering vehicle:", error);
    }
  };

  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Vehicle</h2>

          <div className='mb-2'>
            <label htmlFor="vehicleNo">Vehicle No.</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="form-control" />
          </div>

          <div className='mb-2'>
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="form-control" />
          </div>

          <div className='mb-2'>
            <label htmlFor="model">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} className="form-control" />
          </div>

          <div className='mb-2'>
            <label htmlFor="year">Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} className="form-control" />
          </div>

          <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
          </div>

          <div className='mb-2'>
            <label htmlFor="contact">Contact No.</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="form-control" />
          </div>
          
          <div className='mb-2'>
            <label htmlFor="records">Current Records</label>
            <input type="file" name="records" onChange={handleChange} className="form-control" />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary" className="me-5">
              <Link to="/supervisor/vehicle" className="text-light text-decoration-none">
                Back
              </Link>
            </Button>
            <Button type="submit" className='btn btn-success ms-2'>Register</Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddVehicle;
