import React, { useEffect, useState } from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import "./recdash.css";
import Table from "./Table";
import RecordDetailsModal from "./RecordDetailsModal";

import { useNavigate } from "react-router-dom";

function RecDash() {
  //to add record button part
  const navigate = useNavigate();

  //to all records
  const [tableData, setTableData] = useState([]);

  //to modal parts
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //To modal data fetch
  // Assume you have a function to fetch record data by ID
  const fetchRecordById = async (recordId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/sm/record/${recordId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched record data from fetch:", data);
      return data;
    } catch (error) {
      console.error("Error fetching record data:", error);
      return null;
    }
  };

  //to all record details fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sm/records");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setTableData(data.records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once on component mount

  //table headers
  const columns = ["vnumber", "startDate", "inumber", "EndDate", ""];
  /*const data = [
    [1, "Mark", "Otto", "@mdo"],
    [2, "Jacob", "Thornton", "@fat"],
    [3, "Larry", "Bird", "@twitter"],
  ];*/

  //reagarding modal
  const handleMoreButtonClick = async (recordId) => {
    console.log("More button clicked:", recordId);
    setSelectedRecordId(recordId);
    const record = await fetchRecordById(recordId);
    console.log("Fetched record data on click:", record);
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowModal(false);
    setSelectedRecordId(null);
    setSelectedRecord(null);
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
              Create Record
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
            {tableData.map((record, index) => (
              <tr key={index}>
                <td>{record.vnumber}</td>
                <td>{record.startDate}</td>
                <td>{record.inumber}</td>
                <td>{record.EndDate}</td>
                <td>
                  <Button
                    variant="dark"
                    className="d-flex mx-auto"
                    onClick={() => handleMoreButtonClick(record._id)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RecordDetailsModal
        show={showModal}
        onHide={handleCloseModal}
        record={selectedRecord}
      />
    </section>
  );
}

export default RecDash;
