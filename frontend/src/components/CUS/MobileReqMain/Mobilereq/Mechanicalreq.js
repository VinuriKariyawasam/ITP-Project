import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import '../Mobilereq/Mechanicalreq.css'
import axios from "axios"

function Mechanicalreq() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    // Perform form submission logic here
  };
  const[cusName,setcusName]=useState("");
  const[cusEmail,setcusEmail]=useState("");
  const[vehicleNo,setvehicleNo]=useState("");
  const[reqDate,setreqDate]=useState("");
  const[reqTime,setreqTime]=useState("");
  const[reqLocation,setreqLocation]=useState("");
  const[issue,setissue]=useState("");
  const[contactNo,setcontactNo]=useState("");

  function sendata(e){
   
    
    //create javascript object
    const newMechanicalreq ={
      cusName,
      cusEmail,
      vehicleNo,
      reqDate,
      reqTime,
      reqLocation,
      issue,
      contactNo
      }

        axios.post("http://localhost:5000/add-mechanical",newMechanicalreq).then(()=>{
          alert("Your Mobile Request Successfully completed")
          setcusName=("");
          setcusEmail("");
          setvehicleNo("");
          setreqDate("");
          setreqTime("");
          setreqLocation("");
          setissue("");
          setcontactNo("");

        }).catch((err)=>{
          alert(err)
        })
    
  }
  return (
  
    <main id="main" className="main">
      <div className="form-container">
        <h2 className='heading'>Mobile Mechanical Service Requests</h2>
        <container className=''>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="cusName" className='L1'>Customer Name</label><br />
              <input {...register("cusName", { required: true })} className="small-input" type="text" id="cusName" placeholder="Enter Your Name" value={cusName} onChange={(e) => setcusName(e.target.value)} />
              {errors.cusName && <span className="error">Customer Name is required</span>}
            </div>
            <div className="form-element">
              <label htmlFor="cusEmail" className='L1'>Email Address</label><br />
              <input {...register("cusEmail", { 
      required: true,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email validation
        message: "Invalid email address"
      }
    })} className="small-input" type="text" id="cusEmail" placeholder="Enter Your Email" value={cusEmail} onChange={(e) => setcusEmail(e.target.value)} />
              {errors.cusEmail && <span className="error">Email Address is required</span>}
            </div>
            <div className="form-element">
              <label htmlFor="vehicleNo" className='L1'>Vehicle Number</label><br />
              <input {...register("vehicleNo", { 
      required: true,
      pattern: {
        value: /^[A-Za-z0-9]{1,10}$/, //vehicle number validation
        message: "Invalid vehicle number"
      }
    })} className="small-input" type="text" id="vehicleNo" placeholder="Enter Your Vehicle Number" value={vehicleNo} onChange={(e) => setvehicleNo(e.target.value)} />
              {errors.vehicleNo && <span className="error">Vehicle Number is required</span>}
            </div>

            <div className="form-element">
              <div className="year-month-container">
                <div className="year-input">
                  <label htmlFor="reqDate" className='L1'>Date</label>
                  <input {...register("reqDate", { 
      required: true, 
      pattern: {
        value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/, //date format validation
        message: "Invalid date format (DD/MM/YY)"
      } 
    })} className="small-input" type="text" id="reqDate" placeholder="DD/MM/YY" value={reqDate} onChange={(e) => setreqDate(e.target.value)} />
                </div>
                <div className="month-input">
                  <label htmlFor="reqTime" className='L1'>Time</label>
                  <input {...register("reqTime", { 
      required: true, 
      pattern: {
        value: /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, //time format validation
        message: "Invalid time format (HH:MM)"
      } 
    })} className="small-input" type="text" id="reqTime" placeholder="Enter time" value={reqTime} onChange={(e) => setreqTime(e.target.value)} />
     {errors.reqTime && <span className="error">{errors.reqTime.message}</span>}
                </div>
                <div className="form-element">
                  <label htmlFor="reqLocation" className='L1'>Location</label><br />
                  <input {...register("reqLocation", { required: true })} className="small-input" type="text" id="reqLocation" placeholder="Location" value={reqLocation} onChange={(e) => setreqLocation(e.target.value)} />
                  {errors.reqLocation && <span className="error">Location is required</span>}
                </div>
              </div>
            </div> 

            <div className="form-element">
              <label htmlFor="issue" className='L1'>Issue</label><br />
              <input className="small-input" type="text" id="issue" placeholder="Enter Vehicle Issue" value={issue} onChange={(e) => setissue(e.target.value)} />
            </div>
            <div className="form-element">
              <label htmlFor="contactNo" className='L1'>Contact Number</label><br />
              <input  {...register("contactNo", { 
      required: true,
      pattern: {
        value: /^[0-9]{10}$/, // Assuming a 10-digit phone number format
        message: "Invalid contact number"
      }
    })} className="small-input" type="text" id="contactNo" placeholder="Enter Your Contact Number" value={contactNo} onChange={(e) => setcontactNo(e.target.value)} />
    {errors.contactNo && <span className="error">{errors.contactNo.message}</span>}
         </div>

           
            <div className="checkbox-container">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
              <label className="form-check-label" htmlFor="exampleCheck1">By scheduling your appointment you agree to accept our terms and regulations</label><br /><br />
            </div>
            <button id="submit" type="submit">Submit</button>
          </form>
        </container>
      </div> </main>
    );
  }
  
  export default Mechanicalreq;