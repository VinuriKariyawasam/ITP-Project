import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
function Sptable1() {
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

      const handleReject = (id, email) => {
        const shouldDelete = window.confirm('Confirm Delete');
        if (shouldDelete) {
          const emailData = {
            to: email ,
            subject: `Order Rejection`,
            text: `Sorry, We can't provide your product`,
            html: null,
          };
    
          axios
            .post(
              "http://localhost:5000/Product/sendrejectemail",
              emailData
            )
            .then((response) => {
              console.log(response.data);
              
              axios
                .delete(`http://localhost:5000/Product/deletependingsp/${id}`)
                .then((response) => {
                  console.log(response);
                  setShowModal(false); 
                  window.location.reload(); 
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error("Error sending email:", error);
            });
        }
      };

      const handleApprove = (order) => {
        console.log(order)
        const totalString = window.prompt('Enter total: Rs.');
        const total = parseFloat(totalString);

        const formData = {
          id: order._id,
          name: order.name,
          vehicleNumber: order.vehicleNumber,
          brand: order.brand,
          model: order.model,
          year: order.year,
          color: order.color,
          contactNumber: order.contactNumber,
          description: order.description,
          image: order.image,
          status: "approved",
          email: order.email,
          total: total
        };
      console.log(formData)

      axios.post("http://localhost:5000/Product/addapprovedsp",formData).then((res) =>{
          console.log(res.data)
          const newOrderId = res.data.order._id;
          
          const emailData = {
            to: order.email,
            subject: `Your Cart Details orderID :${newOrderId}`,
            text: `Here are your cart details: `,
            html: null,
            orderId:newOrderId,
          };

          axios
            .post(
              "http://localhost:5000/Product/sendinventoryemail",
              emailData
            )
            .then((response) => {
              console.log(response.data);

              axios
                .delete(`http://localhost:5000/Product/deletependingsp/${order._id}`)
                .then((response) => {
                  console.log(response);
                  setShowModal(false); 
                  window.location.reload(); 
                })
                .catch((error) => {
                  console.error(error);
                });
            }).catch((error) => {
              console.error("Error sending email:", error);
            });
      }).catch((err) =>{
        console.log(err)
      });
      
      }
      const handleMoreButtonClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
      };
      const handleCloseModal = () => {
        setShowModal(false);
      };

  return (
    <div>   
    <Table>
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Vehicle Number</th>
        <th>Contact Number</th>
        <th>Status</th>
        <th>Explore</th>
      </tr>
    </thead>
    <tbody>
    {SpareParts.map((SpareParts) => (
      <tr key={SpareParts._id}>
        <td>{SpareParts.name}</td>
        <td>{SpareParts.vehicleNumber}</td>
        <td>{SpareParts.contactNumber}</td>
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
      <Button variant="danger" onClick={() => handleReject(selectedOrder?._id,selectedOrder?.email)}>
      Reject
        </Button>
        <Button variant="success" onClick={() =>handleApprove(selectedOrder)}>
          Approve
        </Button>
      </Modal.Footer>
    </Modal></div>
  )
}

export default Sptable1