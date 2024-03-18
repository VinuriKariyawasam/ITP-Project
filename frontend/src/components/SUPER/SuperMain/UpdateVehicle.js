import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function UpdateVehicle() {
  const { id } = useParams(); // Obtain the id parameter from the URL
  const [formData, setFormData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    year: "",
    name: "",
    contact: "",
    records: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/updateVehicle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Vehicle updated successfully");
        // Redirect or show a success message
      } else {
        console.error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  return (
    <div className="vh-100 bg-gray d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Records</h2>
          <div className="mb-2">
            <label htmlFor="vehicleNo">Vehicle No.</label>
            <input
              type="text"
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="contact">Contact No.</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="records">Current Records</label>
            <input
              type="file"
              name="records"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button type="submit" className="me-5">
              Update
            </Button>
            <Link to="/supervisor/vehicle" className="btn btn-light text-decoration-none">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateVehicle;
