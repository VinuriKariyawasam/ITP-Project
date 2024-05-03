import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function QuotaDash({toggleLoading}) {
  const [quotations, setQuotations] = useState([]);
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchQuotations = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/quotations`);
      if (response.ok) {
        const data = await response.json();
        setQuotations(data);
        setFilteredQuotations(data); // Initialize filtered quotations with all quotations
      } else {
        throw new Error("Failed to fetch quotations");
      }
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
    finally{
      toggleLoading(false);
    }
  };

  useEffect(() => {
    // Fetch quotations data from the backend
    fetchQuotations();
  }, []);

  const handleCreateQuotation = () => {
    navigate("/staff/sm/quotation/add"); // Navigate to AddQuotation component
  };

  const handleDeleteQuotation = async (id) => {
    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/quotations/${id}`, {
        method: "DELETE",
      });
      console.log("Delete response:", response);
      if (response.ok) {
        // Refresh the quotations list after deletion
        alert("Deleted successfully!");
        fetchQuotations();
      } else {
        throw new Error("Failed to delete quotation");
      }
    } catch (error) {
      console.error("Error deleting quotation:", error);
    }
    finally{
      toggleLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredResults = quotations.filter((quotation) => {
      const vehicleNumber = quotation.vnumber.toLowerCase();
      const startDate = new Date(quotation.startDate).toLocaleDateString().toLowerCase();
      const query = searchQuery.toLowerCase();

      return vehicleNumber.includes(query) || startDate.includes(query);
    });

    setFilteredQuotations(filteredResults);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Generate auto-incremented quotation IDs like SMQ01, SMQ02, ...
  const generateQuotationId = (index) => {
    const idNumber = (index + 1).toString().padStart(2, "0"); // Start index from 1
    return `SMQ${idNumber}`;
  };

  return (
    <div className="my-4">
      <Row className="mb-3">
        <Col>
          <h2>Service Quotations Dashboard</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleCreateQuotation}>
            Create Quotation
          </Button>
        </Col>
      </Row>

      <Button variant="dark" onClick={handleBackButtonClick} className="mb-3">
        Back
      </Button>

      <Form className="mb-3">
        <Form.Group as={Row} controlId="searchQuotation">
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Search by Vehicle Number or Date"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col>
            <Button variant="info" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quotation ID</th>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Selected Services</th>
            <th>Borrowing Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotations.map((quotation, index) => (
            <tr key={quotation._id}>
              <td>{generateQuotationId(index)}</td>
              <td>{quotation.vnumber}</td>
              <td>{new Date(quotation.startDate).toLocaleDateString()}</td>
              <td>{quotation.totalPrice}</td>
              <td>
                <ul>
                  {quotation.services.map((service) => (
                    <li key={service.name}>
                      {service.name} - {service.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{quotation.borrowingItems}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteQuotation(quotation._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default QuotaDash;

