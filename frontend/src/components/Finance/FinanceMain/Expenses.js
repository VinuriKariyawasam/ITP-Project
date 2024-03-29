import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Expenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/finance/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  const handleAddExpenseClick = () => {
    navigate("add-expense");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEditExpense = (id) => {
    navigate(`edit-expense/${id}`);
  };

  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:5000/api/finance/expenses/delete-expense/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense deleted successfully");
        // Update the expenses state by removing the deleted expense
        setExpenses(expenses.filter((exp) => exp._id !== id));
      })
      .catch((error) => console.error("Error deleting expense:", error));
  };

  // Function to generate ID in the format EX0001, EX0002, etc.
  const generateExpenseID = (index) => {
    return `EX${(index + 1).toString().padStart(4, "0")}`;
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Expenses" title="Expenses" />
      <div>
        <Button variant="primary" onClick={handleAddExpenseClick}>
          Add Expense
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{generateExpenseID(index)}</td>
                <td>{expense.title}</td>
                <td>Rs.{expense.amount}</td>
                <td>{expense.type}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.description}</td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => handleEditExpense(expense._id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteExpense(expense._id)}
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

export default Expenses;
