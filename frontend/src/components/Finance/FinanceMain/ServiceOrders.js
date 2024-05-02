import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import axios from "axios";
import { Table, Container, Row, Col, Button, Modal } from "react-bootstrap";
import { f } from "html2pdf.js";

const ServiceOrders = ({toggleLoading}) => {
  const [allServiceOrders, setAllServiceOrders] = useState([]);
  const [pendingServiceOrders, setPendingServiceOrders] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);

  useEffect(() => {
    const fetchAllServiceOrders = async () => {
        try {
          toggleLoading(true)
            const response = await axios.get(`${process.env.React_App_Backend_URL}/api/finance/service-record/all`);
            setAllServiceOrders(response.data);
        } catch (error) {
            console.error("Error fetching all service orders:", error);
        }finally{
          toggleLoading(false)
        }
    };

    const fetchPendingServiceOrders = async () => {
        try {
          toggleLoading(true)
            const response = await axios.get(`${process.env.React_App_Backend_URL}/api/finance/service-record/pending`);
            setPendingServiceOrders(response.data);
        } catch (error) {
            console.error("Error fetching pending service orders:", error);
        }finally{
          toggleLoading(false)
         }
    };

    fetchAllServiceOrders();
    fetchPendingServiceOrders();
}, []);

  const markAsCompleted = (orderId) => {
    setConfirmationModal(true);
    setOrderIdToDelete(orderId);
  };

  const confirmMarkAsCompleted = async () => {
    try {
      await axios.patch(
        `${process.env.React_App_Backend_URL}/api/finance/service-record/update/${orderIdToDelete}`,
        { price: 'Rs. 2000.00' }
      );

      console.log(`Order ${orderIdToDelete} marked as completed.`);
      // Refresh data after marking as completed
      const updatedPendingServiceOrders = pendingServiceOrders.filter(
        (order) => order._id !== orderIdToDelete
      );
      setPendingServiceOrders(updatedPendingServiceOrders);
    } catch (error) {
      console.error("Error marking order as completed:", error);
    } finally {
      setConfirmationModal(false);
    }
  };

  const cancelMarkAsCompleted = () => {
    setConfirmationModal(false);
    setOrderIdToDelete(null);
  };

  return (
    <>
      <main id="main" className="main">
        <PageTitle path="Finance / ServiceOrders" title="Service Orders" />
        <Container>
          <Row>
            <Col>
              <div>
                <h3>Pending Service Orders</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Service Report ID</th>
                      <th>Vehicle Number</th>
                      <th>Total for Parts/Accessories</th>
                      <th>Total for Services/Repairs</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingServiceOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.serviceReportId}</td>
                        <td>{order.vehicleNumber}</td>
                        <td>{"Rs. " + parseFloat(order.inventoryTotalPrice).toFixed(2)}</td>
                        <td>{"Rs. " + parseFloat(order.totalServicePrice).toFixed(2)}</td>
                        <td>
                          <Button
                            onClick={() => markAsCompleted(order._id)}
                            disabled={confirmationModal}
                          >
                            Mark as Completed
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <div>
                <h3>All Service Orders</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Service Report ID</th>
                      <th>Vehicle Number</th>
                      <th>Total for Parts/Accessories</th>
                      <th>Total for Services/Repairs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allServiceOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.serviceReportId}</td>
                        <td>{order.vehicleNumber}</td>
                        <td>{"Rs. " + parseFloat(order.inventoryTotalPrice).toFixed(2)}</td>
                        <td>{"Rs. " + parseFloat(order.totalServicePrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal show={confirmationModal} onHide={cancelMarkAsCompleted}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Mark as Completed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to mark this order as completed?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={cancelMarkAsCompleted}>
              No
            </Button>
            <Button variant="success" onClick={confirmMarkAsCompleted}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default ServiceOrders;
