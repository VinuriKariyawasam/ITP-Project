import React from 'react'
import ImPageTitle from "../ImPageTitle";
import { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import axios from "axios";
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';

function Sales({ toggleLoading }) {
const [key, setKey] = useState('pending');
const [pendingorder, setpendingorder] = useState([]); 
const [completedorder, setcompletedorder] = useState([]); 
const [selectedOrder, setSelectedOrder] = useState(null);
const [showModal, setShowModal] = useState(false);
const [searchDate, setSearchDate] = useState('');

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
      })
      .finally(() => {
        toggleLoading(false);
      });
  }
  getpendingorder();
}, []);

  useEffect(() => {
    function getcompletedorder() {
        toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/getordercompleted`)
        .then((res) => {
          setcompletedorder(res.data);
        })
        .catch((err) => {
          alert("error");
        }).finally(() => {
          toggleLoading(false);
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


  const filteredPendingOrders = pendingorder.filter(order =>
    order.date.includes(searchDate)
);

const filteredCompletedOrders = completedorder.filter(order =>
    order.date.includes(searchDate)
);

const handleClear = () => {
  setSearchDate('');
};

return (
<main id="main" className="main">
 <ImPageTitle title="Sales" url="/staff/im/sales" />
 <div style={{ display: 'flex', alignItems: 'center' ,marginBottom:"2%"}}>
      <input
        type="date"
        placeholder="Search by Date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: 'none',
          outline: 'none',
          transition: 'border-color 0.3s ease',
          width: '200px', 
        }}
      />
      <button
        onClick={handleClear}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          backgroundColor: '#ddd',
          border: 'none',
          borderRadius: '5px',
          marginLeft: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        Clear
      </button>
    </div>
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
      <th>Total Rs.</th>
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
    <p>Order Details:</p>
    {selectedOrder?.products && (
      <Table>
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
</Tab>
<Tab eventKey="approved" title="completed orders">
    
    <Table >
    <thead>
      <tr>
        <th>OrderID</th>
        <th>Date</th>
        <th>Total Rs.</th>
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
    <p>Order Details:</p>
    {selectedOrder?.products && (
      <Table>
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
  </Tab>
</Tabs>

</main>
)

}
export default Sales