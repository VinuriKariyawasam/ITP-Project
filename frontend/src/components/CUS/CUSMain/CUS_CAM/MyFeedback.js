import React, {useEffect,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Feedback.css';

function MyFeedback(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [fetchFeedback, setFetchedFeedback] = useState({
        feedback: ''
    });
    const [updatedFeedback, setUpdatedfeedback] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        function getFeedbackbyId() {
            const id = "66080226773ea5d51c59fdd4";
            axios.get(`http://localhost:5000/cam/feedback/get-feedback/${id}`)
            .then((res) => {
                console.log(res.data);
                setFetchedFeedback(res.data);
                setUpdatedfeedback(res.data.feedback)
            })
            .catch((err) => {
                alert("error");
            });
        }
        getFeedbackbyId();
    },  []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFetchedFeedback(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        const shouldUpdate = window.confirm("Confirm Update");
        if(shouldUpdate){
        //e.preventDefault();
        try{
            const id = "66080226773ea5d51c59fdd4";
            const response = await fetch(`http://localhost:5000/cam/feedback/update-feedback/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(fetchFeedback)
            });
            const data = await response.json();
            if(response.ok){
                //reset form data if the request was successful
                setUpdatedfeedback(fetchFeedback.feedback);
                //window.location.reload();
            }else{
                setErrorMessage(data.message || 'Failed to update feedback');
            }
        }catch(error){
            console.error('Error updating feedback:', error);
            setErrorMessage('Failed to update feedback');
        }
    }
    };

    const Delete = (id) => {
        const shouldDelete = window.confirm("Confirm Delete");
        if(shouldDelete) {
            axios
               .delete(`http://localhost:5000/cam/feedback/delete-feedback/${id}`)
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
    <main className="cam-allFeedback">
        <h3>My FeedBack</h3>
        <StarRating/>
        
          <Form.Label>Your FeedBack</Form.Label>
          <Form.Control className="cam-floatingLabel"
            as="textarea"
            required
            type="textarea"
            rows={5}
            value={fetchFeedback.feedback}
            onChange={handleChange}
          />
    <Button className='cam-myfeedbackbtn' variant="dark" size="md" onClick={handleSubmit}>Update</Button>
    <Button className='cam-myfeedbackbtn' variant="dark" size="md" onClick={Delete}>Delete</Button>
    </main>
    );
}

export default MyFeedback;