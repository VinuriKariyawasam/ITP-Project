import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const Expenses = ({toggleLoading}) => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
        try {
          toggleLoading(true)
            const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }finally {
          toggleLoading(false)
        }
    };

    fetchExpenses();

}, []);


  const handleAddExpenseClick = () => {
    navigate("/staff/finance/expenses/add-expense");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEditExpense = (id) => {
    navigate(`edit-expense/${id}`);
  };

  const handleDeleteExpense = (id) => {
    // Set the expense to delete and show the modal for confirmation
    setExpenseToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteExpense = () => {
    fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/delete-expense/${expenseToDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense deleted successfully");
        // Update the expenses state by removing the deleted expense
        setExpenses(expenses.filter((exp) => exp._id !== expenseToDelete));
        // Close the modal after deletion
        setShowDeleteModal(false);
      })
      .catch((error) => console.error("Error deleting expense:", error));
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
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
        <br></br><br></br>
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
      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this expense?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteExpense}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Expenses;
