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
        .get("http://localhost:5000/Product/ongoingsp")
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

    const updateorder = {
      status: 'completed',
     
    };
    
    axios
      .put(`http://localhost:5000/Product/updatetocomplete/${SpareParts._id}`, updateorder)
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
        subject: `Order completed${id}`,
        text: `Your order completed, Thanks for shopping with us!!!`,
        html: null,
      };

      axios
        .post(
          "http://localhost:5000/Product/sendrejectemail",
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
                  onClick={() => handleNotifyButtonClick(SpareParts._id,SpareParts.email)}
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
            src={`http://localhost:5000/${selectedOrder?.image}`}
            alt="Product Image"
          />
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