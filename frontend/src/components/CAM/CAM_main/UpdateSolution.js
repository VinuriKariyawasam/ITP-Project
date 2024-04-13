import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './CAM_main.css';

const UpdateSolution = () =>{
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    vehicleType: "",
    component: "",
    issue: "",
    solution: "",
  });

  useEffect(() => {
    // Fetch issue based on the id from the URL
    fetch(
      `http://localhost:5000/cam/consultation/get-issue/${id}`)
      .then((response) => response.json())
      .then((data) => {
        //set the fetched data into the form state
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching issue:",error));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/cam/consultation/update-solution/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(() => {
      console.log("Solution updated successfully");
      navigate(-1);
    })
    .catch((error) => console.error("Error updating solution:",error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

return (
  <main id="main">
  <Form onSubmit={handleFormSubmit}>
   <Form.Group as={Col} controlId="solution" style={{marginTop:"5px"}}>
      <Form.Label>Solution from the Experts</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Answer Pending..."
          rows={4}
          //value={formData.solution}
          //onChange={handleChange}
          />
    </Form.Group>
    <div className="cam-replybtn">
     <Button className='cam-editbtn' variant="dark" size="md" type="submit">Update</Button>
     <Button className='cam-deletebtn' variant="dark" size="md">Delete</Button>
     <Button className='cam-gotobtn' variant="dark" size="md" onClick={handleCancel}>Cancel</Button>
     </div>
     </Form>
  </main>
       
);

}

export default UpdateSolution;