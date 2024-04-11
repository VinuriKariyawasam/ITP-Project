import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function QuotaDash() {
  const [quotations, setQuotations] = useState([]);
  const navigate = useNavigate();

  const fetchQuotations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sm/quotations");
      if (response.ok) {
        const data = await response.json();
        setQuotations(data);
      } else {
        throw new Error("Failed to fetch quotations");
      }
    } catch (error) {
      console.error("Error fetching quotations:", error);
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
      const response = await fetch(`http://localhost:5000/api/sm/quotations/${id}`, {
        method: "DELETE",
      });
      console.log("Delete response:", response);
      if (response.ok) {
        // Refresh the quotations list after deletion
        fetchQuotations();
      } else {
        throw new Error("Failed to delete quotation");
      }
    } catch (error) {
      console.error("Error deleting quotation:", error);
    }
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Selected Services</th>
            <th>Borrowing Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation._id}>
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
                <Button variant="danger" onClick={() => handleDeleteQuotation(quotation._id)}>
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


