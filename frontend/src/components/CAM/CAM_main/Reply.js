import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import './CAM_main.css';

const Reply = () =>{
  const [replyData, setReplyData] = useState('');
  const [editedReply, setEditedReply] = useState('');
  const [newReply, setNewReply] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    const id = "65fa61992e2bd2358ba0ba2e";

    try {
      const response = await axios.get(`http://localhost:5000/consultancy/get-onereply/${id}`);
      setReplyData(response.data.reply); // Extracting 'reply' field from response.data
      setEditedReply(response.data.reply); // Set initial value for edited reply
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleEdit = (event) => {
    setEditedReply(event.target.value); // Update edited reply as user types
  }

  const handleUpdate = async () => {
    const id = "65fa61992e2bd2358ba0ba2e";
    try {
      await axios.put(`http://localhost:5000/consultancy/update-reply/${id}`,{ reply: editedReply });
      alert("Reply Updated")
      setReplyData(editedReply); // Update displayed reply with edited value
      console.log(editedReply);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const handleDelete = async () => {
    const id = "65fa61992e2bd2358ba0ba2e";
    try {
      await axios.delete(`http://localhost:5000/consultancy/delete-reply/${id}`);
      alert("Reply Deleted")
      setReplyData(''); // Clear reply data after successful deletion
      setEditedReply(''); // Clear edited reply data after successful deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  const handleAdd = async () => {
    try{
      await axios.post("http://localhost:5000/consultancy/add-reply",newReply).then(()=>{
    alert("Reply Added")
    setNewReply(newReply);
    //navigate("getreply");
  })} catch (error) {
    console.error("Error deleting data:", error);
  }
  }
return (
  <>
    <FloatingLabel controlId="floatingTextarea" label="Reply">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
        value={replyData} // Assuming 'text' is the property in your reply object  
        onChange={handleEdit}
      />
    </FloatingLabel>
    <div className="replybtn">
     <Button className='editbtn' variant="dark" size="md" onClick={handleUpdate}>Update</Button>
     <Button className='deletebtn' variant="dark" size="md" onClick={handleDelete}>Delete</Button>
     <Button className='gotobtn' variant="dark" size="md" onClick={handleAdd}>Add New Reply</Button>
     </div>
  </>
       
);

}

export default Reply;