import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const SMMechanicalRepairs = ({ toggleLoading }) => {

  //create an empty array to store details
  const [mechanicalAppointment, setmechanicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const[cusType,setcusType]=useState("")
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [serviceType, setserviceType] = useState("");
  const [issue, setissue] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");


  function sendata(e) {
    e.preventDefault();
    const serviceType = "Mechanical Repairs";
    const newacceptedappointment = {
      userId,
      name,
      cusType,
      vType,
      vNo,
      serviceType,
      issue,
      contactNo,
      appointmentdate,
      appointmenttime,

    }
    toggleLoading(true); 
    axios.post(`${process.env.React_App_Backend_URL}/appointment/addacceptedappointment`, newacceptedappointment).then(() => {
      alert("Appointment added to the calender")
      senddatamechanicalAppointmentHistory(selectedAppointment);
      Delete(selectedAppointment._id);

    }).catch((err) => {
      alert(err)
    }).finally(()=>{
      toggleLoading(false); 
    });
  
  }
  function senddatamechanicalAppointmentHistory() {

    //create javascript object
    const newacceptedmechanicalAppointment = {
      userId,
      name,
      cusType,
      vType,
      vNo,
      issue,
      contactNo,
      appointmentdate,
      appointmenttime

    }
    toggleLoading(true); 

    axios.post(`${process.env.React_App_Backend_URL}/appointment/addacceptedmechanicalAppointment`, newacceptedmechanicalAppointment).then(() => {
     
    }).catch((err) => {
      alert(err)
    }).finally(()=>{
      toggleLoading(false); 
    });

  }

  //set values to columnns in accepted appointment
  const handleTableRowClick = (appointment) => {
    setuserId(appointment.userId);
    setname(appointment.name);
    setcusType(appointment.cusType)
    setvType(appointment.vType);
    setvNo(appointment.vNo);
    setserviceType(appointment.serviceType);
    setissue(appointment.issue);
    setcontactNo(appointment.contactNo);
    setappointmentdate(appointment.appointmentdate);
    setappointmenttime(appointment.appointmenttime);
  };

  useEffect(() => {

    function getmechanicalAppointment() {
      toggleLoading(true); 

      axios.get(`${process.env.React_App_Backend_URL}/appointment/get-mechanicalAppointment`).then((res) => {
        const sortedAppointments = res.data.sort((a, b) => {
          return new Date(a.appointmentdate) - new Date(b.appointmentdate);
        });
        setmechanicalAppointment(sortedAppointments);
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      }).finally(()=>{
        toggleLoading(false); 
      });
    }
    getmechanicalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };

  const Delete = (id) => {
    toggleLoading(true); 
      axios.delete(`${process.env.React_App_Backend_URL}/appointment/delete-mechanicalAppointment/${id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          // Handle errors here
          console.error(error);
        }).finally(()=>{
          toggleLoading(false); 
        });
    
  };


  return (
    <main id="main" className="main">
      <div>
        <h2 className="SMAppheading">Mechanical Services</h2>
        {selectedAppointment && (
          <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
              <Modal.Header >
                <Modal.Title>Selected Appointment Details</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <Row>
                <Card.Text>
                    <strong>Customer Type: </strong>{selectedAppointment.cusType}<br />
                  </Card.Text>
                  </Row>
                <Row>
                  <Card.Text>
                    <strong>Vehicle No: </strong>{selectedAppointment.vNo}<br />
                    <strong>Customer Name: </strong>{selectedAppointment.name}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
                    <strong>Requesting service: </strong>{selectedAppointment.issue}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Date and Time: </strong>{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}<br />
                    <strong>Contact No: </strong>{selectedAppointment.contactNo}<br />
                  </Card.Text>
                </Row>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCardClose}>Close</Button>
                <Button variant="danger" onClick={() => Delete(selectedAppointment._id)}>Cancel</Button>
                <Button variant="primary" onClick={sendata}>Approve</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )}


        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Vehicle No</th>
              <th>Customer Name</th>
              <th>Date and Time</th>
              <th>Contact No</th>
              <th>Issue</th>



            </tr>
          </thead>

          <tbody>
            {mechanicalAppointment.map((appointment) => (
              <tr key={appointment._id} onClick={() => handleTableRowClick(appointment)}>

                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{appointment.appointmentdate ? `${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}` : ''}</td>
                <td>{appointment.contactNo}</td>
                <td>{appointment.issue}</td>

                <td>
                  <Button variant="secondary" style={{ marginLeft: "35%" }} onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button></td>

              </tr>

            ))}
          </tbody>
        </Table>
        <Link to='/staff/sm/mechanicalhistory'>
          <Button variant="success" >
            View History of accepted appointments
          </Button><br/><br/>
        </Link>
        <Link to='/staff/sm/appointmentMain'>
        <Button variant="secondary" >
                    Back
        </Button>
        </Link>
      </div>


    </main>
  )
}
export default SMMechanicalRepairs;
