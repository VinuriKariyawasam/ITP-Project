import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";

function Sptable3() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approvedSpareParts, setapprovedSpareParts] = useState([]);

  useEffect(() => {
    function getapprovedSpareparts() {
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/ongoingsp`)
        .then((res) => {
          setapprovedSpareParts(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getapprovedSpareparts();
  }, []);

  const handleMoreButtonClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSuccessClick = (SpareParts) => {

    
    const currentDateUTC = new Date();
    currentDateUTC.setHours(currentDateUTC.getHours() + 5); 
    currentDateUTC.setMinutes(currentDateUTC.getMinutes() + 30); 
    const formattedDate = currentDateUTC.toISOString(); 


    const updateorder = {
      status: 'completed',
      completeddate: formattedDate
     
    };
    
    axios
      .put(`${process.env.React_App_Backend_URL}/Product/updatetocomplete/${SpareParts._id}`, updateorder)
    .then((response) => {
      console.log(response.data);
      window.location.reload(); 
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });

  }

  const handleNotifyButtonClick = (id,email) =>{

    const emailData = {
        to: email ,
        subject: `Your Order Ready : ${id}`,
        text: `Your order is ready, visit us and pickup your order!!!`,
        html: null,
      };

      axios
        .post(
          `${process.env.React_App_Backend_URL}/Product/sendrejectemail`,
          emailData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Vehicle Number</th>
            <th>Contact Number</th>
            <th>Ordered date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Explore</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvedSpareParts.map((SpareParts) => (
            <tr key={SpareParts._id}>
              <td>{SpareParts.name}</td>
              <td>{SpareParts.vehicleNumber}</td>
              <td>{SpareParts.contactNumber}</td>
              <td>{SpareParts.orderdate.split('T')[0]}</td>
              <td>{SpareParts.total}</td>
              <td>
                <Badge bg="danger">{SpareParts.status}</Badge>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleMoreButtonClick(SpareParts)}
                >
                  more
                </Button>
              </td>
              <td><Button
                  variant="warning"
                  onClick={() => handleNotifyButtonClick(SpareParts.orderId,SpareParts.email)}
                >
                  notify
                </Button>
                <Button
                style={{marginLeft:"2%"}}
                  variant="success"
                  onClick={() => handleSuccessClick(SpareParts)}
                >
                  complete
                </Button></td>
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
            src={`${selectedOrder?.image}`}
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
  );
}

export default Sptable3;
