import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function VehicleDash() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for showing modal

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicle/vehicles");
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
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/delete-vehicle/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
        setShowModal(true); // Show modal on successful deletion
      } else {
        console.error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="table">
      <Row>
        <Stack direction="horizontal" gap={3}>
          {/* Search form */}
          <div className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-input"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </div>
          {/* Register button */}
          <div className="p-2 ms-auto">
            <Button variant="success" size="md">
              <Link to="/staff/supervisor/vehicle/add" className="text-dark text-decoration-none font-weight-bold">
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
                <th>Records</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.contact}</td>
                  <td>{vehicle.records}</td>
                  <td>
                    {/* Update and Delete buttons */}
                    <Link to={`/staff/supervisor/vehicle/update/${vehicle._id}`} className="btn btn-warning me-2 text-dark font-weight-bold">Update</Link>
                    <button onClick={() => handleDelete(vehicle._id)} className="btn btn-danger text-dark font-weight-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vehicle deleted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VehicleDash;
