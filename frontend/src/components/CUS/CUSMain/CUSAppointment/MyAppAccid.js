import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function MyAppAccid() {

    const [showModal, setShowModal] = useState(false);
    const [accidentalAppointment, setaccidentalAppointment] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
   

    /*useEffect(() => {
        getPeriodicalData(userId);
    }, []); 

    let userId = "guygv";
    const getPeriodicalData = async (userId) => {
        try {
            

            const response = await axios.get(`http://localhost:5000/appointment/get-accidentalAppointmentbyuserId/${userId}`);
            setaccidentalAppointment(response.data.data);

        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const Delete = (id) => {
   
        axios.delete(`http://localhost:5000/appointment/delete-mechanicalAppointment/${id}`)
          .then(response => {
            console.log(response);
            window.location.reload();
            alert("Appointment Canceled")
          })
          .catch(error => {
            // Handle errors here
            console.error(error);
          });
      
    };
    */

    const handleCloseModal = () => {
        setShowModal(false);
    };
   /* const handleMoreButtonClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };*/
   
    return(

        <div>
   <Table striped bordered hover>
      <thead>
            <tr>
              <th>Vehicle No</th>
              <th>Customer Name</th>
              <th>Date and Time</th>
              <th>Contact No</th>
              <th>damaged Occured</th>
            </tr>
          </thead>

          <tbody>
      <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <Button variant="secondary" >
                    More
      </Button></td>
              </tr>
  </tbody>
    </Table>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Accidental Repair Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{width:"50%",height:"50%"}} />
          <p>:Vehicle No: </p>
          <p>Customer Name: </p>
          <p>Vehicle Type:  </p>
          <p>Accident occured on:</p>
          <p>Damaged Occured:</p>
          <p>Date and Time: </p>
          <p>Contact No: </p>
          <p>Image </p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" >
        Update
          </Button>
          <Button variant="success" onClick={handleCloseModal}>
            cancle
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    )


}

export default MyAppAccid;