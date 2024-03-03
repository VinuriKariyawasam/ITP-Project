import React from "react";

import StarRating from './StarRating';

import './Feedback.css';
import './StarRating.css';

function Feedback() {
  return(
    <div>
      <div className="feedbacktitle">
      <h1>Tell us what you think!!</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <i className="bi bi-house-door"></i>
            </a>
          </li>
          <li className="breadcrumb-item active">FeedBack</li>
        </ol>
      </nav>
    </div>
       <p className='para1'>At Neo Tech we value your feedback.Please take a moment to share your thoughts with us.</p>
       
       <div>
         <h5 className='h5'>Rate us!!</h5>
        <StarRating/>
       </div>
 
       <div className="form-styles">
         <label for="name" className="form-label">Name</label><br/>
         <input type="text" className="form-text" id="Input1" placeholder="Your Name" required/><br/>
       </div>
 
       <div className="form-styles">
         <label for="email" className="form-label">Email address</label><br/>
         <input type="email" className="form-text" id="Input2" placeholder="name@example.com" required/><br/>
       </div>
 
       <div className="form-styles">
         <label for="service-type" className="form-label">Specify any field</label><br/>
           <select className="form-text" required aria-label="Default select example">
            <option selected>select an option</option>
            <option value="1">Service</option>
            <option value="2">Mechanical Repairs</option>
            <option value="3">Other</option>
           </select>
       </div>
 
       <div className="form-styles">
         <label for="feedback" className="form-label">Please provide your feedback in the space below</label><br/>
         <textarea className="form-text" id="Input3" rows="4" cols="60" required></textarea>
       </div>
 
       <div className="form-styles">
         <label for="formFile" className="form-label">Attach file</label><br/>
         <input className="form-text" type="file" id="formFile"/>
       </div><br/>
 
       <input className="btn btn-dark" type="submit" value="Submit"></input>
       <button className="btn btn-light" type="button">Cancel</button>
 
       </div>
  ); 

}

export default Feedback;
