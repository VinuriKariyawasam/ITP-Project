import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import { CusAuthContext } from "../../../../context/cus-authcontext";
import Completedorderhistory from './completedorderhistory';
import Notapproved from './Notapproved';
import Approved from './Approved';
import Ongoing from './Ongoing';
import Completedsp from './Completedsp';
import { Link } from 'react-router-dom';

function OrderHistory({ toggleLoading }) {
  const cusauth = useContext(CusAuthContext); 
  const [key, setKey] = useState('pending');
  const [spKey,setspkey] = useState('pending');
  const [pendingorder, setpendingorder] = useState([]); 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const email = cusauth.email;

  useEffect(() => {
    function getpendingorder() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/getorderpending`)
        .then((res) => {
          setpendingorder(res.data);
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
        });
    }
    getpendingorder();
  }, []);


  const handleMoreButtonClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredPendingOrders = pendingorder.filter(order => order.email === email);
  

  return (
    <div style={{ margin: "1%" }}>
      <h1 style={{ textAlign: "center" }}>MY ORDERS </h1>
      <h3>Product Orders </h3>
      <div style={{ marginLeft: "2%", marginRight: "5%", height: "300px", overflow: "auto"}}>
      <Tabs
  id="controlled-tab-example"
  activeKey={key}
  onSelect={(k) => setKey(k)}
  className="mb-3"
>
<Tab eventKey="pending" title="To be pay orders">
    
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
    {filteredPendingOrders.map((pendingorder) => (
      <tr key={pendingorder._id}>
        <td>{pendingorder.orderId}</td>
        <td>{pendingorder.date.split('T')[0]}</td>
        <td>{pendingorder.total}</td>
        <td ><Badge bg="warning">{pendingorder.status}</Badge></td>
        <td><Button variant="secondary" onClick={() => handleMoreButtonClick(pendingorder)}>more</Button>
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
              <th>Total Rs.</th>
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
    <Modal.Footer>
    <Link to="/customer/payments/payonline">
      <Button variant="primary">Pay</Button>
      </Link>
    </Modal.Footer>
  </Modal>
  </Tab>
  <Tab eventKey="approved" title="completed orders">
    <Completedorderhistory toggleLoading={toggleLoading}/>
    </Tab>
 </Tabs>
 </div>
 <h3>Spare Parts Orders </h3>
 <Tabs
  id="controlled-tab-example"
  activeKey={spKey}
  onSelect={(key) => setspkey(key)}
  className="mb-3"
>
<Tab eventKey="pending" title="To be approve orders">
    
<Notapproved toggleLoading={toggleLoading}/>
</Tab>
<Tab eventKey="topay" title="To be pay orders">
  <Approved toggleLoading={toggleLoading}/>
</Tab>
<Tab eventKey="ongoing" title="To be complete orders">
  <Ongoing toggleLoading={toggleLoading}/>
</Tab>
<Tab eventKey="comp" title="completed orders">
  <Completedsp toggleLoading={toggleLoading}/>
</Tab>
 </Tabs>
    </div>
  );
}

export default OrderHistory;
