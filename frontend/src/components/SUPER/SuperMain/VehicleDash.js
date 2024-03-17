import React, { useEffect, useState } from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import "./vehicledash.css";
import VehicleDetailsModal from "./VehicleDetailsModal";
import Table from "./Table";

import {useNavigate} from "react-router-dom"

function VehicleDash() {
  //to add vehicle button part
  const navigate = useNavigate();

  //to all vehicle
  const [tableData, setTableData] = useState([]);

  //to modal parts
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //To modal data fetch
  // Assume you have a function to fetch employee data by ID
  const fetchVehicleById = async (vehicleId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/super/vehicle/${vehicleId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched employee data from fetch:", data);
      return data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return null;
    }
  };

  //to all vehicle details fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/super/vehicles");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setTableData(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once on component mount

  //table headers
  const columns = ["First", "Last", "Role", "Contact", ""];
  /*const data = [
    [1, "Mark", "Otto", "@mdo"],
    [2, "Jacob", "Thornton", "@fat"],
    [3, "Larry", "Bird", "@twitter"],
  ];*/

  //reagarding modal
  const handleMoreButtonClick = async (vehicleId) => {
    console.log("More button clicked:", vehicleId);
    setSelectedVehicleId(vehicleId);
    const vehicle = await fetchVehicleById(vehicleId);
    console.log("Fetched vehicle data on click:", vehicle);
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowModal(false);
    setSelectedVehicleId(null);
    setSelectedVehicle(null);
  };

  return (
    <section>
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
            <Button variant="dark" size="md" onClick={() => navigate("add")}>
              Register Vehicle
            </Button>
          </div>
        </Stack>
      </Row>

      <div className="table">
        <table className="table table-rounded">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.firstName}</td>
                <td>{vehicle.lastName}</td>
                <td>{vehicle.position}</td>
                <td>{vehicle.contact}</td>
                <td>
                  <Button
                    variant="dark"
                    className="d-flex mx-auto"
                    onClick={() => handleMoreButtonClick(vehicle._id)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VehicleDetailsModal
        show={showModal}
        onHide={handleCloseModal}
        vehicle={selectedVehicle}
      />
    </section>
  );
}

export default VehicleDash;