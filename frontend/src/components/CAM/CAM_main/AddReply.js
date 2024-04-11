import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import './CAM_main.css';

function AddReply(){

const navigate = useNavigate();
const [Issue, setIssue] = useState([]);
const [Solution,setSolution] = useState([]);
/*
const fetchIssueById = async (ObjectId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/cam/consultation/get-issue/${ObjectId}`
    );
    setIssue(res.data);
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched issue", data);
    return data;
  }catch (error) {
    console.error("Error fetching employee data:", error);
      return null;
  }
};

useEffect((ObjectId) => {
  function getIssue() {
    axios.get(`http://localhost:5000/cam/consultation/get-issue/${ObjectId}`)
    .then((res) => {
      setIssue(res.data);
    })
    .catch((err) => {
      alert("error");
    });
  }
  getIssue();
}, []);*/

useEffect(() => {
  function sendData(e){
    e.preventDefault();
    const newSolution ={
      Solution
    }
    axios.post("http://localhost:5000/cam/consultation/add-issue",newSolution).then(()=>{
      alert("Solution Added")
      setSolution("");
      //navigate("getreply");
    }).catch((err)=>{
      alert(err)
    })
  }
});
return(
  <main>
        <div>
            <h2><b>Issue</b></h2>
              <Accordion defaultActiveKey="0" >
                
                    <Accordion.Item  style={{marginTop:"5px"}}>
                      <Accordion.Header>@UserName1010</Accordion.Header>
                      <Accordion.Body>body</Accordion.Body>
                      
                    </Accordion.Item>
               </Accordion>      
          </div>
  </main>
);

    
}

export default AddReply;