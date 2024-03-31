import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import './Feedback.css';

function MyFeedback(){
    const navigate = useNavigate();
    const [fetchFeedback, setFetchedFeedback] = useState([]);
    const [updatedFeedback, setUpdatedfeedback] = useState([]);

    useEffect(() => {
        function getFeedbackbyId() {
            const id = "66083faefd6e18b044355b91";
            axios.get(`http://localhost:5000/CAM/get-feedback/${id}`)
            .then((res) => {
                setFetchedFeedback(res.data.feedback);
                setUpdatedfeedback(res.data.feedback)
            })
            .catch((err) => {
                alert("error");
            });
        }
        getFeedbackbyId();
    },  []);




    const Update = (id) => {
        const shouldUpdate = window.confirm("Confirm Update");
        if(shouldUpdate) {
            axios
               .update(`http://localhost:5000/CAM/update-feedback/${id}`)
               .then((response) => {
                console.log(response);
                window.location.reload();
               })
               .catch((error) => {
                console.error(error);
               });
        }
    };

    const Delete = (id) => {
        const shouldDelete = window.confirm("Confirm Delete");
        if(shouldDelete) {
            axios
               .delete(`http://localhost:5000/CAM/delete-feedback/${id}`)
               .then((response) => {
                console.log(response);
                window.location.reload();
               })
               .catch((error) => {
                console.error(error);
               });
        }
    };


    return(
    <main className="allFeedback">
        <h3>My FeedBack</h3>
        <StarRating/>
        <FloatingLabel className="floatingLabel" controlId="floatingTextarea">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '150px' }}
        value={fetchFeedback}
            
        // Assuming 'text' is the property in your reply object  
      />
    </FloatingLabel>
    <Button className='myfeedbackbtn' variant="dark" size="md" onClick={Update}>Update</Button>
    <Button className='myfeedbackbtn' variant="dark" size="md" onClick={Delete}>Delete</Button>
    </main>
    );
}

export default MyFeedback;