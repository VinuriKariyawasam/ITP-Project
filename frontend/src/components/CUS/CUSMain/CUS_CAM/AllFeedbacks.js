import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Feedback.css';

function AllFeedbacks(){

    const navigate = useNavigate();
    const [Feedback, setfeedback] = useState([]);

    useEffect(() => {
        function getFeedbacks() {
            axios.get("http://localhost:5000/cam/feedback/get-feedbacks")
            .then((res) => {
                setfeedback(res.data);
            })
            .catch((err) => {
                alert("error");
            });
        }
        getFeedbacks();
    },  []);

    return(
        <main className="cam-allFeedback">
            <div>
                <h2><b>FeedBack</b></h2>
                <Button className='cam-newfeedbackbtn' variant="dark" size="md" onClick={() => navigate("feedback")}>Give a Feedback</Button>
                <Button className='cam-myfeedbackbtn' variant="dark" size="md" onClick={() => navigate("myfeedback")}>Go to My Feedback</Button>
                {Feedback.map((feedback) => (
                    <div key={feedback.id}>
                        <div className="components">
      <FloatingLabel className="cam-floatingLabel" controlId="floatingTextarea" label={feedback.firstName + feedback.lastName}>
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
        value=
            {feedback.feedback}
        // Assuming 'text' is the property in your reply object  
      />
    </FloatingLabel>
                        </div>
                    </div>
                )) }
            </div>
        </main>
   
    
    );

}

export default AllFeedbacks;