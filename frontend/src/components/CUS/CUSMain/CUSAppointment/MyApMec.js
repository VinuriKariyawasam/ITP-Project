import React, { useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import DatePicker from "react-datepicker";
import { CusAuthContext } from "../../../../context/cus-authcontext";


function MyApMec({ toggleLoading }) {

  const [showModal, setShowModal] = useState(false);
  const [mechanicalAppointment, setmechanicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointmentdate, setappointmentdate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [showUpdateAppointmentButton, setShowUpdateAppointmentButton] = useState(false);

  const cusauth = useContext(CusAuthContext)



  let userId = cusauth.userId;
  const getMechanicalData = async (userId) => {
    try {

      toggleLoading(true); 
      const response = await axios.get(`${process.env.React_App_Backend_URL}/appointment/get-mechanicalappointmentbyuserId/${userId}`);
      setmechanicalAppointment(response.data.data);

    } catch (error) {
      console.error('Error fetching appointments:', error);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  useEffect(() => {
    if (cusauth.userId) {
      getMechanicalData(cusauth.userId)
    }

  }, [cusauth.userId])
  // Function to handle the "Update" button click
  const handleUpdateClick = () => {
    setShowDatePicker(true); // Show the date picker
    setShowSelect(true); // Show the select input
    setShowUpdateAppointmentButton(true);
  };

  // Function to handle updating the appointment
  const handleUpdateAppointment = () => {
    // Make sure selectedAppointment is not null
    if (selectedAppointment && appointmentdate) { // Ensure appointmentdate is not empty
      // Send a request to update the appointment with the new date and time
      toggleLoading(true); 
      axios.put(`${process.env.React_App_Backend_URL}/appointment/update-mechanicalAppointment/${selectedAppointment._id}`, {
        userId: selectedAppointment.userId, // Use userId from selectedAppointment
        name: selectedAppointment.name,
        cusType:selectedAppointment.cusType,
        vType: selectedAppointment.vType,
        vNo: selectedAppointment.vNo,
        Issue: selectedAppointment.issue,
        contactNo: selectedAppointment.contactNo,
        appointmentdate: new Date(appointmentdate.getTime() + (24 * 60 * 60 * 1000)), // Adding one day
        appointmenttime: selectedAppointment.appointmenttime, // Use appointmenttime from selectedAppointment
      })
        .then(response => {
          console.log(response);
          // Refresh data from the server
          getMechanicalData(userId);
          // Close the modal
          setShowModal(false);
          // Hide the "Update Appointment" button
          setShowUpdateAppointmentButton(false);
        })
        .catch(error => {
          console.error(error);
          // Handle errors
        }).finally(()=>{
          toggleLoading(false); 
        });
    }
  };




  const Delete = (id) => {
    toggleLoading(true);
    axios.delete(`${process.env.React_App_Backend_URL}/appointment/delete-mechanicalAppointment/${id}`)
      .then(response => {
        console.log(response);
        window.location.reload();
        alert("Appointment Canceled")
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      }).finally(()=>{
        toggleLoading(false); 
      });

  };


  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateAppointmentButton(false);
  };
  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Updated handleTimeChange function to directly update the selectedAppointment state with the new appointment time
  const handleTimeChange = (id, value) => {
    setSelectedAppointment(prevAppointment => ({
      ...prevAppointment,
      appointmenttime: value
    }));
  };
  // Function to get tomorrow's date
  const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };
  // Function to format the date correctly
  const changedatetoformet = (date) => {
    const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    return formattedDate;
  };
  useEffect(() => {
    if (appointmentdate) {
      fetchAvailableTimes(appointmentdate);
    }
  }, [appointmentdate]);


  const fetchAvailableTimes = async (date) => {
    try {
      const formattedDate = changedatetoformet(date);
      const response = await axios.get(`${process.env.React_App_Backend_URL}/appointment/get-acceptedmechanicalappointmentbyDate/${formattedDate}`);
      const appointments = response.data.data;
      console.log(appointments);
      const allTimes = ["9.00am", "10.30am", "12.00pm", "1.30pm", "3.00pm", "4.30pm"]; // Define allTimes here
      if (appointments.length === 0) { // If no appointments found for the selected date
        setAvailableTimes(allTimes); // Set available times to all available times
      } else {
        const bookedTimes = appointments.map(appointment => appointment.appointmenttime);
        const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));
        setAvailableTimes(availableTimes);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (no appointments found for the date)
        const allTimes = ["9.00am", "10.30am", "12.00pm", "1.30pm", "3.00pm", "4.30pm"]; // Define allTimes here
        setAvailableTimes(allTimes); // Set available times to all available times
      } else {
        // Handle other errors
        console.error("Error fetching available times:", error);
      }
    }
  };



  return (

    <div>
      <div style={{ marginLeft: "30px" ,marginRight: "20px"}}> {/* Adding left margin to the table */}
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
            <tr key={appointment._id} >

              <td>{appointment.vNo}</td>
              <td>{appointment.name}</td>
              <td>{appointment.appointmentdate ? `${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}` : ''}</td>
              <td>{appointment.contactNo}</td>
              <td>{appointment.issue}</td>

              <td>
                <Button variant="secondary" onClick={() => handleMoreButtonClick(appointment)}>
                  More
                </Button></td>

            </tr>

          ))}
        </tbody>
      </Table>
      </div>
      {selectedAppointment && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Mechanical Service Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img style={{ width: "50%", height: "50%" }} />
            <p>Vehicle No:{selectedAppointment.vNo}</p>
            <p>Customer Name:{selectedAppointment.name} </p>
            <p>Customer Type:{selectedAppointment.cusType} </p>
            <p>Vehicle Type:{selectedAppointment.vType}  </p>
            <p>Requesting service:{selectedAppointment.issue} </p>
            <lable>Date:{selectedAppointment.appointmentdate.split('T')[0]} </lable><br /><br />
            {showDatePicker && ( // Render date picker only if showDatePicker is true
              <DatePicker
                placeholderText='Appointment Date'
                selected={appointmentdate}
                onChange={(date) => setappointmentdate(date)}
                dateFormat='MM/dd/yyyy'
                minDate={getTomorrow()}
                required
              />
            )}
            <label>Time:{selectedAppointment.appointmenttime}</label><br /><br />
            {showSelect && ( // Render select input only if showSelect is true
              <div>

                <select
                  className="form-select"
                  value={selectedAppointment.appointmenttime}
                  onChange={(e) => handleTimeChange(selectedAppointment._id, e.target.value)}
                  required
                >
                  <option value="">Choose</option>
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))
                  ) : (
                    <option value="" disabled>No available times</option>
                  )}
                </select>
              </div>
            )}
            <p>Contact No:{selectedAppointment.contactNo} </p>
          </Modal.Body>
          <Modal.Footer>
            {!showUpdateAppointmentButton && ( // Render the "Update" button only if showUpdateAppointmentButton is false
              <Button variant="warning" onClick={handleUpdateClick}>
                Update
              </Button>
            )}
            {showUpdateAppointmentButton && (
              <Button variant="warning" onClick={handleUpdateAppointment}>
                Update Appointment
              </Button>
            )}

            <Button variant="danger" onClick={() => Delete(selectedAppointment._id)}>
              cancle
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )



}

export default MyApMec;
