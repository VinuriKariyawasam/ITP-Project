import React, { useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { CusAuthContext } from "../../../../context/cus-authcontext";

function MyAppCom({ toggleLoading }){

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const cusauth = useContext(CusAuthContext)



  let userId = cusauth.userId;

  const getcompletedData = async (userId) => {

    try {

      const currentDate = new Date();
      toggleLoading(true);
      const response = await axios.get(`${process.env.React_App_Backend_URL}/appointment/get-completedappointmentbyuserId/${userId}`);
     // Filter appointments whose date is after the current date
     const filteredAppointments = response.data.data.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentdate);
      return appointmentDate > currentDate;
    });
    setAppointments(filteredAppointments);
    setLoading(false);

    } catch (error) {
      console.error('Error fetching appointments:', error);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  useEffect(() => {
    if (cusauth.userId) {
      getcompletedData(cusauth.userId)
    }

  }, [cusauth.userId])
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);

  };
 
  return (
    <div>
       {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p style={{fontSize: '24px', color: 'darkblue'}}>No appointments</p>

      ) : (
        <div style={{ marginLeft: "30px" , marginRight: "20px"}}> {/* Adding left margin to the table */}
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
          {appointments.map(appointment => (
            <tr key={appointment._id} >
              <td>{appointment.name}</td>
              <td>{appointment.serviceType}</td>
              <td>{appointment.issue}</td>
              <td>{appointment.appointmenttime}</td>
              <td> <Button variant="secondary" onClick={() => handleMoreButtonClick(appointment)}>
                More
              </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      )}
      {selectedAppointment && (

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Completed Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img style={{ width: "50%", height: "50%" }} />
            <p>Vehicle No:{selectedAppointment.vNo} </p>
            <p>Customer Name:{selectedAppointment.name} </p>
            <p>Vehicle Type:{selectedAppointment.vType}  </p>
            <p>Service Type:{selectedAppointment.serviceType}  </p>
            <p>Requesting service:{selectedAppointment.issue} </p>
            <p>Date and Time:{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}</p>
            <p>Contact No:{selectedAppointment.contactNo} </p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}

export default MyAppCom
