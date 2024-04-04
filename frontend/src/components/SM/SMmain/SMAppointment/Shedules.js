import React, { useState } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from 'react-bootstrap/Card';

const Shedules = () => { 
  const [value, onChange] = useState(new Date());
  // to handle card display after select a date
  const [selectedDate, setSelectedDate] = useState(null);

 // Function to check if a date is before the current date
 const isBeforeToday = (date) => {
  const today = new Date();
  return date < today;
};
const handleCardClose = () => {
  setSelectedDate(null);
};

// Function to disable days before the current date
const tileDisabled = ({ date }) => {
  return isBeforeToday(date);
};
// Function to handle date selection
const handleDateClick = (date) => {

  console.log(date)
  setSelectedDate(date);
};

// Function to render the board component based on selected date
const renderBoard = () => {
  if (selectedDate) {
    return (
      <Card>
      <Card.Body>
      <button type="button" class="btn-close" aria-label="Close"  onClick={handleCardClose}></button>
        <Card.Title>Selected Appointment Details</Card.Title>
        <Card.Text  >
                <strong >Vehicle No: </strong><br />
                <strong >Customer Name: </strong><br />
                <strong >Vehicle Type: </strong><br />
                <strong >Service Type: </strong><br />
                <strong >Issue: </strong><br />
                <strong >Contact Number: </strong><br />
                <strong >Appointment Date: </strong><br />
                <strong >Appointment Time: </strong><br />
                </Card.Text>
      </Card.Body>
    </Card>
    );
  } else {
    return null;
  }
};

  return (
    <main id="main" className="main">
      {renderBoard()} {/* Render the board component */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' ,marginLeft:'50px',marginRight:'170px'}}>
      <Calendar onChange={handleDateClick} value={value} 
       tileDisabled={tileDisabled}  />
    </div>
    
    </main>
  );
}

export default Shedules;
