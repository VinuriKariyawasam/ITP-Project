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
        </div>
      </div>
        {/* Map Section */}
      <div style={{ flex: 1, marginLeft: '20px', maxWidth: 'calc(100% - 20px)' }}>
        <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <iframe
            title="Neo Tech Motors and Services"
            width="100%"
            height="100%"
            style={{ border: '0' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.898848511275!2d79.9122486!3d6.9026988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259e0f3690af7%3A0x60b5f70768342686!2sNeo%20tech%20Motors%20%26%20Services!5e0!3m2!1sen!2slk!4v1713201216681!5m2!1sen!2slk"
            allowFullScreen
          ></iframe>
        </div>
      </div>

       </main>

);
}

export default Contactus;