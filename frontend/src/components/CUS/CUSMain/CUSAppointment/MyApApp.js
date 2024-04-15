import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function MyApApp(){
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null); 

<div>
<Table striped bordered hover>
        <thead>
          <tr>

            <th>Customer Name</th>
            <th>Service Type</th>
            <th>Issue</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>

</tbody>
      </Table>

   <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Periodical Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img style={{width:"50%",height:"50%"}} />
        <p>:Vehicle No: </p>
        <p>Customer Name: </p>
        <p>Vehicle Type:  </p>
        <p>Service Type:  </p>
        <p>Requesting service: </p>
        <p>Date and Time: </p>
        <p>Contact No: </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleCloseModal}>
          cancle
        </Button>
      </Modal.Footer>
    </Modal>
      </div>
}

export default MyApApp
      