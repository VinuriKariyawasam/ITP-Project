import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const Incomes = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/finance/incomes")
      .then((response) => response.json())
      .then((data) => setIncomes(data))
      .catch((error) => console.error("Error fetching incomes:", error));
  }, []);

  const handleAddIncomeClick = () => {
    navigate("add-income");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEditIncome = (id) => {
    navigate(`edit-income/${id}`);
  };

  const handleDeleteIncome = (id) => {
    // Set the income to delete and show the modal for confirmation
    setIncomeToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteIncome = () => {
    fetch(
      `http://localhost:5000/api/finance/incomes/delete-income/${incomeToDelete}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Income deleted successfully");
        // Update the incomes state by removing the deleted income
        setIncomes(incomes.filter((inc) => inc._id !== incomeToDelete));
        // Close the modal after deletion
        setShowDeleteModal(false);
      })
      .catch((error) => console.error("Error deleting income:", error));
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  // Function to generate ID in the format IN0001, IN0002, etc.
  const generateIncomeID = (index) => {
    return `IN${(index + 1).toString().padStart(4, "0")}`;
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Incomes" title="Incomes" />
      <div>
        <Button variant="primary" onClick={handleAddIncomeClick}>
          Add Income
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Income ID</th>
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
            {incomes.map((income, index) => (
              <tr key={income._id}>
                <td>{generateIncomeID(index)}</td>
                <td>{income.title}</td>
                <td>{income.serviceInvoiceId}</td>
                <td>Rs.{income.amount}</td>
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
      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this income?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteIncome}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Incomes;
