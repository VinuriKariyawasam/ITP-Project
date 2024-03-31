import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const SMPeriodicalServices = props => {

  //create an empty array to store details
  const [periodicalAppointment, setperiodicalAppointment] = useState([]);

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
              <tr key={appointment._id}>

                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{`${appointment.appointmentdate} ${appointment.appointmenttime}`}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.msg}</td>
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
export default SMPeriodicalServices;
