import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const SMMechanicalRepairs= props => {

  //create an empty array to store details
  const [mechanicalAppointment, setmechanicalAppointment] = useState([]);

  useEffect(() => {

    function getmechanicalAppointment() {
      axios.get("http://localhost:5000/appointment/get-mechanicalAppointment").then((res) => {
        setmechanicalAppointment(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getmechanicalAppointment();

  }, [])
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

        <h2 >Mechanical Services</h2>
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
          <thead>
            <tr>
              {

              }
            </tr>
          </thead>
          <tbody>
            {mechanicalAppointment.map((appointment) => (
              <tr key={appointment._id}>

                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{`${appointment.appointmentdate} ${appointment.appointmenttime}`}</td>
                <td>{appointment.contactNo}</td>
                <td>{appointment.issue}</td>
                <td style={{ display: 'flex', gap: '5px' }}>
                  <Button variant="secondary" onClick={() => Delete(appointment._id)}>Cancel</Button>
                  <Button variant="secondary">Approve</Button>

                </td>
              </tr>

            ))}
          </tbody>
        </Table>
      </div>


    </main>
  )
}
export default SMMechanicalRepairs;
