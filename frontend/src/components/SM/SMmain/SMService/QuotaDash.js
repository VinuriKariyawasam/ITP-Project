import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function QuotaDash() {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    // Fetch quotations data from the backend
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

    fetchQuotations();
  }, []);

  return (
    <div className="my-4">
      <h2>Service Quotations Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Selected Services</th>
            <th>Borrowing Items</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default QuotaDash;
