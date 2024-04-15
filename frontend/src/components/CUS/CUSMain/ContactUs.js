import React from 'react';
import { useForm } from 'react-hook-form';
import './Cushome.css';
import img from '../../../images/Cushome/home1.jpg'
import img2 from "../../../images/Cushome/Contactus.jpg"
import axios from "axios"
import { Form, Button } from 'react-bootstrap';

function Contactus() {
const { register, handleSubmit, formState: { errors }, reset } = useForm();

const onSubmit = data => {

  axios.post("http://localhost:5000/",{
      cusName: data.cusName,
      cusEmail: data.cusEmail,
      message: data.message,
  }).then(()=>{
        alert("Your Message Successfully Send");
        reset();

      }).catch((err)=>{
          alert(err);
      });
};
    
return (
        <main id="cusmainhome" className="cusmainhome">
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <img className="cushomeimg" src={img2} style={{ zIndex: 0 }} />
            <div style={{ position: "absolute", marginLeft: "2%", zIndex: 1 }}>
              <p className="cushomep"> Contact us here </p>
        <container className=''>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Control type="text" className="form-control" placeholder="Name" id="cusName" required/>
            </Form.Group><br/>
            <Form.Group>
                <Form.Control type="email" className="form-control" placeholder="Email address" id="cusEmail" required/>
            </Form.Group><br/>
            <Form.Group>
                <Form.Control type="text" className="form-control" placeholder="Enter your message" id="message" required/>
            </Form.Group><br/>
        <Button variant="primary" type="submit">Send Message</Button>
        </Form></container> 
        </div></div>

       </main>

);
}

export default Contactus;
