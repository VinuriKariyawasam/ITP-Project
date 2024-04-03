import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const SMPeriodicalServices = props => {

  //create an empty array to store details
  const [periodicalAppointment, setperiodicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);



  const [name, setname] = useState("");
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [sType, setsType] = useState("");
  const [issue,setissue]=useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");
  

  function sendata(e) {
    e.preventDefault();

    //create javascript object
    const newacceptedappointment = {
      name,
      vType,
      vNo,
      sType,
      issue,
      contactNo,
      appointmentdate,
      appointmenttime,
      
    }

    axios.post("http://localhost:5000/appointment/addacceptedappointment", newacceptedappointment).then(() => {
      alert("Your Appointment Success")  
      Delete(selectedAppointment._id);

    }).catch((err) => {
      alert(err)
    })

  }
  const handleTableRowClick = (appointment) => {
    setname(appointment.name);
    setvType(appointment.vType);
    setvNo(appointment.vNo);
    setsType(appointment.sType);
    setissue(appointment.msg);
    setcontactNo(appointment.phone);
    setappointmentdate(appointment.appointmentdate);
    setappointmenttime(appointment.appointmenttime);
  };
  useEffect(() => {

    function getPeriodicalAppointment() {
      axios.get("http://localhost:5000/appointment/get-periodicalAppointment").then((res) => {
        setperiodicalAppointment(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getPeriodicalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };



  const Delete = (id) => {
    const shouldDelete = window.confirm("please confirm deletion!");

    if (shouldDelete) {
      axios.delete(`http://localhost:5000/appointment/delete-periodicalAppointment/${id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          // Handle errors here
          console.error(error);
        });
    }
  };
  
  return (
    <main id="main" className="main">
      <div>

        <h2 className="SMAPeriodical-Appheading">Periodical Services</h2>
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
          <thead>
            <tr>
              {

              }
            </tr>
          </thead>
          <tbody>
            {periodicalAppointment.map((appointment) => (
              <tr key={appointment._id} onClick={() => handleTableRowClick(selectedAppointment)}>

                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{`${appointment.appointmentdate} ${appointment.appointmenttime}`}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.msg}</td>
                <td>
                  <Button variant="secondary" onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button></td>
                <td style={{ display: 'flex', gap: '5px' }}>
                 

                </td>
              </tr>

            ))}
          </tbody>
        </Table>
        
        {selectedAppointment && (
          <Card>
            <Card.Body>
            <button type="button" class="btn-close" aria-label="Close"  onClick={handleCardClose}></button>
              <Card.Title>Selected Appointment Details</Card.Title>
              <Card.Text>
                <strong>Vehicle No: </strong>{selectedAppointment.vNo}<br />
                <strong>Customer Name: </strong>{selectedAppointment.name}<br />
                <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
                <strong>Requesting service: </strong>{selectedAppointment.sTyppe}<br />
                <strong>Last Srvice Year: </strong>{selectedAppointment.lastServiceYear}<br />
                <strong>Last Srvice Month: </strong>{selectedAppointment.lastServiceMonth}<br />
                <strong>mileage: </strong>{selectedAppointment.mileage}<br />
                <strong>Description: </strong>{selectedAppointment.msg}<br />
                <strong>Date and Time: </strong>{`${selectedAppointment.appointmentdate} ${selectedAppointment.appointmenttime}`}<br />
                <strong>Contact No: </strong>{selectedAppointment.phone}<br />
                <Button variant="secondary" onClick={() => Delete(selectedAppointment._id)}>Cancel</Button>
                <Button variant="secondary" onClick={sendata}>Approve</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>

    </main>
  )
}
export default SMPeriodicalServices;
