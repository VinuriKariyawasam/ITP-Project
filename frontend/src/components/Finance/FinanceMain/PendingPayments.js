import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PendingPayments = ({ toggleLoading }) => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [alert, setAlert] = useState(null); // State for alert message
  const [confirmationDialog, setConfirmationDialog] = useState({
    show: false,
    action: "",
    paymentId: null,
  });

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/finance/billing/pendingpayments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pending payments");
      }
      const data = await response.json();
      setPayments(data.data);
    } catch (error) {
      console.error("Error fetching pending payments:", error.message);
    } finally {
      toggleLoading(false);
    }
  };

  const handleApproveConfirmation = (paymentId) => {
    setConfirmationDialog({
      show: true,
      action: "approve",
      paymentId: paymentId,
    });
  };

  const handleCancelConfirmation = (paymentId) => {
    setConfirmationDialog({
      show: true,
      action: "cancel",
      paymentId: paymentId,
    });
  };

  const handleConfirmationClose = () => {
    setConfirmationDialog({
      show: false,
      action: "",
      paymentId: null,
    });
  };

  const handleConfirmationAction = async () => {
    if (confirmationDialog.action === "approve") {
      await markAsCompleted(confirmationDialog.paymentId);
    } else if (confirmationDialog.action === "cancel") {
      await markAsCancelled(confirmationDialog.paymentId);
    }
    handleConfirmationClose();
  };

  const sendUpdatetoInventory = async (paymentId) => {
    try {
      // Send a PATCH request to update inventory
      await fetch(`${process.env.React_App_Backend_URL}/api/finance/updateinventory/${paymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const markAsCompleted = async (paymentId) => {
    try {
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/finance/billing/inpersonpayment/${paymentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "completed" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark payment as completed");
      }
      sendUpdatetoInventory(paymentId);
      navigate('/staff/finance/billing/new-invoice', { state: { paymentId: paymentId } });
    } catch (error) {
      console.error("Error marking payment as completed:", error.message);
    }
  };

  const markAsCancelled = async (paymentId) => {
    try {
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/finance/billing/inpersonpayment/${paymentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "cancelled" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark payment as completed");
      }
      fetchPendingPayments();
      setAlert("Payment marked as cancelled.");
    } catch (error) {
      console.error("Error marking payment as completed:", error.message);
    }
  };

  return (
    <>
      <h4 className="mb-4">Pending Payments</h4>
      {alert && (
        <Alert variant="success" onClose={() => setAlert(null)} dismissible>
          {alert}
        </Alert>
      )}
      {payments.length === 0 ? (
        <p>No Pending Payments</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer Name</th>
              <th>Amount (Rs.)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.paymentInvoiceId}</td>
                <td>{payment.name}</td>
                <td>Rs.{payment.total}</td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "pending"
                        ? "bg-warning"
                        : payment.status === "completed"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>
                  {payment.status === "pending" && (
                    <>
                      <Button
                        variant="outline-success"
                        onClick={() => handleApproveConfirmation(payment.paymentInvoiceId)}
                      >
                        Approve
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCancelConfirmation(payment.paymentInvoiceId)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={confirmationDialog.show} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {confirmationDialog.action} this payment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmationClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmationAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PendingPayments;
