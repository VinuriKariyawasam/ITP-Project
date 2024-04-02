import React, { useEffect, useState } from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import "./recdash.css";
import Table from "./Table";
import RecordDetailsModal from "./RecordDetailsModal";
import Card  from "react-bootstrap/Card";
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
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  //refresh details modal after update
  // useEffect to listen for changes in isDataUpdated
  useEffect(() => {
    if (isDataUpdated) {
      setShowModal(true); // Show the modal when data is updated
      setIsDataUpdated(false); // Reset isDataUpdated after refreshing modal
    }
  }, [isDataUpdated]);

  // handleUpdateRecord function to pass to RecordDetailsModal
  const handleUpdateRecord = (updatedData) => {
    // Logic to update record data
    console.log("Updated record data:", updatedData);
    //chatgpt change
    setIsDataUpdated(true); // Set isDataUpdated to trigger modal refresh
    // Call the onUpdate prop to trigger refresh in RecDash
  //onUpdate(updatedData); // Use onUpdate prop here
  };

  //To modal data fetch
  // Assume you have a function to fetch record data by ID
  const fetchRecordById = async (recordId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/sm/records/${recordId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched record data from fetch:", data);
      return data;

      //Chatgpt part
    } catch (error) {
      console.error("Error fetching record data:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        // Handle network errors
        // For example, show a message to the user
        alert("Failed to fetch record data. Please check your network connection.");
      } else {
        // Handle other errors, including 404
        // For example, show a message to the user indicating that the record was not found
        alert("Record not found. Please try again or contact support.");
      }
      // Return something meaningful to indicate error
      return { error: error.message };
    }
    


   // } catch (error) {
   //   console.error("Error fetching record data:", error);
   //   return null;
   // }
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
       <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "25px" }}>
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
            <Button variant="dark" size="sm" onClick={() => navigate("add")}>
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
        isDataUpdated={isDataUpdated}
        onUpdate={handleUpdateRecord}
      />
      </Card.Body>
      </Card>
    </section>
  );
}

export default RecDash;
