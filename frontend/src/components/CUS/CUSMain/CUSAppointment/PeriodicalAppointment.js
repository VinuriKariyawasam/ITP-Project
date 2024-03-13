import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import '../CUSAppointment/PeriodicalAppointment.css'
import axios from "axios"

function PeriodicalAppointment() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    // Perform form submission logic here
  };
  const[name,setname]=useState("");
  const[vType,setvType]=useState("");
  const[vNo,setvNo]=useState("");
  const[sType,setsType]=useState("");
  const[lastServiceYear,setlastServiceYear]=useState("");
  const[lastServiceMonth,setlastServiceMonth]=useState("");
  const[mileage,setmileage]=useState("");
  const[phone,setphone]=useState("");
  const[appointmentdate,setappointmentdate]=useState("");
  const[appointmenttime,setappointmenttime]=useState("");
  const[msg,setmsg]=useState("");

  function sendata(e){
   
    
    //create javascript object
    const newPeriodicalAppointment ={
        name,
        vType,
        vNo,
        sType,
        lastServiceYear,
        lastServiceMonth,
        mileage,
        phone,
        appointmentdate,
        appointmenttime,
        msg
      }

        axios.post("http://localhost:5000/appointment/addPeriodicalData",newPeriodicalAppointment).then(()=>{
          alert("Your Appointment Success")
          setname=("");
          setvType("");
          setvNo("");
          setsType("");
          setlastServiceYear("");
          setlastServiceMonth("");
          setmileage("");
          setphone("");
          setappointmentdate("");
          setappointmenttime("");
          setmsg("");

        }).catch((err)=>{
          alert(err)
        })
    
  }
  return (
  
    
    <div>
      <h2 className='heading'>Make an Appointment for Your Periodical Services</h2>
      <container className=''>
        <form className="form" onSubmit={handleSubmit(sendata)}>
          <div className="form-element">
            <label htmlFor="name" className='L1'>Name</label><br />
            <input className="small-input" type="text" id="name" placeholder="Enter your name" {...register("name", { required: true })} 
            onChange={(e)=>{
            setname(e.target.value)
            }}/>
            {errors.name && <span className="error">Name is required</span>}
          </div>
          <div className="form-element">
            <label htmlFor="vType" className='L1'>Vehicle Type</label><br />
            <input className="small-input" type="text" id="vType" placeholder="Enter vehicle type" {...register("vehicleType", { required: true })} 
             onChange={(e)=>{
              setvType(e.target.value)
              }}/>
            {errors.vehicleType && <span className="error">Vehicle type is required</span>}
          </div>
          <div className="form-element">
            <label htmlFor="vNo" className='L1'>Vehicle No</label><br />
            <input className="small-input" type="text" id="vNo" placeholder="Enter vehicle number" {...register("vehicleNumber", { required: true })}
             onChange={(e)=>{
              setvNo(e.target.value)
              }} />
            {errors.vehicleNumber && <span className="error">Vehicle number is required</span>}
          </div>
          <div className="form-element">
            <label htmlFor="sType" className='L1'>Service Type</label><br />
            <input className="small-input" type="text" id="sType" placeholder="Enter service type" {...register("serviceType", { required: true })} 
             onChange={(e)=>{
              setsType(e.target.value)
              }}/>
            {errors.serviceType && <span className="error">Service type is required</span>}
          </div>
          <div className="form-element">
            <h3 className='L1' >Last Service Period</h3>
            <div className="year-month-container">
              <div className="year-input">
                <label htmlFor="year" className='L1'>Year</label>
                <input className="small-input" type="text" id="year" placeholder="Enter year" {...register("lastServiceYear", { required: true })} 
                 onChange={(e)=>{
                  setlastServiceYear(e.target.value)
                  }}/>
                {errors.lastServiceYear && <span className="error">Year is required</span>}
              </div>
              <div className="month-input">
                <label htmlFor="month" className='L1'>Month</label>
                <input className="small-input" type="text" id="month" placeholder="Enter month" {...register("lastServiceMonth", { required: true })} 
                 onChange={(e)=>{
                  setlastServiceMonth(e.target.value)
                  }}/>
                {errors.lastServiceMonth && <span className="error">Month is required</span>}
              </div>
            </div>
          </div>

          <div className="form-element">
            <label htmlFor="mileage" className='L1'>Mileage</label><br />
            <input className="small-input" type="text" id="mileage" placeholder="Enter mileage" {...register("mileage", { required: true })} 
             onChange={(e)=>{
              setmileage(e.target.value)
              }}/>
            {errors.mileage && <span className="error">Mileage is required</span>}
          </div>
          <div className="form-element">
            <label htmlFor="phone" className='L1'>Contact Number</label><br />
            <input className="small-input" type="text" id="phone" placeholder="Enter contact number" {...register("contactNumber", { required: true })} 
             onChange={(e)=>{
              setphone(e.target.value)
              }}/>
            {errors.contactNumber && <span className="error">Contact number is required</span>}
          </div>
          <div className="form-element">
            <h3 className='L1'> Appointment Time</h3>
            <div className="year-month-container">
              <div className="year-input">
                <label htmlFor="date" className='L1'>Date</label>
                <input className="small-input" type="text" id="date" placeholder="Enter date" {...register("appointmentDate", { required: true })}
                 onChange={(e)=>{
                  setappointmentdate(e.target.value)
                  }} />
                {errors.appointmentDate && <span className="error">Date is required</span>}
              </div>
              <div className="month-input">
                <label htmlFor="time" className='L1'>Time</label>
                <input className="small-input" type="text" id="time" placeholder="Enter time" {...register("appointmentTime", { required: true })} 
                 onChange={(e)=>{
                  setappointmenttime(e.target.value)
                  }}/>
                {errors.appointmentTime && <span className="error">Time is required</span>}
              </div>
            </div>
          </div>
          <div className="form-element">
            <label htmlFor="msg" className='L1'>Anything else?</label><br />
            <textarea id="msg" rows="3" placeholder="Questions/comments..." {...register("additionalInfo")} 
             onChange={(e)=>{
              setmsg(e.target.value)
              }}></textarea>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
            <label className="form-check-label" htmlFor="exampleCheck1">By scheduling your appointment you agree to accept our terms and regulations</label><br /><br />
          </div>
          <button id="submit" type="submit">Submit</button>
        </form>
      </container>
    </div>
   
  );
}







export default PeriodicalAppointment;

