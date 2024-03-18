import React, { useEffect, useState } from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function VehicleDash() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/getVehicles");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setVehicles(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-vehicle/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        // Remove the deleted vehicle from the state
        setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
      } else {
        console.error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div className="table">
      <Row>
        <Stack direction="horizontal" gap={3}>
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
          <div className="p-2 ms-auto">
            <Button variant="success" size="md">
              <Link to="/supervisor/vehicle/add" className="text-light text-decoration-none">
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
                    <Link to={`/supervisor/vehicle/update/${vehicle._id}`} className="btn btn-success">Update</Link>
                    <button onClick={() => handleDelete(vehicle._id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VehicleDash;
