import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Incomes = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/finance/incomes")
      .then((response) => response.json())
      .then((data) => setIncomes(data))
      .catch((error) => console.error("Error fetching incomes:", error));
  }, []);

  const handleAddIncomeClick = () => {
    navigate("/finance/incomes/add-income");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEditIncome = (id) => {
    navigate(`/finance/incomes/edit-income/${id}`);
  };

  const handleDeleteIncome = (id) => {
    fetch(`http://localhost:5000/finance/incomes/delete-income/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Income deleted successfully");
        // Update the incomes state by removing the deleted income
        setIncomes(incomes.filter((inc) => inc._id !== id));
      })
      .catch((error) => console.error("Error deleting income:", error));
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Finance / Incomes" />
      <div>
        <Button variant="primary" onClick={handleAddIncomeClick}>
          Add Income
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Service Invoice ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income._id}>
                <td>{`I${income._id}`}</td>
                <td>{income.title}</td>
                <td>{income.serviceInvoiceId}</td>
                <td>{income.amount}</td>
                <td>{income.type}</td>
                <td>{formatDate(income.date)}</td>
                <td>{income.time}</td>
                <td>{income.status}</td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => handleEditIncome(income._id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteIncome(income._id)}
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

export default Incomes;