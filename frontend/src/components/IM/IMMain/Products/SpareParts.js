import React from 'react'
import ImPageTitle from "../ImPageTitle";
import { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import axios from "axios";
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SpareParts() {

    const [key, setKey] = useState('pending');
    const [SpareParts, setSpareparts] = useState([]); 
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        function getSpareparts() {
          axios
            .get("http://localhost:5000/Product/pendingsp")
            .then((res) => {
              setSpareparts(res.data);
            })
            .catch((err) => {
              alert("error");
            });
        }
        getSpareparts();
      }, []);
      const handleReject = (id) => {
        const shouldDelete = window.confirm('Confirm Delete');
        if (shouldDelete) {
          axios
            .delete(`http://localhost:5000/Product/deletependingsp/${id}`)
            .then((response) => {
              console.log(response);
              setShowModal(false); // Close modal after deletion
              window.location.reload(); // Reload page (may not be the best approach)
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
    
    
      const handleMoreButtonClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
      };
      const handleCloseModal = () => {
        setShowModal(false);
      };

  return (
    <main id="main" className="main">
     <ImPageTitle title="Spare parts order" url="/staff/im/sp" />
     <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="pending" title="Pending orders">
        
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Vehicle Number</th>
          <th>Contact Number</th>
          <th>Explore</th>
        </tr>
      </thead>
      <tbody>
      {SpareParts.map((SpareParts) => (
        <tr key={SpareParts._id}>
          <td>{SpareParts.name}</td>
          <td>{SpareParts.vehicleNumber}</td>
          <td>{SpareParts.contactNumber}</td>
          <td><Button variant="secondary" onClick={() => handleMoreButtonClick(SpareParts)}>more</Button>
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
          <img style={{width:"50%",height:"50%"}} src={`http://localhost:5000/${selectedOrder?.image}`} alt="Product Image" />
          <p>Customer Name: {selectedOrder?.name}</p>
          <p>Vehicle Number: {selectedOrder?.vehicleNumber}</p>
          <p>Vehicle Brand: {selectedOrder?.brand}</p>
          <p>Model: {selectedOrder?.model}</p>
          <p>Year: {selectedOrder?.year}</p>
          <p>Color: {selectedOrder?.color}</p>
          <p>Contact Number: {selectedOrder?.contactNumber}</p>
          <p>Description: {selectedOrder?.description}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={() => handleReject(selectedOrder?._id)}>
        Reject
          </Button>
          <Button variant="success" onClick={handleCloseModal}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
      </Tab>
      <Tab eventKey="approved" title="Approved orders">
        
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

      </Tab>
      <Tab eventKey="ongoing" title="Ongoing orders" >
        
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

      </Tab>
      <Tab eventKey="completed" title="Completed orders">
        
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

      </Tab>
    </Tabs>
    
    </main>
  )
}

export default SpareParts