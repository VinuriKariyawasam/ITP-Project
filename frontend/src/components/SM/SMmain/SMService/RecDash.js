import React, { useEffect, useState } from "react";
import { Button, Form, Row, Stack, Table } from "react-bootstrap";
import "./recdash.css";
import RecordDetailsModal from "./RecordDetailsModal";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function RecDash({toggleLoading}) {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoading(true);
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/records`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTableData(data.records);
        setFilteredData(data.records); // Initialize filtered data with all records
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
      toggleLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreButtonClick = async (recordId) => {
    setSelectedRecordId(recordId);
    const record = await fetchRecordById(recordId);
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecordId(null);
    setSelectedRecord(null);
  };

  const handleUpdateRecord = (updatedData) => {
    setIsDataUpdated(true);
  };

  const handleSearch = (searchQuery) => {
    const filteredRecords = tableData.filter((record) => {
      const { vnumber, startDate, EndDate } = record;
      const lowerSearchQuery = searchQuery.toLowerCase();
      // Check if any field matches the search query
      return (
        vnumber.toLowerCase().includes(lowerSearchQuery) ||
        startDate.toLowerCase().includes(lowerSearchQuery) ||
        EndDate.toLowerCase().includes(lowerSearchQuery)
      );
    });
    setFilteredData(filteredRecords);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.searchInput.value;
    handleSearch(searchInput);
  };

  const fetchRecordById = async (recordId) => {
    try {
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/sm/record/${recordId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching record data:", error);
      // Handle error scenarios here
      return { error: error.message };
    }
    finally{
      toggleLoading(false);
      }
  };

  // Generate auto-incremented record IDs like SMR01, SMR02, ...
  const generateRecordId = (index) => {
    const idNumber = (index + 1).toString().padStart(2, "0"); // Start index from 1
    return `SMR${idNumber}`;
  };

  return (
    <section>
      <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "25px" }}>
          <Row className="mb-3">
            <Stack direction="horizontal" gap={3} className="w-100">
              <div className="p-2 flex-grow-1">
                <Form onSubmit={handleSearchSubmit} className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    name="searchInput"
                    className="me-2 custom-input"
                    aria-label="Search"
                  />
                  <Button variant="dark" type="submit">
                    Search
                  </Button>
                </Form>
              </div>
              <div className="p-2">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => navigate("add")}
                >
                  Create Record
                </Button>
              </div>
            </Stack>
          </Row>

          <div className="SMrecordstable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Vehicle Number</th>
                  <th>Service Started Date</th>
                  <th>Payment Invoice Number</th>
                  <th>Service Ended Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record, index) => (
                  <tr key={record._id}>
                    <td>{generateRecordId(index)}</td>
                    <td>{record.vnumber}</td>
                    <td>{record.startDate}</td>
                    <td>{record.inumber}</td>
                    <td>{record.EndDate}</td>
                    <td>
                      <Button
                        variant="dark"
                        onClick={() => handleMoreButtonClick(record._id)}
                      >
                        More
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <RecordDetailsModal
            show={showModal}
            onHide={handleCloseModal}
            record={selectedRecord}
            isDataUpdated={isDataUpdated}
            onUpdate={handleUpdateRecord}
          />
        </Card.Body>
      </Card>
    </section>
  );
}

export default RecDash;
