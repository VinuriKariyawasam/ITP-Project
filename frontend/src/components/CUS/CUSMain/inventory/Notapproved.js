import React from 'react'
import { useState,useEffect, useContext } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CusAuthContext } from "../../../../context/cus-authcontext";
import Badge from 'react-bootstrap/Badge';

function Notapproved({ toggleLoading }) {
  const cusauth = useContext(CusAuthContext); 
  const [SpareParts, setSpareparts] = useState([]); 
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
  const email = cusauth.email;
    useEffect(() => {
        function getSpareparts() {
          toggleLoading(true);
          axios
            .get(`${process.env.React_App_Backend_URL}/Product/pendingsp`)
            .then((res) => {
              setSpareparts(res.data);
            })
            .catch((err) => {
              alert("error");
            }).finally(() => {
              toggleLoading(false);
            });
        }
        getSpareparts();
      }, []);

      const handleReject = (id,Image) => {
        
        const image = Image
        console.log(image)
        const shouldDelete = window.confirm('Confirm Remove');
        if (shouldDelete) {
          toggleLoading(true);
              axios
                .delete(`${process.env.React_App_Backend_URL}/Product/deletependingsp/${id}`, { data: { image } })
                .then((response) => {
                  console.log(response);
                  setShowModal(false); 
                  window.location.reload(); 
                })
                .catch((error) => {
                  console.error(error);
                }).finally(() => {
                  toggleLoading(false);
                });
        }
      }

      const handleMoreButtonClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
      };
      const handleCloseModal = () => {
        setShowModal(false);
      };

      const filteredPendingspareparts = SpareParts.filter(Sparepart => Sparepart.email === email);
  

  return (<div style={{margin:"3%"}}>   
    <Table>
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Vehicle Number</th>
        <th>Contact Number</th>
        <th>Ordered date</th>
        <th>Status</th>
        <th>Explore</th>
      </tr>
    </thead>
    <tbody>
    {filteredPendingspareparts.map((SpareParts) => (
      
      <tr key={SpareParts._id}>
        <td>{SpareParts.name}</td>
        <td>{SpareParts.vehicleNumber}</td>
        <td>{SpareParts.contactNumber}</td>
        <td>{SpareParts.orderdate.split('T')[0]}</td>
        <td><Badge bg="warning">{SpareParts.status}</Badge></td>
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
        <img style={{width:"50%",height:"50%"}} src={`${selectedOrder?.image}`} alt="Product Image" />
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
      <Button variant="danger" onClick={() => handleReject(selectedOrder?._id,selectedOrder?.image)}>
      Remove
        </Button>
      </Modal.Footer>
    </Modal></div>
  )
}

export default Notapproved