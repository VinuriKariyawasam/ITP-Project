import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Badge } from "react-bootstrap";
import axios from "axios";
import PageTitle from "./PageTitle";

const ProductSales = ({ toggleLoading }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approvedSpareParts, setApprovedSpareParts] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const getApprovedSpareParts = async () => {
    try {
      toggleLoading(true);
      const res = await axios.get(
        `${process.env.React_App_Backend_URL}/Product/approvedsp`
      );
      setApprovedSpareParts(res.data);
    } catch (error) {
      console.error("Error fetching approved spare parts:", error);
      alert("Error fetching approved spare parts");
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    getApprovedSpareParts();
  }, []);

  useEffect(() => {
    const getPendingOrder = async () => {
      try {
        toggleLoading(true);
        const res = await axios.get(
          `${process.env.React_App_Backend_URL}/Product/getorderpending`
        );
        setPendingOrder(res.data);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
        alert("Error fetching pending orders");
      } finally {
        toggleLoading(false);
      }
    };
    getPendingOrder();
  }, []);

  useEffect(() => {
    const getCompletedOrder = async () => {
      try {
        toggleLoading(true);
        const res = await axios.get(
          `${process.env.React_App_Backend_URL}/Product/getordercompleted`
        );
        setCompletedOrder(res.data);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
        alert("Error fetching completed orders");
      } finally {
        toggleLoading(false);
      }
    };
    getCompletedOrder();
  }, []);

  const getPendingOrder = () => {
    axios
      .get(`${process.env.React_App_Backend_URL}/Product/getorderpending`)
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
    axios
      .put(
        `${process.env.React_App_Backend_URL}/Product/updatetoongoing/${order._id}`,
        { status: "ongoing" }
      )
      .then((res) => {
        console.log("Order Approved:", order);
        getPendingOrder();
        getApprovedSpareParts(); // Refresh pending orders
      })
      .catch((err) => {
        console.error("Error approving order:", err);
        // Handle error
      });
  };

  const productApprove = (order) => {
    axios
      .put(
        `${process.env.React_App_Backend_URL}/Product/updatetocompletedorder/${order._id}`,
        { status: "completed" }
      )
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
      <PageTitle
        path="Finance / ProductSales"
        title="Products and Spare Parts Sales"
      />
      <br />
      <div>
        <h4>Pending Spare Parts Orders</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Explore</th>
              <th>Action</th> {/* New action column */}
            </tr>
          </thead>
          <tbody>
            {approvedSpareParts.map((SpareParts) => (
              <tr key={SpareParts._id}>
                <td>{SpareParts.orderId}</td>
                <td>{SpareParts.name}</td>
                <td>{SpareParts.email}</td>
                <td>{SpareParts.contactNumber}</td>
                <td>{SpareParts.orderdate.split("T")[0]}</td>
                <td>{SpareParts.total}</td>
                <td>
                  <Badge bg="primary">In Finance</Badge>
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleMoreButtonClick(SpareParts)}
                  >
                    more
                  </Button>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleApprove(SpareParts)}
                  >
                    Approve
                  </Button>{" "}
                  {/* Approve button */}
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
            <img
              style={{ width: "50%", height: "50%" }}
              src={`http://localhost:5000/${selectedOrder?.image}`}
              alt="Product Image"
            />
            <p>Order Id: {selectedOrder?.orderId}</p>
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
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>

      <h3>Pending Product Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Email</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th> {/* New action column */}
          </tr>
        </thead>
        <tbody>
          {filteredPendingOrders.map((pendingorder) => (
            <tr key={pendingorder._id}>
              <td>{pendingorder.orderId}</td>
              <td>{pendingorder.email}</td>
              <td>{pendingorder.date.split("T")[0]}</td>
              <td>{pendingorder.total}</td>
              <td>
                <Badge bg="warning">{pendingorder.status}</Badge>
              </td>

              <td>
                <Button
                  variant="success"
                  onClick={() => productApprove(pendingorder)}
                >
                  Approve
                </Button>{" "}
                {/* Approve button */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default ProductSales;
