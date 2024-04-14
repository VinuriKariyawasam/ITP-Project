import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function MyApPer() {

    const [showModal, setShowModal] = useState(false);
    const [periodicalAppointment, setperiodicalAppointment] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    useEffect(() => {
        getPeriodicalData(userId);
    }, []); 

    let userId = "guygv";
    const getPeriodicalData = async (userId) => {
        try {
            

            const response = await axios.get(`http://localhost:5000/appointment/get-periodicalAppointmentbyuserId/${userId}`);
            setperiodicalAppointment(response.data.data);

        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const Delete = (id) => {
   
        axios.delete(`http://localhost:5000/appointment/delete-periodicalAppointment/${id}`)
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
    

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleMoreButtonClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    return (
        <div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Vehicle No</th>
                        <th>Customer Name</th>
                        <th>Date and Time</th>
                        <th>Contact No</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {periodicalAppointment.map((appointment) => (
                        <tr key={appointment._id} >

                            <td>{appointment.vNo}</td>
                            <td>{appointment.name}</td>
                            <td>{`${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}`}</td>
                            <td>{appointment.phone}</td>
                            <td>{appointment.sType}</td>
                            <td>
                                <Button variant="secondary" onClick={() => handleMoreButtonClick(appointment)}>
                                    More
                                </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedAppointment && (
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Periodical Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img style={{ width: "50%", height: "50%" }} />
                    <p>:Vehicle No: {selectedAppointment.vNo}</p>
                    <p>Customer Name: {selectedAppointment.name}</p>
                    <p>Vehicle Type: {selectedAppointment.vType}</p>
                    <p>Requesting service:{selectedAppointment.sType} </p>
                    <p>Last Service Year: {selectedAppointment.lastServiceYear} </p>
                    <p>Last Service Month:{selectedAppointment.lastServiceMonth} </p>
                    <p>Mileage: {selectedAppointment.mileage}</p>
                    <p>Description:{selectedAppointment.msg}</p>
                    <p>Date and Time:{`${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}`} </p>
                    <p>Contact No: {selectedAppointment.phone}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" >
                        Update
                    </Button>
                    <Button variant="success" onClick={() => Delete(selectedAppointment._id)}>
                        cancle
                    </Button>
                </Modal.Footer>
            </Modal>
            )}
        </div>

    )
}

export default MyApPer;