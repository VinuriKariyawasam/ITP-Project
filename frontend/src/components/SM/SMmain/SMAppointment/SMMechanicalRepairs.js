import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';


const SMMechanicalRepairs = props => {

  //create an empty array to store details
  const [mechanicalAppointment, setmechanicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [name, setname] = useState("");
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
    //create javascript object
    const newacceptedappointment = {
      name,
      vType,
      vNo,
      serviceType,
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
  //set values to columnns in accepted appointment
  const handleTableRowClick = (appointment) => {
    setname(appointment.name);
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
      axios.get("http://localhost:5000/appointment/get-mechanicalAppointment").then((res) => {
        setmechanicalAppointment(res.data);
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      })
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
    const shouldDelete = window.confirm("please confirm deletion!");

    if (shouldDelete) {
      axios.delete(`http://localhost:5000/appointment/delete-mechanicalAppointment/${id}`)
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
        <h2 className="SMAppheading">Mechanical Services</h2>
        {selectedAppointment && (
          <div className="SmCard">
            <Card style={{ width: "50%" }}>
              <Card.Body>
                <button type="button" class="btn-close" aria-label="Close" onClick={handleCardClose}></button>
                <Card.Title>Selected Appointment Details</Card.Title>
                <Row>
                  <Card.Text  >
                    <strong >Vehicle No: </strong>{selectedAppointment.vNo}<br />
                    <strong >Customer Name: </strong>{selectedAppointment.name}<br />
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
                </Row >
                <Row style={{ marginTop: "4%", display: "flex" }}>
                  <Button variant="danger" onClick={() => Delete(selectedAppointment._id)} style={{ marginLeft: "20%", width: "100px" }}>Cancel</Button>
                  <Button variant="primary" onClick={sendata} style={{ marginLeft: "20%", width: "100px" }}>Approve</Button>
                </Row>
              </Card.Body>
            </Card>
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
      </div>


    </main>
  )
}
export default SMMechanicalRepairs;
