import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import jsPDF from "jspdf";
import logo from "../../../images/Payment/neotechlogo.jpg";


function VehicleDash({ toggleLoading }) {

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deletedVehicle, setDeletedVehicle] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/vehicle/vehicles`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setVehicles(data.vehicles);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );
    if (shouldDelete) {
      try {
        toggleLoading(true);
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/vehicle/delete-vehicle/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const deletedVehicle = vehicles.find((vehicle) => vehicle._id === id);
          setDeletedVehicle(deletedVehicle);
          setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
          setShowModal(true); // Show modal with deleted vehicle information
        } else {
          console.error("Failed to delete vehicle");
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }finally {
        toggleLoading(false); // Set loading to false after API call
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setFormData({});
    setDeletedVehicle(null);
  };

  const handleTakeReport = () => {
    const doc = new jsPDF();

    // Create an Image object for the logo
    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = logoImg.width;
      canvas.height = logoImg.height;

      // Draw the logo onto the canvas
      ctx.drawImage(logoImg, 0, 0);

      // Convert canvas to data URL
      const logoDataUrl = canvas.toDataURL("image/jpeg");

      // Add the logo image to the PDF
      doc.addImage(logoDataUrl, "JPEG", 10, 10, 60, 30);

      // Add text "Welcome you"
      doc.setFontSize(12);
      doc.setTextColor(128, 128, 128); // Set text color to black
      doc.text("323/1/A Main Street Battaramulla", 10, 55); // Adjusted position
      doc.text("info@neotech.com", 10, 59); // Adjusted position for email
      doc.text("0112887998", 10, 63); // Adjusted position for phone number

      // Add a line to separate
      doc.setLineWidth(0.5);
      doc.line(10, 68, 200, 68); // Adjusted vertical position of the line

      // Add "Vehicle Report" heading
      doc.setFont("helvetica", "bold"); // Set font to bold
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.text("Vehicle Report", 10, 76);

      // Add table
      const tableColumns = [
        "#",
        "Vehicle No",
        "Brand",
        "Year",
        "Name",
        "Contact",
      ];
      const tableData = vehicles.map((vehicle, index) => [
        index + 1,
        vehicle.vehicleNo,
        vehicle.brand,
        vehicle.year,
        vehicle.name,
        vehicle.contact,
        vehicle.email,
        vehicle.type,
      ]);

      doc.autoTable({
        startY: 80, // Adjusted startY to leave space for the logo, "welcome you" text, and horizontal line
        head: [tableColumns],
        body: tableData,
        theme: "plain", // Use 'plain' theme for simple styling
        didDrawPage: function (data) {
          // Add "Vehicle Report" heading on each page
          doc.setFontSize(16);
          doc.setTextColor(0, 0, 255);
        },
      });

      // Save the PDF
      doc.save("vehicle_report.pdf");
    };
  };

  const handleShowUpdateModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      vehicleNo: vehicle.vehicleNo,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      name: vehicle.name,
      contact: vehicle.contact,
      email: vehicle.email,
      type: vehicle.type,
    });
    setShowModal(true);
  };

  const validate = (name, value) => {
    if (name === "vehicleNo") {
      if (!/^[A-Za-z0-9]{4,10}$/.test(value.trim())) {
        return "Invalid Vehicle No. Enter again.";
      }
    }

    if (name === "brand" && !value.trim()) {
      return "Brand is required";
    }
    if (name === "model" && !value.trim()) {
      return "Model is required";
    }
    if (name === "year") {
      const currentYear = new Date().getFullYear();
      if (!/^\d{4}$/.test(value)) {
        return "Year must be four digits";
      }
      if (parseInt(value, 10) >= currentYear) {
        return "Year must be less than " + currentYear;
      }
    }
    if (name === "name" && !value.trim()) {
      return "Name is required";
    }
    if (name === "contact") {
      if (!/^\d{10}$/.test(value)) {
        return "Contact No. must be 10 digits";
      }
    }
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        return "Invalid email address";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);

    if (error) {
      alert(error);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/vehicle/update-vehicle/${selectedVehicle._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const updatedVehicles = vehicles.map((vehicle) => {
          if (vehicle._id === selectedVehicle._id) {
            return { ...vehicle, ...formData };
          }
          return vehicle;
        });
        setVehicles(updatedVehicles);
        setShowModal(false);
      } else {
        console.error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  const handleMoreClick = (vehicleNo) => {
    // Check if the vehicle number exists in the list of vehicles
    const vehicleExists = vehicles.some(
      (vehicle) => vehicle.vehicleNo === vehicleNo
    );

    if (vehicleExists) {
      window.location.href = `/staff/sm/record?vnumber=${vehicleNo}`;
    } else {
      alert(`Vehicle with number ${vehicleNo} is not available.`);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table">
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search by vehicle No..."
                value={search}
                onChange={handleSearch}
              />
            </Form.Group>
          </div>
          <div>
            <Button variant="secondary" onClick={clearFilters}>
              Clear Search
            </Button>
          </div>
          <div className="p-2 ms-auto">
            <Button variant="success">
              <Link
                to="/staff/supervisor/vehicle/add"
                className="text-dark text-decoration-none font-weight-bold"
              >
                Register Vehicle
              </Link>
            </Button>
          </div>
        </Stack>
      </Row>
      <div className="mt-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Name</th>
                <th>Contact</th>
                <th>E mail</th>
                <th>Type</th>
                <th>Records</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles
                .filter((vehicle) =>
                  vehicle.vehicleNo.toLowerCase().includes(search.toLowerCase())
                )
                .map((vehicle, index) => (
                  <tr key={index}>
                    <td>{vehicle.vehicleNo}</td>
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.contact}</td>
                    <td>{vehicle.email}</td>
                    <td>{vehicle.type}</td>
                    <td>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => {
                          handleMoreClick(vehicle.vehicleNo);
                          window.location.href = "/staff/supervisor/records";
                        }}
                      >
                        More
                      </button>
                    </td>
                    <td>
                      {" "}
                      {/* Move the buttons inside a separate <td> */}
                      <button
                        onClick={() => handleShowUpdateModal(vehicle)}
                        className="btn btn-warning me-2 text-dark font-weight-bold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        className="btn btn-danger text-dark font-weight-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {deletedVehicle ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Vehicle Deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Vehicle No: {deletedVehicle.vehicleNo}</p>
              <p>Brand: {deletedVehicle.brand}</p>
              <p>Model: {deletedVehicle.model}</p>
              <p>Year: {deletedVehicle.year}</p>
              <p>Name: {deletedVehicle.name}</p>
              <p>Contact: {deletedVehicle.contact}</p>
              <p>E mail: {deletedVehicle.email}</p>
              <p>Type: {deletedVehicle.type}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Vehicle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formVehicleNo">
                  <Form.Label>Vehicle No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Button variant="primary" onClick={handleTakeReport}>
        Take a Report
      </Button>
    </div>
  );
}

export default VehicleDash;
