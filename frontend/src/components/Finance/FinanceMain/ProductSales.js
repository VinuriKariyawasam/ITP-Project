import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Badge } from "react-bootstrap";
import axios from "axios";
import PageTitle from "./PageTitle";

const ProductSales = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approvedSpareParts, setApprovedSpareParts] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    function getApprovedSpareParts() {
      axios
        .get("http://localhost:5000/Product/approvedsp")
        .then((res) => {
          setApprovedSpareParts(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getApprovedSpareParts();
  }, []);

  useEffect(() => {
    function getPendingOrder() {
      axios
        .get("http://localhost:5000/Product/getorderpending")
        .then((res) => {
          setPendingOrder(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getPendingOrder();
  }, []);

  useEffect(() => {
    function getCompletedOrder() {
      axios
        .get("http://localhost:5000/Product/getordercompleted")
        .then((res) => {
          setCompletedOrder(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getCompletedOrder();
  }, []);

  const getPendingOrder = () => {
    axios
      .get("http://localhost:5000/Product/getorderpending")
      .then((res) => {
        setPendingOrder(res.data);
      })
      .catch((err) => {
        alert("error");
      });
  };

  const handleMoreButtonClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApprove = (order) => {
    axios.put(`http://localhost:5000/Product/updatetoongoing/${order._id}`, { status: "ongoing" })
      .then((res) => {
        console.log("Order Approved:", order);
        getPendingOrder(); // Refresh pending orders
      })
      .catch((err) => {
        console.error("Error approving order:", err);
        // Handle error
      });
  };
  
  const productApprove = (order) => {
    axios.put(`http://localhost:5000/Product/updatetocompletedorder/${order._id}`, { status: "completed" })
      .then((res) => {
        console.log("Product Order Approved:", order);
        getPendingOrder(); // Refresh pending orders
      })
      .catch((err) => {
        console.error("Error approving product order:", err);
        // Handle error
      });
  };

  const filteredPendingOrders = pendingOrder.filter((order) =>
    order.date.includes(searchDate)
  );



  return (
    <main id="main" className="main">
      <PageTitle path="Finance / ProductSales" title="Products and Spare Parts Sales" />
      <br />
      <div>
        <h4>Pending Spare Parts Orders</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Vehicle Number</th>
              <th>Contact Number</th>
              <th>Total</th>
              <th>Status</th>
              <th>Explore</th>
              <th>Action</th> {/* New action column */}
            </tr>
          </thead>
          <tbody>
            {approvedSpareParts.map((SpareParts) => (
              <tr key={SpareParts._id}>
                <td>{SpareParts.name}</td>
                <td>{SpareParts.vehicleNumber}</td>
                <td>{SpareParts.contactNumber}</td>
                <td>{SpareParts.total}</td>
                <td>
                  <Badge bg="primary">In Finance</Badge>
                </td>
                <td>
                  <Button variant="secondary" onClick={() => handleMoreButtonClick(SpareParts)}>more</Button>
                </td>
                <td>
                  <Button variant="success" onClick={() => handleApprove(SpareParts)}>Approve</Button> {/* Approve button */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img style={{ width: "50%", height: "50%" }} src={`http://localhost:5000/${selectedOrder?.image}`} alt="Product Image" />
            <p>Customer Name: {selectedOrder?.name}</p>
            <p>Vehicle Number: {selectedOrder?.vehicleNumber}</p>
            <p>Vehicle Brand: {selectedOrder?.brand}</p>
            <p>Model: {selectedOrder?.model}</p>
            <p>Year: {selectedOrder?.year}</p>
            <p>Color: {selectedOrder?.color}</p>
            <p>Contact Number: {selectedOrder?.contactNumber}</p>
            <p>Description: {selectedOrder?.description}</p>
            <p>Total: Rs.{selectedOrder?.total}</p>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>

      <h3>Pending Product Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Details</th>
            <th>Action</th> {/* New action column */}
          </tr>
        </thead>
        <tbody>
          {filteredPendingOrders.map((pendingorder) => (
            <tr key={pendingorder._id}>
              <td>{pendingorder.orderId}</td>
              <td>{pendingorder.date.split('T')[0]}</td>
              <td>{pendingorder.total}</td>
              <td>
                <Badge bg="warning">{pendingorder.status}</Badge>
              </td>
              <td>
                <Button variant="secondary" onClick={() => handleMoreButtonClick(pendingorder)}>more</Button>
              </td>
              <td>
                <Button variant="success" onClick={() => productApprove(pendingorder)}>Approve</Button> {/* Approve button */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Order Details:</p>
          {selectedOrder?.products && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedOrder.products).map(productId => (
                  <tr key={productId}>
                    <td>{selectedOrder.products[productId].product_name}</td>
                    <td>{selectedOrder.products[productId].unit_price}</td>
                    <td>{selectedOrder.products[productId].quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default ProductSales;
