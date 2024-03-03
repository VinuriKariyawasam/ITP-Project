import React from 'react'
import img3 from '../projectImages/img3.png'
import '../Mechanical/MechanicalAppointment.css'

const MechanicalAppointment = () => {
  return (
    <div>
      <h2 className='heading'>Make an Appointment for Your Mechanical Repairs</h2>

      <div className='form'>
        <form className="main-form" onSubmit="#">
          <div className="form-element">
            <label htmlFor="name" className='L1'>Name</label><br />
            <input className="small-input" type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-element">
            <label htmlFor="vType" className='L1'>Vehicle Type</label><br />
            <input className="small-input" type="text" id="vType" placeholder="Enter vehicle type" />
          </div>
          <div className="form-element">
            <label htmlFor="vNo" className='L1'>Vehicle No</label><br />
            <input className="small-input" type="text" id="vNo" placeholder="Enter vehicle number" />
          </div>
          <div className="form-element">
            <label htmlFor="issue" className='L1'>Issue</label><br />
            <input className="small-input" type="text" id="issue" placeholder="Enter service type" />
          </div>

          <div className="form-element">
            <label htmlFor="phone" className='L1'>Contact Number</label><br />
            <input className="small-input" type="text" id="phone" placeholder="Enter contact number" />
          </div>
          <div className="form-element">
            <h3 className='L1'>Appointment Time</h3>
            <div className="year-month-container">
              <div className="year-input">
                <label htmlFor="year" className='L1'>Date</label>
                <input className="small-input" type="text" id="date" placeholder="Enter year" />
              </div>
              <div className="month-input">
                <label htmlFor="month" className='L1'>Time</label>
                <input className="small-input" type="text" id="time" placeholder="Enter month" />
              </div>
            </div>
          </div>

          <div className="checkbox-container">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
          <label className="form-check-label" htmlFor="exampleCheck1">By scheduling your appointment you agree to accept our terms and regulations</label><br /><br />
          </div>
          <button id="submit">Submit</button>
        </form>
      </div>


    </div>

  );
}



export default MechanicalAppointment;