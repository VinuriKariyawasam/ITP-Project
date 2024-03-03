import React, { useState } from 'react'
import img3 from '../projectImages/img3.png'
import '../Periodical/periodicalAppoinment.css'
import SMPeriodicalServices from '../SMPeriodicalServices';




function PeriodicalAppointment() {

 /* const Periodicaldata =[
    {
      name:uname,
    }
  ]
  */
  /*const [name,setName] = useState("");
  const [vType,setvType] = useState("");
  const [vNo,setvNo] = useState("");
  const [sType,setsType] = useState("");
  const [year,setyear] = useState("");
  const [month,setmonth] = useState("");
  const [mileage,setmileage] = useState("");
  const [phone,setphone] = useState("");
  const [date,setdate] = useState("");
  const [time,settime] = useState("");
  const [msg,setmsg] = useState("");
*/
  

  return (
    <div>
      <h2 className='heading'>Make an Appointment for Your Periodical Services</h2>
      <container className=''>
        <form className="form" onSubmit="#">
          <div className="form-element">
            <label htmlFor="name" className='L1'>Name</label><br />
            <input className="small-input" type="text" id="name" placeholder="Enter your name"  />
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
            <label htmlFor="sType" className='L1'>Service Type</label><br />
            <input className="small-input" type="text" id="sType" placeholder="Enter service type" />
          </div>
          <div className="form-element">
            <h3 className='L1' >Last Service Period</h3>
            <div className="year-month-container">
              <div className="year-input">
                <label htmlFor="year" className='L1'>Year</label>
                <input className="small-input" type="text" id="year" placeholder="Enter year" />
              </div>
              <div className="month-input">
                <label htmlFor="month" className='L1'>Month</label>
                <input className="small-input" type="text" id="month" placeholder="Enter month" />
              </div>
            </div>
          </div>

          <div className="form-element">
            <label htmlFor="mileage" className='L1'>Mileage</label><br />
            <input className="small-input" type="text" id="mileage" placeholder="Enter mileage"/>
          </div>
          <div className="form-element">
            <label htmlFor="phone" className='L1'>Contact Number</label><br />
            <input className="small-input" type="text" id="phone" placeholder="Enter contact number" />
          </div>
          <div className="form-element">
            <h3 className='L1'> Appointment Time</h3>
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
          <div className="form-element">
            <label htmlFor="msg"className='L1'>Anything else?</label><br />
            <textarea id="msg" rows="3" placeholder="Questions/comments..." ></textarea>
          </div>
          <div className="checkbox-container">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
          <label className="form-check-label" htmlFor="exampleCheck1">By scheduling your appointment you agree to accept our terms and regulations</label><br /><br />
          </div>
          <button id="submit">Submit</button>
        </form>
      </container>


    </div>

  );
}


export default PeriodicalAppointment

/*<SMPeriodicalServices Pedata ={Periodicaldata}/>*/