import React,{useState} from "react";
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function AddReply(){

const [reply,setReply] = useState("");
const navigate = useNavigate();

function sendData(e){
  e.preventDefault();
  
  const newReply ={
    reply
  }

  axios.post("http://localhost:5000/consultancy/add",newReply).then(()=>{
    alert("Reply Added")
    setReply("");
  }).catch((err)=>{
    alert(err)
  })



}
    return(
      <>
     <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>@UserName1010</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      </Accordion><br/>
      <FloatingLabel controlId="floatingTextarea2" label="Reply">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          onChange = {(e)=>{
            setReply(e.target.value);
          }}
        />
      </FloatingLabel>
      <div className="replybtn">
      <Button variant="dark" size="md" onClick={sendData}>Post</Button>
      </div>
    </>
    );
}

export default AddReply;