import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { CusAuthContext } from "../../../../context/cus-authcontext";

function Completedorderhistory() {
 
const cusauth = useContext(CusAuthContext); 
const [completedorder, setcompletedorder] = useState([]); 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const email = cusauth.email;

  useEffect(() => {
    function getcompletedorder() {
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/getordercompleted`)
        .then((res) => {
          setcompletedorder(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getcompletedorder();
  }, []);

  const handleMoreButtonClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredCompletedOrders = completedorder.filter(order => order.email === email);


  return (
      <>
    <Table >
    <thead>
      <tr>
        <th>OrderID</th>
        <th>Date</th>
        <th>Total</th>
        <th>Status</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
    {filteredCompletedOrders.map((completedorder) => (
      <tr key={completedorder._id}>
        <td>{completedorder.orderId}</td>
        <td>{completedorder.date.split('T')[0]}</td>
        <td>{completedorder.total}</td>
        <td ><Badge bg="success">{completedorder.status}</Badge></td>
        <td><Button variant="secondary" onClick={() => handleMoreButtonClick(completedorder)}>more</Button>
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
    {selectedOrder?.products && (
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedOrder.products).map(productId => (
            <tr key={productId}>
              <td>{selectedOrder.products[productId].product_name}</td>
              <td>{selectedOrder.products[productId].unit_price}</td>
              <td>{selectedOrder.products[productId].quantity}</td>
              <td>{selectedOrder.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Modal.Body>
</Modal>
</>
  )
}
export default Completedorderhistory